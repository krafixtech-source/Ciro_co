import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processImageAccurate() {
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

  // The glass center is at x ~ 500. Glass width is roughly 340px to 660px.
  // The foam top is at y ~ 125. The base is at y ~ 875.
  // Outside this boundary, it is 100% background checkerboard.
  // Within the vertical slice, for each row y from 125 to 875, we find the left and right outer edge of the glass.
  
  // First, find glass bounds row by row from x=0 -> right and x=width-1 -> left
  const leftEdge = new Int32Array(height);
  const rightEdge = new Int32Array(height);

  function isBackgroundPixel(r, g, b) {
    const diff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
    const avg = (r + g + b) / 3;
    // The artificial checkerboard has pure neutral greys (#ffffff and #cccccc / #d0d0d0)
    // with very low saturation (diff <= 6)
    return diff <= 8 && avg > 175;
  }

  for (let y = 0; y < height; y++) {
    // Scan from left to find first non-background pixel
    let lx = 0;
    while (lx < width / 2) {
      const idx = (y * width + lx) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (!isBackgroundPixel(r, g, b)) {
        break;
      }
      lx++;
    }
    leftEdge[y] = lx;

    // Scan from right to find first non-background pixel
    let rx = width - 1;
    while (rx > width / 2) {
      const idx = (y * width + rx) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (!isBackgroundPixel(r, g, b)) {
        break;
      }
      rx--;
    }
    rightEdge[y] = rx;
  }

  // Top boundary of foam (find first row where leftEdge < rightEdge with width > 20)
  let topY = 0;
  while (topY < height && (rightEdge[topY] - leftEdge[topY] < 20 || leftEdge[topY] >= width / 2)) {
    topY++;
  }

  // Bottom boundary of glass base (find last row where width > 20)
  let bottomY = height - 1;
  while (bottomY > 0 && (rightEdge[bottomY] - leftEdge[bottomY] < 20 || leftEdge[bottomY] >= width / 2)) {
    bottomY--;
  }

  console.log(`Glass bounds: topY=${topY}, bottomY=${bottomY}`);

  // Build the masked image
  for (let y = 0; y < height; y++) {
    const minX = leftEdge[y];
    const maxX = rightEdge[y];

    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const destIdx = (y * width + x) * 4;

      rgba[destIdx + 0] = data[srcIdx + 0];
      rgba[destIdx + 1] = data[srcIdx + 1];
      rgba[destIdx + 2] = data[srcIdx + 2];

      if (y < topY || y > bottomY || x < minX || x > maxX) {
        // Outside the glass -> 100% Transparent
        rgba[destIdx + 3] = 0;
      } else {
        // Edge antialiasing (1-2px feather)
        const distFromEdge = Math.min(x - minX, maxX - x, y - topY, bottomY - y);
        if (distFromEdge === 0) {
          rgba[destIdx + 3] = 128;
        } else {
          // Inside the glass -> 100% OPAQUE SOLID (preserve every drop of cream, milk, foam, and ice!)
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

processImageAccurate().catch(console.error);
