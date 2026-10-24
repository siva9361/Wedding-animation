import sharp from "sharp";

// The Mecatronix credit logo: the supplied black background becomes transparency so the red
// mark sits cleanly on the footer bar. The artwork itself is not redrawn.
const { data, info } = await sharp("assets/mecatronix-logo.png")
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(info.width * info.height * 4);
const floor = 18; // Ignore the faint grain in the black background.
for (let i = 0; i < info.width * info.height; i++) {
  const rgb = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
  const alpha = Math.max(0, (Math.max(...rgb) - floor) / (255 - floor));
  for (let c = 0; c < 3; c++)
    out[i * 4 + c] = alpha ? Math.min(255, Math.round(rgb[c] / alpha)) : 0;
  out[i * 4 + 3] = Math.round(alpha * 255);
}
const trimmed = await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .png()
  .toBuffer();
const result = await sharp(trimmed)
  .resize({ height: 192 })
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile("public/images/mecatronix-logo.webp");
console.log({ width: result.width, height: result.height, bytes: result.size });
