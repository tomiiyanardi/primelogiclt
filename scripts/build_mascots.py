"""
Builds the vector Primelogic mascots (public/mascots/*.svg).

The head is drawn from the real logo paths in public/logo.svg; body, limbs and props
are simple shapes so every pose can animate its own parts with CSS inside the SVG.
Animations stop automatically with prefers-reduced-motion.

Usage: python scripts/build_mascots.py
"""
import math
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'mascots')

CYAN = '#00d4ff'
LOGO = open(os.path.join(ROOT, 'public', 'logo.svg'), encoding='utf-8').read()
PATHS = [' '.join(p.split()) for p in re.findall(r'<path d="([^"]+)"', LOGO)]
HEAD_D = PATHS[0] + ' ' + PATHS[1]  # the "|P" part of the logo
LOGO_D = ' '.join(PATHS)

# Head geometry (logo units -> mascot units)
K, HX, HY = 0.178, 92, 22
EYE_X = (990 - 222) * K + HX
EYE_Y = (666 - 154) * K + HY
EYE_R = 137 * K
NECK = (200, 230)

DEFS = f'''<defs>
  <clipPath id="hc"><rect x="0" y="0" width="2048" height="1331"/></clipPath>
  <linearGradient id="extr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{CYAN}"/><stop offset="1" stop-color="#0057d9"/></linearGradient>
  <linearGradient id="cloth" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a3140"/><stop offset=".45" stop-color="#11151d"/><stop offset="1" stop-color="#05070a"/></linearGradient>
  <linearGradient id="face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b212c"/><stop offset="1" stop-color="#05070a"/></linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a4352"/><stop offset="1" stop-color="#151a22"/></linearGradient>
  <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2a3c"/><stop offset="1" stop-color="#06131d"/></linearGradient>
  <radialGradient id="eye" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".8" stop-color="#e6eef5"/><stop offset="1" stop-color="#b9c6d2"/></radialGradient>
  <radialGradient id="sheen" cx=".3" cy=".25" r=".6"><stop offset="0" stop-color="#9fdcff" stop-opacity=".14"/><stop offset="1" stop-color="#9fdcff" stop-opacity="0"/></radialGradient>
  <filter id="rim" x="-25%" y="-25%" width="150%" height="150%">
    <feMorphology in="SourceAlpha" operator="dilate" radius="2.6" result="d"/>
    <feFlood flood-color="{CYAN}"/><feComposite in2="d" operator="in" result="line"/>
    <feGaussianBlur in="line" stdDeviation="7" result="g0"/>
    <feComponentTransfer in="g0" result="glow"><feFuncA type="linear" slope=".55"/></feComponentTransfer>
    <feMerge><feMergeNode in="glow"/><feMergeNode in="line"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>'''

BASE_CSS = f'''
.blink {{ transform-origin: {EYE_X:.1f}px {EYE_Y:.1f}px; animation: blink 4.2s infinite; }}
.head {{ transform-origin: 200px 232px; animation: tilt 4.6s ease-in-out infinite; }}
@keyframes blink {{ 0%,92%,100% {{ transform: scaleY(1); }} 95% {{ transform: scaleY(.1); }} }}
@keyframes tilt {{ 0%,100% {{ transform: rotate(-2deg); }} 50% {{ transform: rotate(2.5deg); }} }}
'''


def logo_layer(fill, extra=''):
    return (f'<g transform="translate({HX},{HY}) scale({K}) translate(-222,-154)"><g clip-path="url(#hc)">'
            f'<g transform="translate(0,2048) scale(0.1,-0.1)"><path d="{HEAD_D}" fill="{fill}" {extra}/></g></g></g>')


def eye(kind):
    x, y, r = EYE_X, EYE_Y, EYE_R
    socket = f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="#05070a"/>'
    if kind == 'wink':
        return socket + f'<path d="M{x-12:.1f},{y-3:.1f} Q{x:.1f},{y+9:.1f} {x+12:.1f},{y-3:.1f}" fill="none" stroke="#e9f4ff" stroke-width="5" stroke-linecap="round"/>'
    if kind == 'happy':
        return socket + f'<path d="M{x-12:.1f},{y+5:.1f} Q{x:.1f},{y-12:.1f} {x+12:.1f},{y+5:.1f}" fill="none" stroke="#e9f4ff" stroke-width="5.5" stroke-linecap="round"/>'
    if kind == 'surprised':
        return (socket + f'<g class="blink"><circle cx="{x:.1f}" cy="{y:.1f}" r="{r*0.95:.1f}" fill="url(#eye)"/>'
                f'<circle cx="{x+2:.1f}" cy="{y+2:.1f}" r="{r*0.32:.1f}" fill="#05070a"/></g>')
    if kind == 'cool':
        # visor sunglasses across the face
        return (f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r*0.86:.1f}" fill="url(#eye)"/>'
                f'<path d="M{x-62:.1f},{y-14:.1f} L{x+34:.1f},{y-14:.1f} Q{x+40:.1f},{y-14:.1f} {x+38:.1f},{y-6:.1f} L{x+32:.1f},{y+12:.1f} '
                f'Q{x+30:.1f},{y+18:.1f} {x+22:.1f},{y+18:.1f} L{x-4:.1f},{y+18:.1f} Q{x-12:.1f},{y+18:.1f} {x-16:.1f},{y+10:.1f} L{x-22:.1f},{y-2:.1f} '
                f'L{x-58:.1f},{y-2:.1f} Z" fill="#05070a" stroke="{CYAN}" stroke-width="2.5"/>'
                f'<path d="M{x+6:.1f},{y-8:.1f} L{x+18:.1f},{y-8:.1f}" stroke="#7fe9ff" stroke-width="3" stroke-linecap="round" opacity=".8"/>')
    return socket + f'<g class="blink"><circle cx="{x:.1f}" cy="{y:.1f}" r="{r*0.86:.1f}" fill="url(#eye)"/></g>'


def head(eye_kind='open', extra=''):
    ext = ''.join(f'<g transform="translate({i*1.1:.1f},{i*0.7:.1f})">{logo_layer("url(#extr)")}</g>' for i in range(11, 0, -1))
    return (f'<g class="head">'
            f'<path d="M138,246 C150,222 250,222 262,246 C246,258 154,258 138,246Z" fill="#0b0e14" stroke="#1f2633" stroke-width="2"/>'
            f'<g filter="url(#rim)">{ext}</g>'
            f'{logo_layer("url(#face)", f"stroke=\"{CYAN}\" stroke-width=\"380\" stroke-linejoin=\"round\"")}'
            f'{eye(eye_kind)}{extra}</g>')


TORSO_D = ('M120,262 C126,236 160,224 200,224 C242,224 276,236 282,262 C290,300 296,340 292,378 '
           'C290,396 278,404 258,405 L144,405 C124,404 112,396 110,378 C106,340 112,300 120,262 Z')


def torso_shape():
    return f'<path d="{TORSO_D}" fill="url(#cloth)"/>'


def torso_details():
    return (f'<path d="{TORSO_D}" fill="url(#sheen)"/>'
            f'<path d="M276,280 C286,320 290,350 286,380" fill="none" stroke="{CYAN}" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>'
            '<path d="M160,338 L240,338 L252,384 L148,384 Z" fill="#0b0e14" stroke="#1f2633" stroke-width="2"/>'
            '<rect x="116" y="388" width="172" height="16" rx="8" fill="#0b0e14" stroke="#1f2633" stroke-width="1.5"/>'
            '<path d="M186,250 L182,276 M214,250 L218,276" stroke="#2a3242" stroke-width="2.5" stroke-linecap="round"/>'
            f'<g transform="translate(184,282) scale(.016)"><g transform="translate(0,2048) scale(0.1,-0.1)"><path d="{LOGO_D}" fill="{CYAN}"/></g></g>')


def limb(points, width, cls='', outline=False):
    # nudge the middle point so a perfectly straight limb still has a 2D bounding box
    # (gradients in objectBoundingBox units do not render on zero-width/height shapes)
    pts = list(points)
    if len(pts) > 2:
        x, y = pts[1]
        pts[1] = (x + 1.5, y + 1.5)
    d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    c = f' class="{cls}"' if cls else ''
    edge = (f'<path d="{d}" fill="none" stroke="{CYAN}" stroke-opacity=".55" stroke-width="{width + 5}" '
            'stroke-linecap="round" stroke-linejoin="round"/>') if outline else ''
    return f'{edge}<path{c} d="{d}" fill="none" stroke="url(#cloth)" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>'


def hand(x, y, kind='fist', angle=0):
    """Hand centred on (x, y); angle points the fingers (degrees, 0 = right, -90 = up)."""
    base = f'<g transform="translate({x:.1f},{y:.1f}) rotate({angle})">'
    fist = f'<ellipse cx="0" cy="0" rx="19" ry="17" fill="#151a24" stroke="{CYAN}" stroke-opacity=".5" stroke-width="2"/>'
    knuckles = '<path d="M6,-11 L12,-11 M8,-3 L14,-3 M8,5 L14,5" stroke="#05070a" stroke-width="2" stroke-linecap="round"/>'
    if kind == 'open':
        body = ('<ellipse cx="2" cy="0" rx="20" ry="17" fill="#151a24"/>'
                '<ellipse cx="-4" cy="-17" rx="7" ry="10" transform="rotate(-25 -4 -17)" fill="#151a24"/>'
                '<path d="M10,-10 L22,-10 M11,-1 L24,-1 M10,8 L21,8" stroke="#151a24" stroke-width="9" stroke-linecap="round"/>'
                '<path d="M11,-5.5 L20,-5.5 M11,3.5 L20,3.5" stroke="#05070a" stroke-width="1.6" stroke-linecap="round"/>')
    elif kind == 'point':
        body = fist + '<rect x="8" y="-14" width="30" height="11" rx="5.5" fill="#151a24"/>' + \
            '<ellipse cx="-2" cy="-16" rx="6" ry="9" transform="rotate(20 -2 -16)" fill="#151a24"/>' + \
            '<path d="M8,-1 L14,-1 M8,7 L13,7" stroke="#05070a" stroke-width="2" stroke-linecap="round"/>'
    elif kind == 'thumb':
        body = fist + knuckles + '<rect x="-6" y="-36" width="12" height="24" rx="6" fill="#151a24"/>'
    elif kind == 'rock':
        body = fist + '<rect x="6" y="-30" width="10" height="24" rx="5" fill="#151a24" transform="rotate(10 11 -18)"/>' + \
            '<rect x="-14" y="-30" width="10" height="24" rx="5" fill="#151a24" transform="rotate(-10 -9 -18)"/>'
    else:
        body = fist + knuckles
    return base + body + '</g>'


SHOE = ('<path d="M-76,24 C-73,2 -39,-8 -5,-5 L33,1 C40,21 37,40 30,48 L-67,48 C-79,48 -82,35 -76,24Z" fill="url(#cloth)"/>'
        '<path d="M-37,15 L-13,8 M-42,26 L-15,19 M-44,36 L-18,29" stroke="#e9f4ff" stroke-width="4.5" stroke-linecap="round"/>'
        f'<path d="M1,9 L16,27" stroke="{CYAN}" stroke-width="6" stroke-linecap="round"/>'
        '<rect x="-82" y="42" width="120" height="17" rx="8.5" fill="#f2f7fb"/>'
        f'<rect x="-79" y="55" width="114" height="7" rx="3.5" fill="{CYAN}"/>')


def shoe(x, y, flip=False, angle=0, cls=''):
    """Shoe with its ankle at (x, y); the toe points left unless flipped."""
    c = f' class="{cls}"' if cls else ''
    s = -1 if flip else 1
    return f'<g{c} transform="translate({x:.1f},{y:.1f}) rotate({angle}) scale({s},1)">{SHOE}</g>'


def svg(name, title, body, css='', view_h=620):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 {view_h}" width="400" height="{view_h}" role="img">'
            f'<title>{title}</title>{DEFS}<style>{BASE_CSS}{css}'
            '@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }</style>'
            f'{body}</svg>')


def standing_legs(spread=0):
    return (limb([(172, 392), (168 - spread, 450), (166 - spread, 505)], 50)
            + limb([(230, 392), (234 + spread, 450), (236 + spread, 505)], 50)
            + shoe(170 - spread, 512) + shoe(232 + spread, 512, flip=True))


def standing(arms_back='', arms_front='', eye_kind='open', head_extra='', legs=None, behind=''):
    """Front-facing standing body. arms_back is drawn under the torso, arms_front over it."""
    # arms_front gets its own rim pass so it reads as a separate shape over the hoodie
    return (f'<g filter="url(#rim)">{behind}{legs or standing_legs()}{arms_back}{torso_shape()}</g>'
            f'{torso_details()}<g filter="url(#rim)">{arms_front}</g>{head(eye_kind, head_extra)}')


# ── Props ───────────────────────────────────────────────

def laptop(x, y):
    return (f'<g transform="translate({x},{y})">'
            '<path d="M-92,0 L92,0 L104,14 L-104,14 Z" fill="url(#metal)"/>'
            '<path d="M-84,-2 L-70,-104 L94,-104 L84,-2 Z" fill="#1d2430"/>'
            '<path d="M-76,-8 L-64,-96 L86,-96 L76,-8 Z" fill="url(#screen)"/>'
            f'<text x="2" y="-40" text-anchor="middle" font-family="monospace" font-weight="700" font-size="34" fill="{CYAN}">&lt;/&gt;</text>'
            f'<rect class="code c1" x="-56" y="-26" width="70" height="4" rx="2" fill="{CYAN}" opacity=".7"/>'
            '<rect class="code c2" x="-58" y="-17" width="48" height="4" rx="2" fill="#22e3a0" opacity=".7"/>'
            f'<rect class="caret" x="-4" y="-19" width="3" height="8" fill="{CYAN}"/>'
            '</g>')


def tablet(x, y, angle=-12):
    return (f'<g transform="translate({x},{y}) rotate({angle})">'
            '<rect x="-58" y="-78" width="116" height="156" rx="12" fill="url(#metal)"/>'
            '<rect x="-50" y="-70" width="100" height="140" rx="7" fill="url(#screen)"/>'
            f'<rect class="bar b1" x="-36" y="10" width="14" height="40" rx="3" fill="{CYAN}"/>'
            '<rect class="bar b2" x="-14" y="10" width="14" height="40" rx="3" fill="#22e3a0"/>'
            f'<rect class="bar b3" x="8" y="10" width="14" height="40" rx="3" fill="{CYAN}"/>'
            '<rect class="bar b4" x="30" y="10" width="10" height="40" rx="3" fill="#7fe9ff"/>'
            f'<path d="M-36,-30 L-14,-44 L8,-36 L36,-58" fill="none" stroke="{CYAN}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'
            '<circle cx="36" cy="-58" r="4" fill="#22e3a0"/>'
            '</g>')


def phone(x, y, angle=-10):
    return (f'<g transform="translate({x},{y}) rotate({angle})">'
            '<rect x="-20" y="-40" width="40" height="76" rx="8" fill="url(#metal)"/>'
            '<rect x="-16" y="-35" width="32" height="64" rx="5" fill="url(#screen)"/>'
            f'<g class="notif"><rect x="-13" y="-28" width="26" height="12" rx="4" fill="{CYAN}"/>'
            '<rect x="-9" y="-24" width="14" height="3" rx="1.5" fill="#05070a"/></g>'
            '<rect x="-12" y="-8" width="24" height="3" rx="1.5" fill="#2c4a5c"/>'
            '<rect x="-12" y="0" width="18" height="3" rx="1.5" fill="#2c4a5c"/>'
            '</g>')


def notes():
    return (f'<g class="note n1" fill="{CYAN}"><ellipse cx="0" cy="0" rx="8" ry="6" transform="rotate(-20)"/>'
            f'<rect x="5" y="-34" width="3.5" height="34"/><path d="M5,-34 Q22,-30 20,-16" stroke="{CYAN}" stroke-width="3.5" fill="none"/></g>'
            f'<g class="note n2" fill="#22e3a0"><ellipse cx="0" cy="0" rx="7" ry="5" transform="rotate(-20)"/>'
            '<rect x="4.5" y="-28" width="3" height="28"/></g>')


def headphones():
    return ('<path d="M104,120 C104,30 300,20 318,110" fill="none" stroke="#151a24" stroke-width="13" stroke-linecap="round"/>'
            f'<path d="M104,120 C104,30 300,20 318,110" fill="none" stroke="{CYAN}" stroke-opacity=".5" stroke-width="2.5"/>'
            '<rect x="88" y="104" width="32" height="50" rx="14" fill="#151a24" stroke="#2a3242" stroke-width="2"/>'
            f'<rect x="96" y="116" width="6" height="26" rx="3" fill="{CYAN}"/>'
            '<rect x="302" y="96" width="30" height="48" rx="13" fill="#151a24" stroke="#2a3242" stroke-width="2"/>')


def backpack():
    return ('<rect x="96" y="250" width="70" height="132" rx="26" fill="#10141b"/>'
            '<rect x="86" y="300" width="28" height="64" rx="12" fill="#151a24"/>'
            f'<path d="M100,318 L112,318" stroke="{CYAN}" stroke-width="3" stroke-linecap="round"/>')


# ── Poses ───────────────────────────────────────────────

def pose_wave():
    css = ('.arm { transform-origin: 270px 266px; animation: wave 1.6s ease-in-out infinite; }'
           '@keyframes wave { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(14deg); } }')
    front = (limb([(130, 268), (108, 318), (122, 364)], 36) + hand(122, 368)
             + f'<g class="arm">{limb([(270, 266), (304, 236), (314, 196)], 35)}{hand(316, 180, "open", -90)}</g>')
    return svg('wave', 'Mascota Primelogic saludando', standing(arms_front=front), css)


def pose_point():
    css = ('.arm { transform-origin: 130px 268px; animation: jab 2.4s ease-in-out infinite; }'
           '@keyframes jab { 0%,60%,100% { transform: translateX(0); } 70% { transform: translateX(-8px); } 80% { transform: translateX(0); } 88% { transform: translateX(-5px); } }')
    front = (f'<g class="arm">{limb([(130, 268), (92, 292), (58, 286)], 35)}{hand(46, 284, "point", 180)}</g>'
             + limb([(272, 268), (296, 318), (276, 362)], 36) + hand(272, 366))
    return svg('point-forward', 'Mascota Primelogic señalando', standing(arms_front=front), css)


def pose_lean():
    """Hero pose: leaning back on a pillar, legs crossed, pointing at the headline."""
    css = ('.arm { transform-origin: 130px 268px; animation: jab 3s ease-in-out infinite; }'
           '@keyframes jab { 0%,70%,100% { transform: rotate(0); } 78% { transform: rotate(-6deg); } 86% { transform: rotate(0); } 92% { transform: rotate(-4deg); } }')
    legs = (limb([(230, 392), (226, 450), (214, 505)], 50)
            + limb([(172, 392), (196, 452), (250, 498)], 50)
            + shoe(212, 512) + shoe(258, 504, flip=True, angle=-8))
    front = (f'<g class="arm">{limb([(130, 268), (90, 286), (60, 270)], 35)}{hand(48, 266, "point", 195)}</g>'
             + limb([(272, 268), (290, 318), (262, 356)], 36) + hand(256, 360))
    body = standing(arms_front=front, legs=legs)
    return svg('lean', 'Mascota Primelogic apoyada señalando', f'<g transform="rotate(4 200 560)">{body}</g>', css)


def pose_celebrate():
    css = ('.al { transform-origin: 130px 268px; animation: pumpL .9s ease-in-out infinite; }'
           '.ar { transform-origin: 272px 268px; animation: pumpR .9s ease-in-out infinite; }'
           '@keyframes pumpL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(10deg); } }'
           '@keyframes pumpR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-10deg); } }'
           '.spark { animation: spark 1.8s ease-out infinite; transform-box: fill-box; transform-origin: center; }'
           '.s2 { animation-delay: .6s; } .s3 { animation-delay: 1.2s; }'
           '@keyframes spark { 0% { opacity: 0; transform: scale(.4); } 30% { opacity: 1; } 100% { opacity: 0; transform: scale(1.3); } }')
    front = (f'<g class="al">{limb([(130, 268), (80, 236), (56, 184)], 35)}{hand(52, 170, "fist", -90)}</g>'
             + f'<g class="ar">{limb([(272, 268), (322, 236), (346, 184)], 35)}{hand(350, 170, "fist", -90)}</g>')
    sparks = (f'<path class="spark" d="M40,120 l6,14 l14,6 l-14,6 l-6,14 l-6,-14 l-14,-6 l14,-6z" fill="{CYAN}"/>'
              '<path class="spark s2" d="M352,110 l4,10 l10,4 l-10,4 l-4,10 l-4,-10 l-10,-4 l10,-4z" fill="#22e3a0"/>'
              '<path class="spark s3" d="M360,210 l4,9 l9,4 l-9,4 l-4,9 l-4,-9 l-9,-4 l9,-4z" fill="#7fe9ff"/>')
    return svg('celebrate', 'Mascota Primelogic celebrando',
               standing(arms_front=front, eye_kind='happy', legs=standing_legs(10)) + sparks, css)


def pose_dj():
    css = ('.head { animation: nod .6s ease-in-out infinite; }'
           '@keyframes nod { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg) translateY(3px); } }'
           '.arm { transform-origin: 272px 268px; animation: bob .6s ease-in-out infinite; }'
           '@keyframes bob { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-8deg); } }'
           '.note { animation: rise 2.4s ease-out infinite; opacity: 0; }'
           '.n1 { transform: translate(350px,170px); } .n2 { transform: translate(52px,210px); animation-delay: 1.2s; }'
           '@keyframes rise { 0% { opacity: 0; translate: 0 10px; } 20% { opacity: 1; } 100% { opacity: 0; translate: 0 -60px; } }')
    front = (limb([(130, 268), (104, 318), (132, 360)], 36) + hand(138, 362)
             + f'<g class="arm">{limb([(272, 268), (326, 272), (350, 236)], 35)}{hand(352, 222, "rock", 0)}</g>')
    return svg('music-dj', 'Mascota Primelogic escuchando música',
               standing(arms_front=front, eye_kind='happy', head_extra=headphones(), legs=standing_legs(6)) + notes(), css)


def pose_tablet():
    css = ('.bar { transform-box: fill-box; transform-origin: bottom; animation: grow 2.4s ease-in-out infinite; }'
           '.b2 { animation-delay: .3s; } .b3 { animation-delay: .6s; } .b4 { animation-delay: .9s; }'
           '@keyframes grow { 0%,100% { transform: scaleY(.35); } 50% { transform: scaleY(1); } }')
    front = (limb([(130, 268), (118, 326), (178, 352)], 36, outline=True)
             + f'<g transform="translate(232,318) scale(1.15) translate(-232,-318)">{tablet(232, 318, -10)}</g>'
             + hand(184, 356) + limb([(272, 268), (300, 300), (296, 262)], 36) + hand(294, 256, 'fist', 200))
    return svg('tablet', 'Mascota Primelogic con una tablet', standing(arms_front=front), css)


def pose_phone():
    css = ('.notif { animation: ping 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }'
           '@keyframes ping { 0%,55%,100% { opacity: 1; transform: scale(1); } 65% { transform: scale(1.18); } 75% { transform: scale(1); } }'
           '.arm { transform-origin: 272px 268px; animation: lift 2.2s ease-in-out infinite; }'
           '@keyframes lift { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-4deg); } }')
    front = (limb([(130, 268), (108, 318), (122, 364)], 36) + hand(122, 368)
             + f'<g class="arm">{limb([(272, 268), (322, 300), (338, 262)], 35)}{phone(342, 226, 8)}{hand(340, 258, "thumb", 0)}</g>')
    return svg('phone', 'Mascota Primelogic con el celular', standing(arms_front=front, eye_kind='happy'), css)


def pose_crossed():
    css = ('.foot { transform-origin: 232px 560px; animation: tap 1.4s ease-in-out infinite; }'
           '@keyframes tap { 0%,60%,100% { transform: rotate(0); } 75% { transform: rotate(-8deg); } }')
    legs = (limb([(172, 392), (166, 450), (164, 505)], 50) + limb([(230, 392), (236, 450), (238, 505)], 50)
            + shoe(168, 512) + f'<g class="foot">{shoe(234, 512, flip=True)}</g>')
    front = (limb([(130, 268), (126, 318), (238, 322)], 36, outline=True) + limb([(272, 268), (276, 304), (164, 304)], 36, outline=True)
             + hand(244, 318, 'fist', 180) + hand(158, 304))
    return svg('arms-crossed', 'Mascota Primelogic de brazos cruzados', standing(arms_front=front, legs=legs), css)


def pose_walk():
    css = ('.lf { transform-origin: 176px 396px; animation: stride .9s ease-in-out infinite; }'
           '.lb { transform-origin: 226px 396px; animation: stride .9s ease-in-out infinite reverse; }'
           '.af { transform-origin: 272px 268px; animation: stride .9s ease-in-out infinite reverse; }'
           '.ab { transform-origin: 130px 268px; animation: stride .9s ease-in-out infinite; }'
           '.walker { animation: bounce .45s ease-in-out infinite; }'
           '@keyframes stride { 0%,100% { transform: rotate(18deg); } 50% { transform: rotate(-18deg); } }'
           '@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }')
    legs = (f'<g class="lb">{limb([(226, 392), (226, 450), (226, 505)], 50)}{shoe(228, 512, flip=True)}</g>'
            f'<g class="lf">{limb([(176, 392), (176, 450), (176, 505)], 50)}{shoe(174, 512)}</g>')
    back = f'<g class="ab">{limb([(130, 268), (128, 320), (130, 362)], 35)}{hand(130, 368)}</g>'
    front = (f'<g class="af">{limb([(272, 268), (274, 320), (272, 362)], 35)}{hand(272, 368)}</g>'
             + f'<path d="M150,236 L136,384 M250,236 L262,384" stroke="#0b0e14" stroke-width="9" stroke-linecap="round"/>')
    return svg('walking-backpack', 'Mascota Primelogic caminando',
               f'<g class="walker">{standing(arms_back=back, arms_front=front, legs=legs, behind=backpack())}</g>', css)


def pose_laptop():
    css = ('.caret { animation: caret 1s steps(1) infinite; }'
           '@keyframes caret { 50% { opacity: 0; } }'
           '.code { transform-box: fill-box; transform-origin: left; animation: type 2.6s ease-in-out infinite; }'
           '.c2 { animation-delay: .5s; }'
           '@keyframes type { 0% { transform: scaleX(0); } 60%,100% { transform: scaleX(1); } }'
           '.hl { animation: tapL .3s ease-in-out infinite alternate; } .hr { animation: tapL .3s ease-in-out infinite alternate-reverse; }'
           '@keyframes tapL { to { transform: translateY(-4px); } }')
    # cross-legged: knees out to the sides, feet tucked in, laptop on the lap
    legs = (limb([(166, 396), (102, 438), (186, 468)], 54) + limb([(234, 396), (298, 438), (214, 468)], 54)
            + shoe(116, 440, angle=-14) + shoe(284, 440, flip=True, angle=14))
    front = (limb([(130, 268), (116, 340), (160, 404)], 36) + limb([(272, 268), (286, 340), (242, 404)], 36))
    body = (f'<g filter="url(#rim)">{legs}{torso_shape()}{front}</g>{torso_details()}{head()}'
            f'<g filter="url(#rim)">{laptop(200, 476)}</g>'
            f'<g class="hl">{hand(160, 456)}</g><g class="hr">{hand(242, 456, "fist", 180)}</g>')
    return svg('sitting-laptop', 'Mascota Primelogic programando en la laptop', f'<g transform="translate(0,30)">{body}</g>', css)


def avatar(kind):
    body = head(kind).replace('<path d="M138,246 C150,222 250,222 262,246 C246,258 154,258 138,246Z" fill="#0b0e14" stroke="#1f2633" stroke-width="2"/>', '')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="78 8 252 240" width="252" height="240" role="img">'
            f'<title>Avatar Primelogic</title>{DEFS}<style>{BASE_CSS}.head {{ animation: none; }}'
            '@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }</style>'
            f'{body}</svg>')


POSES = {
    'mascot-wave': pose_wave,
    'mascot-point-forward': pose_point,
    'mascot-lean': pose_lean,
    'mascot-celebrate': pose_celebrate,
    'mascot-music-dj': pose_dj,
    'mascot-tablet': pose_tablet,
    'mascot-phone': pose_phone,
    'mascot-arms-crossed': pose_crossed,
    'mascot-walking-backpack': pose_walk,
    'mascot-sitting-laptop': pose_laptop,
}

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for name, fn in POSES.items():
        with open(os.path.join(OUT, f'{name}.svg'), 'w', encoding='utf-8') as f:
            f.write(fn())
    for kind, name in [('open', 'normal'), ('wink', 'wink'), ('happy', 'happy'), ('cool', 'cool'), ('surprised', 'surprised')]:
        with open(os.path.join(OUT, f'avatar-{name}.svg'), 'w', encoding='utf-8') as f:
            f.write(avatar(kind))
    print('ok')
