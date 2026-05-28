import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Tabla de permutación Perlin (generada una sola vez) ──────────────────────
const PERM = (() => {
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return new Uint8Array([...p, ...p]);
})();

const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (t, a, b) => a + t * (b - a);
const grad = (h, x, y) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);

function perlin(x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = fade(x), v = fade(y);
  const a = PERM[X] + Y, b = PERM[X + 1] + Y;
  return lerp(v,
    lerp(u, grad(PERM[a],     x,     y), grad(PERM[b],     x - 1, y)),
    lerp(u, grad(PERM[a + 1], x,     y - 1), grad(PERM[b + 1], x - 1, y - 1))
  );
}

// ── GLSL del shader de humo volumétrico ─────────────────────────────────────
const SMOKE_VERT = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const SMOKE_FRAG = `
  uniform float uTime;
  varying vec2 vUv;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }

  float sn(vec2 p) {
    const float K1 = 0.366025404, K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    return dot(h*h*h*h * vec3(dot(a, hash(i)), dot(b, hash(i+o)), dot(c, hash(i+vec2(1.0)))), vec3(70.0));
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float t = uTime * 0.045;

    // FBM 5 octavas
    float f = 0.0, amp = 0.5;
    vec2 p = uv * 3.0;
    for (int k = 0; k < 5; k++) { f += amp * sn(p + t); p *= 2.1; amp *= 0.46; }
    f = f * 0.5 + 0.5;

    // Viñeta suave
    float vig = 1.0 - smoothstep(0.1, 0.7, length(uv));
    float alpha = f * vig * 0.028;
    gl_FragColor = vec4(vec3(0.75, 0.78, 0.82) * alpha, alpha);
  }
`;

// ── Plano de humo fullscreen ─────────────────────────────────────────────────
function SmokeLayer() {
  const matRef = useRef();

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta * 60;
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[200, 200]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={SMOKE_VERT}
        fragmentShader={SMOKE_FRAG}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ── Campo de flujo: 8000 partículas en coordenadas de pantalla ───────────────
function FlowField({ count = 8000 }) {
  const pointsRef = useRef();
  const { size, camera } = useThree();

  // Refs para estado mutable (sin re-render)
  const stateRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Convertir coords de pantalla a espacio mundo ortográfico
  const toWorld = useMemo(() => ({
    x: (sx) => (sx / size.width  - 0.5) * size.width,
    y: (sy) => (sy / size.height - 0.5) * -size.height,
  }), [size]);

  // Trackear mouse en coords mundo
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = toWorld.x(e.clientX);
      mouseRef.current.y = toWorld.y(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [toWorld]);

  // Inicializar buffers y datos de simulación
  const { positions, colors } = useMemo(() => {
    const W = size.width, H = size.height;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const velX  = new Float32Array(count);
    const velY  = new Float32Array(count);
    const life  = new Float32Array(count);
    const maxL  = new Float32Array(count);

    const spawn = (i) => {
      positions[i*3]   = (Math.random() - 0.5) * W * 1.1;
      positions[i*3+1] = (Math.random() - 0.5) * H * 1.1;
      positions[i*3+2] = 0;
      velX[i] = 0; velY[i] = 0;
      life[i] = 0;
      maxL[i] = 140 + Math.random() * 220;
      const t = Math.random();
      // Blanco puro con levísima temperatura fría — sin saturación visible
      colors[i*3]   = 0.82 + t * 0.18;  // R alto → casi blanco
      colors[i*3+1] = 0.85 + t * 0.15;  // G igual
      colors[i*3+2] = 0.88 + t * 0.12;  // B ligerísimo toque frío
    };

    for (let i = 0; i < count; i++) {
      spawn(i);
      life[i] = Math.random() * maxL[i];
    }

    // Guardamos toda la sim state en el ref
    stateRef.current = { velX, velY, life, maxL, spawn, W, H };

    return { positions, colors };
  }, [count, size]);

  useFrame(() => {
    if (!pointsRef.current || !stateRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array;
    const col = geo.attributes.color.array;
    const { velX, velY, life, maxL, spawn, W, H } = stateRef.current;
    const { x: mx, y: my } = mouseRef.current;

    const SCALE = 0.0022, SPEED = 1.2;
    const frame = stateRef.current.frame = (stateRef.current.frame || 0) + 1;

    for (let i = 0; i < count; i++) {
      const px = pos[i*3] * SCALE;
      const py = pos[i*3+1] * SCALE;
      const angle = perlin(px + frame * 0.0032, py + frame * 0.0026) * Math.PI * 3.8;

      const dx = mx - pos[i*3], dy = my - pos[i*3+1];
      const dist = Math.sqrt(dx*dx + dy*dy) + 1;
      const pull = Math.min(90 / dist, 0.25);

      velX[i] = velX[i] * 0.88 + (Math.cos(angle) * SPEED + dx / dist * pull) * 0.12;
      velY[i] = velY[i] * 0.88 + (Math.sin(angle) * SPEED + dy / dist * pull) * 0.12;
      pos[i*3]   += velX[i];
      pos[i*3+1] += velY[i];
      life[i]++;

      // Alpha por ciclo de vida (fade in/out)
      const t = life[i] / maxL[i];
      const a = t < 0.12 ? t / 0.12 : t > 0.78 ? (1 - t) / 0.22 : 1.0;
      col[i*3]   = 0.78 + a * 0.22;
      col[i*3+1] = 0.80 + a * 0.20;
      col[i*3+2] = 0.82 + a * 0.18;

      const hw = W / 2 + 50, hh = H / 2 + 50;
      if (life[i] >= maxL[i] || Math.abs(pos[i*3]) > hw || Math.abs(pos[i*3+1]) > hh) {
        spawn(i);
      }
    }

    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate    = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.4}
        vertexColors
        transparent
        opacity={0.28}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={false}
      />
    </points>
  );
}

// ── Cámara ortográfica sincronizada con el viewport ──────────────────────────
function OrthoCamera() {
  const { size, camera } = useThree();
  useEffect(() => {
    camera.left   = -size.width  / 2;
    camera.right  =  size.width  / 2;
    camera.top    =  size.height / 2;
    camera.bottom = -size.height / 2;
    camera.near   = -10;
    camera.far    =  10;
    camera.position.set(0, 0, 1);
    camera.updateProjectionMatrix();
  }, [size, camera]);
  return null;
}

// ── Export principal ─────────────────────────────────────────────────────────
export default function ParticleBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], near: -10, far: 10 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <OrthoCamera />
        <SmokeLayer />
        <FlowField count={8000} />
      </Canvas>
    </div>
  );
}