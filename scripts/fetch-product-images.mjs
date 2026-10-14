// Fills in real product images for the SV-era Japanese sets that were imported
// without artwork (previously showing the WooCommerce "Awaiting product image"
// placeholder). Images are downloaded once and stored locally under
// public/images/products/<slug>.webp so no page depends on a remote host.
//
// Sources: pokegradeonecards.com (the store's own distributor gallery, which
// already supplies the rest of the catalogue) and the TCGplayer product CDN for
// the three sets it does not carry.
//
// Run: node scripts/fetch-product-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PGC = "https://pokegradeonecards.com/wp-content/uploads/2025/03";
const TCG = "https://tcgplayer-cdn.tcgplayer.com/product";

const sources = {
  // Booster boxes
  "sv4a-shiny-treasure-ex-booster-box": `${TCG}/565232_in_1000x1000.jpg`,
  "sv4k-ancient-roar-booster-box": `${PGC}/s-l960-32.webp`,
  "sv5a-crimson-haze-booster-box": `${PGC}/s-l500-7.webp`,
  "sv5k-wild-force-booster-box": `${PGC}/s-l960-34.webp`,
  "sv5m-cyber-judge-booster-box": `${TCG}/565222_in_1000x1000.jpg`,
  "sv7-stella-miracle-booster-box": `${PGC}/s-l500-4.webp`,
  "sv7a-paradise-dragona-booster-box": `${PGC}/s-l500-3.webp`,
  "sv8-super-electric-breaker-booster-box": `${PGC}/s-l500-2.webp`,
  // Sealed cases reuse the booster box artwork for the set
  "sv7-stella-miracle-case": `${PGC}/s-l500-4.webp`,
  "sv8-super-electric-breaker-case": `${PGC}/s-l500-2.webp`,
  "sv8a-terastal-festival-ex-case": `${TCG}/603428_in_1000x1000.jpg`,
};

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
const outDir = path.join(process.cwd(), "public", "images", "products");
fs.mkdirSync(outDir, { recursive: true });

const catalogPath = path.join(process.cwd(), "src", "data", "catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

let updated = 0;
for (const product of catalog) {
  const source = sources[product.slug];
  if (!source) continue;

  const outFile = path.join(outDir, `${product.slug}.webp`);
  try {
    const res = await fetch(source, { headers: { "user-agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());

    await sharp(buf)
      .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .webp({ quality: 86 })
      .toFile(outFile);

    product.images = [{ url: `/images/products/${product.slug}.webp`, alt: product.name }];
    updated += 1;
    const kb = Math.round(fs.statSync(outFile).size / 1024);
    console.log(`OK   ${product.slug}  ${kb}KB`);
  } catch (error) {
    console.log(`FAIL ${product.slug}: ${String(error).slice(0, 120)}`);
  }
}

fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
console.log(`\n${updated}/${Object.keys(sources).length} product images written and catalog updated.`);
