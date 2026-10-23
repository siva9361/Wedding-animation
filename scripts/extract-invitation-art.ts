import sharp from "sharp";

// Crop the family's original printed symbol; do not redraw or regenerate it.
await sharp("assets/invitation-reference.jpg")
  .extract({ left: 1105, top: 335, width: 190, height: 255 })
  .webp({ lossless: true })
  .toFile("public/images/vinayagar.webp");

console.log("Saved the supplied Vinayagar artwork to public/images/vinayagar.webp");
