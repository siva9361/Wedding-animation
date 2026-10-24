import sharp from "sharp";

// Cut the watercolor corners and cartoon couple from the family's supplied floral card.
// The card's paper colour becomes transparency, so the pieces sit on the site's matching
// paper background; card text is masked out and every crop edge is feathered.
const source = "assets/floral-invitation-reference.png";
const paper = [248, 246, 239]; // Matches --floral-paper in globals.css.
type Box = { left: number; top: number; width: number; height: number };
// `hide` boxes are in source pixels and cover nearby card text or the couple.
// `oval` keeps only a soft ellipse, dropping stray leaves from the neighbouring corners.
const pieces: { name: string; crop: Box; hide: Box[]; oval?: boolean }[] = [
  {
    name: "floral-top-left",
    crop: { left: 0, top: 40, width: 500, height: 580 },
    hide: [{ left: 290, top: 290, width: 440, height: 400 }],
  },
  {
    name: "floral-top-right",
    crop: { left: 530, top: 50, width: 536, height: 660 },
    hide: [{ left: 330, top: 300, width: 450, height: 420 }],
  },
  {
    name: "floral-bottom-left",
    crop: { left: 0, top: 900, width: 470, height: 620 },
    hide: [{ left: 235, top: 900, width: 600, height: 390 }],
  },
  {
    name: "floral-bottom-right",
    crop: { left: 600, top: 1060, width: 466, height: 460 },
    hide: [{ left: 240, top: 960, width: 580, height: 320 }],
  },
  {
    name: "floral-couple",
    crop: { left: 335, top: 290, width: 400, height: 300 },
    hide: [],
    oval: true,
  },
];

const smooth = (edge: number, value: number) => {
  const t = Math.min(1, Math.max(0, value / edge));
  return t * t * (3 - 2 * t);
};

for (const { name, crop, hide, oval } of pieces) {
  const { data, info } = await sharp(source)
    .extract(crop)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = y * info.width + x;
      const rgb = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
      // Colour-to-alpha against the paper: the paper vanishes, washes stay translucent.
      let alpha = 0;
      for (let c = 0; c < 3; c++) alpha = Math.max(alpha, (paper[c] - rgb[c]) / paper[c]);
      const sx = crop.left + x;
      const sy = crop.top + y;
      let mask = smooth(45, Math.min(x, y, info.width - 1 - x, info.height - 1 - y));
      for (const box of hide) {
        const dx = Math.max(box.left - sx, 0, sx - (box.left + box.width));
        const dy = Math.max(box.top - sy, 0, sy - (box.top + box.height));
        mask *= smooth(90, Math.hypot(dx, dy));
      }
      if (oval) {
        const r = Math.hypot((x / info.width) * 2 - 1, (y / info.height) * 2 - 1);
        mask *= 1 - smooth(0.15, r - 0.9);
      }
      alpha = Math.min(1, Math.max(0, alpha)) * mask;
      for (let c = 0; c < 3; c++) {
        const restored = alpha > 0.004 ? paper[c] - (paper[c] - rgb[c]) / alpha : paper[c];
        out[i * 4 + c] = Math.round(Math.min(255, Math.max(0, restored)));
      }
      out[i * 4 + 3] = Math.round(alpha * 255);
    }
  }
  const result = await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 90, effort: 6 })
    .toFile(`public/images/${name}.webp`);
  console.log({ name, width: info.width, height: info.height, bytes: result.size });
}
