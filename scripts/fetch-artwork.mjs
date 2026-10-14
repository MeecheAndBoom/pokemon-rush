// Downloads official Pokémon artwork (transparent PNG) into public/images/art-*.webp.
// Source: PokeAPI/sprites on GitHub (transparent artwork).
// Run: node scripts/fetch-artwork.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "public", "images");
fs.mkdirSync(outDir, { recursive: true });

const BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const artwork = [
  { name: "pikachu", id: 25 },
  { name: "charizard", id: 6 },
  { name: "gengar", id: 94 },
  { name: "eevee", id: 133 },
  { name: "snorlax", id: 143 },
  { name: "mewtwo", id: 150 },
  { name: "lucario", id: 448 },
  { name: "greninja", id: 658 },
];

let ok = 0;
for (const mon of artwork) {
  const src = `${BASE}/${mon.id}.png`;
  const outFile = path.join(outDir, `art-${mon.name}.webp`);
  try {
    const response = await fetch(src, {
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const info = await sharp(buffer)
      .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 90 })
      .toFile(outFile);
    const kb = Math.round(fs.statSync(outFile).size / 1024);
    ok += 1;
    console.log(`OK   art-${mon.name}.webp  ${info.width}x${info.height}  ${kb}KB`);
  } catch (error) {
    console.log(`FAIL art-${mon.name}: ${String(error).slice(0, 120)}`);
  }
}
console.log(`\n${ok}/${artwork.length} artwork files written to public/images`);
