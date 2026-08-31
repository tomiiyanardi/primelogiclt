import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');

const tasks = [
  { file: 'cielo-poster.jpg', maxWidth: 1920, quality: 80, format: 'jpeg' },
  { file: 'nave-poster.jpg', maxWidth: 1920, quality: 80, format: 'jpeg' },
  { file: 'humonave-poster.jpg', maxWidth: 1920, quality: 80, format: 'jpeg' },
  { file: 'SportFitness.png', maxWidth: 1280, quality: 85, format: 'webp-and-png' },
  { file: 'curvaunopantallas.png', maxWidth: 1280, quality: 85, format: 'webp-and-png' },
  { file: 'alcortadescartablepantallas.png', maxWidth: 1280, quality: 85, format: 'webp-and-png' },
  { file: 'flomstore.png', maxWidth: 1280, quality: 85, format: 'webp-and-png' },
  { file: 'ecommerce.png', maxWidth: 1280, quality: 85, format: 'webp-and-png' },
  { file: 'logo-curvauno.png', maxWidth: 600, quality: 90, format: 'png' },
  { file: 'logo.png', maxWidth: 512, quality: 90, format: 'png' },
];

async function run() {
  console.log('--- Iniciando optimización de imágenes ---');
  let totalSaved = 0;

  for (const task of tasks) {
    const inputPath = path.join(publicDir, task.file);
    if (!fs.existsSync(inputPath)) {
      console.log(`Archivo no encontrado: ${task.file}`);
      continue;
    }

    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    const tempOut = path.join(publicDir, `temp_${task.file}`);

    let img = sharp(inputPath);
    const metadata = await img.metadata();

    if (metadata.width > task.maxWidth) {
      img = img.resize({ width: task.maxWidth, withoutEnlargement: true });
    }

    if (task.format === 'jpeg') {
      await img.jpeg({ quality: task.quality, mozjpeg: true }).toFile(tempOut);
    } else if (task.format === 'png') {
      await img.png({ quality: task.quality, compressionLevel: 9, effort: 8 }).toFile(tempOut);
    } else if (task.format === 'webp-and-png') {
      // Create webp version too
      const webpOut = path.join(publicDir, task.file.replace(/\.(png|jpg|jpeg)$/, '.webp'));
      await sharp(inputPath)
        .resize({ width: Math.min(metadata.width, task.maxWidth), withoutEnlargement: true })
        .webp({ quality: task.quality, effort: 6 })
        .toFile(webpOut);
      
      // Also compress the png
      await img.png({ quality: task.quality, compressionLevel: 9, effort: 8 }).toFile(tempOut);
    }

    // Replace original file with compressed
    fs.renameSync(tempOut, inputPath);
    const newStats = fs.statSync(inputPath);
    const saved = originalSize - newStats.size;
    totalSaved += saved;

    console.log(`✓ ${task.file}: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(newStats.size / 1024).toFixed(1)} KB (Ahorro: ${(saved / originalSize * 100).toFixed(1)}%)`);
  }

  console.log(`\n🎉 Ahorro total de espacio: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

run().catch(console.error);
