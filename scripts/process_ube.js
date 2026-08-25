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

  const leftContour = new Float32Array(height);
  const rightContour = new Float32Array(height);

  const topY = 132;
  const glassRimY = 267;
  const glassBaseStartY = 892;
  const glassBottomY = 921;

  for (let y = 0; y < height; y++) {
    if (y < topY || y > glassBottomY) {
      leftContour[y] = 1000;
      rightContour[y] = -1000;
      continue;
    }

    if (y >= glassRimY && y <= glassBaseStartY) {
      leftContour[y] = 347.5;
      rightContour[y] = 675.5;
    } else if (y >= glassBaseStartY) {
      const p = (y - glassBaseStartY) / (glassBottomY - glassBaseStartY);
      const inset = Math.pow(p, 1.8) * 15.0;
      leftContour[y] = 347.5 + inset;
      rightContour[y] = 675.5 - inset;
    } else {
      // Top foam, mint leaf, flower (y from 132 to 267)
      let lx = -1;
      for (let x = 340; x < 550; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const diff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
        const avg = (r + g + b) / 3;

        if (diff >= 7 || avg < 185) {
          lx = x;
          break;
        }
      }

      let rx = -1;
      for (let x = 680; x >= 500; x--) {
        const idx = (y * width + x) * channels;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const diff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
        const avg = (r + g + b) / 3;

        if (diff >= 7 || avg < 185) {
          rx = x;
          break;
        }
      }

      if (lx === -1 || rx === -1 || lx >= rx) {
        leftContour[y] = 1000;
        rightContour[y] = -1000;
      } else {
        leftContour[y] = Math.max(347.5, lx);
        rightContour[y] = Math.min(675.5, rx);
      }
    }
  }

  // Smooth top contour slightly for clean silhouette
  const smoothLeft = new Float32Array(height);
  const smoothRight = new Float32Array(height);

  for (let y = 0; y < height; y++) {
    if (y >= glassRimY && y <= glassBaseStartY) {
      smoothLeft[y] = leftContour[y];
      smoothRight[y] = rightContour[y];
    } else if (y >= topY && y <= glassBottomY && leftContour[y] <= rightContour[y]) {
      let sumL = 0, sumR = 0, count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny >= topY && ny <= glassBottomY && leftContour[ny] <= rightContour[ny]) {
          sumL += leftContour[ny];
          sumR += rightContour[ny];
          count++;
        }
      }
      smoothLeft[y] = count > 0 ? sumL / count : leftContour[y];
      smoothRight[y] = count > 0 ? sumR / count : rightContour[y];
    } else {
      smoothLeft[y] = 1000;
      smoothRight[y] = -1000;
    }
  }

  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    const minX = smoothLeft[y];
    const maxX = smoothRight[y];

    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const destIdx = (y * width + x) * 4;

      rgba[destIdx + 0] = data[srcIdx + 0];
      rgba[destIdx + 1] = data[srcIdx + 1];
      rgba[destIdx + 2] = data[srcIdx + 2];

      if (y < topY || y > glassBottomY || x < minX - 1.2 || x > maxX + 1.2 || minX >= maxX) {
        rgba[destIdx + 3] = 0;
      } else {
        const distL = x - minX;
        const distR = maxX - x;
        const distT = y - topY;
        const distB = glassBottomY - y;
        const minDist = Math.min(distL, distR, distT, distB);

        if (minDist < 0) {
          const a = Math.max(0, Math.min(1, 1 + minDist / 1.2));
          rgba[destIdx + 3] = Math.round(a * 128);
        } else if (minDist < 1.2) {
          const a = 0.5 + (minDist / 1.2) * 0.5;
          rgba[destIdx + 3] = Math.round(a * 255);
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

  console.log('Successfully created ultra-crisp transparent PNG:', outputPath);
}

processImage().catch(console.error);
