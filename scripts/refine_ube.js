import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function refineImage() {
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

  function isCheckerboard(r, g, b) {
    const diff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
    const avg = (r + g + b) / 3;
    return diff <= 10 && avg > 170;
  }

  const leftEdge = new Int32Array(height);
  const rightEdge = new Int32Array(height);

  for (let y = 0; y < height; y++) {
    let lx = 0;
    while (lx < width / 2) {
      const idx = (y * width + lx) * channels;
      if (!isCheckerboard(data[idx], data[idx + 1], data[idx + 2])) {
        break;
      }
      lx++;
    }
    leftEdge[y] = lx;

    let rx = width - 1;
    while (rx > width / 2) {
      const idx = (y * width + rx) * channels;
      if (!isCheckerboard(data[idx], data[idx + 1], data[idx + 2])) {
        break;
      }
      rx--;
    }
    rightEdge[y] = rx;
  }

  let topY = 0;
  while (topY < height && (rightEdge[topY] - leftEdge[topY] < 30 || leftEdge[topY] >= width / 2)) {
    topY++;
  }

  let bottomY = height - 1;
  while (bottomY > 0 && (rightEdge[bottomY] - leftEdge[bottomY] < 30 || leftEdge[bottomY] >= width / 2)) {
    bottomY--;
  }

  // Smooth the left and right boundary curves
  const smoothedLeft = new Float32Array(height);
  const smoothedRight = new Float32Array(height);

  for (let y = 0; y < height; y++) {
    let sumL = 0;
    let sumR = 0;
    let count = 0;
    for (let dy = -2; dy <= 2; dy++) {
      const ny = y + dy;
      if (ny >= 0 && ny < height) {
        sumL += leftEdge[ny];
        sumR += rightEdge[ny];
        count++;
      }
    }
    smoothedLeft[y] = sumL / count;
    smoothedRight[y] = sumR / count;
  }

  for (let y = 0; y < height; y++) {
    const minX = smoothedLeft[y];
    const maxX = smoothedRight[y];

    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const destIdx = (y * width + x) * 4;

      rgba[destIdx + 0] = data[srcIdx + 0];
      rgba[destIdx + 1] = data[srcIdx + 1];
      rgba[destIdx + 2] = data[srcIdx + 2];

      if (y < topY || y > bottomY || x < minX - 0.5 || x > maxX + 0.5) {
        rgba[destIdx + 3] = 0;
      } else {
        const edgeDist = Math.min(x - minX, maxX - x, y - topY, bottomY - y);
        if (edgeDist < 0) {
          rgba[destIdx + 3] = 0;
        } else if (edgeDist < 1.5) {
          rgba[destIdx + 3] = Math.round((edgeDist / 1.5) * 255);
        } else {
          rgba[destIdx + 3] = 255;
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

  console.log('Successfully refined PNG with smooth antialiased silhouette!');
}

refineImage().catch(console.error);
