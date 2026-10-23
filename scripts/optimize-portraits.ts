import sharp from "sharp";

// Format conversion only. Keep the supplied photos, dimensions and transparency.
for (const person of ["groom", "bride", "couple"]) {
  const original = `assets/photos/${person}.png`;
  const destination = `public/images/${person}.webp`;
  const metadata = await sharp(original).metadata();
  const result = await sharp(original)
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(destination);
  console.log({
    person,
    width: metadata.width,
    height: metadata.height,
    alpha: metadata.hasAlpha,
    bytes: result.size,
  });
}
