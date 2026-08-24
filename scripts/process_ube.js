import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processImage() {
  const root = path.resolve(__dirname, '..');
  const inputPath = path.join(root, 'public', 'assets', 'ube_drink.jpg');
  const outputPath = path.join(root, 'public', 'assets', 'ube_drink.png');

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    rgba[i * 4 + 0] = data[i * channels + 0];
    rgba[i * 4 + 1] = data[i * channels + 1];
    rgba[i * 4 + 2] = data[i * channels + 2];
    rgba[i * 4 + 3] = 255;
  }

  function isCheckerboard(idx) {
    const r = rgba[idx * 4 + 0];
    const g = rgba[idx * 4 + 1];
    const b = rgba[idx * 4 + 2];
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
    const avg = (r + g + b) / 3;
    return maxDiff < 20 && avg > 130;
  }

  const visited = new Uint8Array(width * height);
  const queue = [];

  for (let x = 0; x < width; x++) {
    queue.push(0 * width + x);
    queue.push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    queue.push(y * width + 0);
    queue.push(y * width + (width - 1));
  }

  for (const idx of queue) {
    visited[idx] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    if (isCheckerboard(curr)) {
      rgba[curr * 4 + 3] = 0;

      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1],
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = ny * width + nx;
          if (!visited[nidx]) {
            visited[nidx] = 1;
            if (isCheckerboard(nidx)) {
              queue.push(nidx);
            }
          }
        }
      }
    }
  }

  await sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log('Successfully created transparent PNG:', outputPath);
}

processImage().catch(console.error);
