// Downloads a curated set of on-brand images into public/images/ and optimizes them.
// Sources are the shared product catalogue plus a few real store photos.
// Run: node scripts/fetch-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "public", "images");
fs.mkdirSync(outDir, { recursive: true });

const catalog = JSON.parse(fs.readFileSync(path.join(root, "data", "catalog.json"), "utf8"));

const used = new Set();
function pick(predicate) {
  const product = catalog.find((p) => predicate(p) && p.images && p.images.length);
  if (!product) return null;
  const image = product.images.find((img) => !used.has(img.url)) ?? product.images[0];
  used.add(image.url);
  return image.url;
}

const REF = "https://pokegradeonecards.com/wp-content/uploads";

const jobs = [
  // Brand / category tiles
  { name: "brand-pokemon", src: pick((p) => p.brand === "pokemon" && p.language === "japanese" && p.productType === "booster-box") },
  { name: "brand-one-piece", src: pick((p) => p.brand === "one-piece" && p.productType === "booster-box") },
  { name: "brand-weiss-schwarz", src: pick((p) => p.brand === "weiss-schwarz") },
  { name: "brand-accessories", src: pick((p) => p.brand === "accessories") },

  // Hero and section images
  { name: "hero", src: pick((p) => p.brand === "pokemon" && p.productType === "elite-trainer-box") },
  { name: "section-pokemon", src: pick((p) => p.brand === "pokemon" && p.productType === "sealed-case") },
  { name: "section-one-piece", src: pick((p) => p.brand === "one-piece" && p.productType === "sealed-case") },
  { name: "section-weiss", src: pick((p) => p.brand === "weiss-schwarz" && p.productType === "booster-box") },
  { name: "section-store", src: `${REF}/2025/12/WhatsApp-Image-2025-12-22-at-10.46.16_f164710c.jpg` },
  { name: "section-shipping", src: `${REF}/2025/12/WhatsApp-Image-2025-12-22-at-10.46.15_41097604.jpg` },
  { name: "section-storage", src: `${REF}/2026/01/WhatsApp-Image-2026-01-25-at-10.02.06-PM.jpeg` },

  // Blog covers
  { name: "blog-resealed", src: pick((p) => p.brand === "pokemon" && p.productType === "booster-box" && p.language === "english") },
  { name: "blog-japanese-english", src: pick((p) => p.brand === "pokemon" && p.language === "japanese") },
  { name: "blog-etb", src: pick((p) => p.productType === "elite-trainer-box") },
  { name: "blog-packing", src: `${REF}/2025/12/WhatsApp-Image-2025-12-22-at-10.46.16_f65d190f.jpg` },
  { name: "blog-case", src: pick((p) => p.productType === "sealed-case") },
  { name: "blog-weiss", src: pick((p) => p.brand === "weiss-schwarz") },
];

const manifest = [];

for (const job of jobs) {
  if (!job.src) {
    console.log(`SKIP ${job.name}: no source found`);
    continue;
  }
  const outFile = path.join(outDir, `${job.name}.webp`);
  try {
    const response = await fetch(job.src, {
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const info = await sharp(buffer)
      .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outFile);
    const kb = Math.round(fs.statSync(outFile).size / 1024);
    manifest.push({ name: job.name, width: info.width, height: info.height, kb });
    console.log(`OK   ${job.name}.webp  ${info.width}x${info.height}  ${kb}KB`);
  } catch (error) {
    console.log(`FAIL ${job.name}: ${String(error).slice(0, 140)}`);
  }
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log(`\n${manifest.length}/${jobs.length} images written to public/images`);
