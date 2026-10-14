// Downloads anime character artwork into public/images/art-*.webp.
// Sources: Fandom wikis. Transparent art is used as-is; anything on a flat white
// background is chroma-keyed from the edges. A transparency check is reported so a
// bad source can be spotted immediately.
// Run: node scripts/fetch-anime.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "images");
fs.mkdirSync(outDir, { recursive: true });

const chars = [
  { slug: "luffy", wiki: "onepiece", file: "Monkey_D._Luffy_Start_of_Egghead.png" },
  { slug: "sanji", wiki: "onepiece", file: "Sanji_Anime_Concept_Art.png" },
  { slug: "nami", wiki: "onepiece", file: "Nami_Anime_Concept_Art.png" },
  { slug: "goku", wiki: "dragonball", file: "Goku_anime_profile.png" },
  { slug: "vegeta", wiki: "dragonball", file: "Vegeta_anime_profile.png" },
  { slug: "naruto", wiki: "naruto", file: "Naruto_Part_I.png" },
  { slug: "tanjiro", wiki: "kimetsu-no-yaiba", file: "Tanjiro_Kamado_Full_Body_(Anime).png" },
  { slug: "deku", wiki: "myheroacademia", file: "Izuku_Midoriya_(One_For_All)_Artwork_(All's_Justice).png" },
  { slug: "yuji", wiki: "jujutsu-kaisen", file: "Yuji_Itadori_(Anime).png" },
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

async function directUrl(wiki, file) {
  const api =
    `https://${wiki}.fandom.com/api.php?action=query&titles=` +
    encodeURIComponent(`File:${file}`) +
    "&prop=imageinfo&iiprop=url&format=json";
  const json = await (await fetch(api, { headers: { "user-agent": UA } })).json();
  const page = Object.values((json.query && json.query.pages) || {})[0];
  const url = page && page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url;
  if (!url) throw new Error("no imageinfo url");
  return `${url.split("/revision/")[0]}?format=original`;
}

// Flood-fill from the borders, clearing near-white pixels to transparent.
function keyOutWhite(data, width, height, channels) {
  const seen = new Uint8Array(width * height);
  const stack = [];
  const isWhite = (p) => {
    const i = p * channels;
    return data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 230;
  };
  const push = (p) => {
    if (p < 0 || p >= width * height || seen[p] || !isWhite(p)) return;
    seen[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < width; x += 1) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    push(y * width);
    push(y * width + width - 1);
  }
  while (stack.length) {
    const p = stack.pop();
    data[p * channels + 3] = 0;
    push(p - 1);
    push(p + 1);
    push(p - width);
    push(p + width);
  }
}

// Fraction of pixels that are meaningfully transparent.
function transparentFraction(data, channels) {
  let clear = 0;
  const total = data.length / channels;
  for (let p = 0; p < total; p += 1) {
    if (data[p * channels + 3] < 120) clear += 1;
  }
  return clear / total;
}

let ok = 0;
for (const c of chars) {
  const outFile = path.join(outDir, `art-${c.slug}.webp`);
  try {
    const url = await directUrl(c.wiki, c.file);
    const res = await fetch(url, {
      headers: { "user-agent": UA, referer: `https://${c.wiki}.fandom.com/` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());

    const { data, info } = await sharp(buf)
      .resize({ width: 1100, height: 1100, fit: "inside", withoutEnlargement: true })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    keyOutWhite(data, info.width, info.height, info.channels);
    const clear = transparentFraction(data, info.channels);

    const out = await sharp(data, { raw: info })
      .webp({ quality: 84, alphaQuality: 90 })
      .toFile(outFile);
    const kb = Math.round(fs.statSync(outFile).size / 1024);
    ok += 1;
    const verdict = clear > 0.05 ? "transparent" : "OPAQUE-BG";
    console.log(
      `OK   art-${c.slug}.webp  ${out.width}x${out.height}  ${kb}KB  clear=${(clear * 100).toFixed(0)}%  ${verdict}`
    );
  } catch (error) {
    console.log(`FAIL art-${c.slug}: ${String(error).slice(0, 130)}`);
  }
}
console.log(`\n${ok}/${chars.length} anime artwork files written to public/images`);
