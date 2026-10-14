import fs from "node:fs";
import path from "node:path";

/**
 * Builds the public catalogue from the scraped source.
 *
 * Goals:
 *  - clean, human-readable product names (no brand spam, no emoji, no shouty caps)
 *  - accurate brand / language / product type, re-derived from the title
 *  - descriptions and highlights that read like a real shop, not a template
 */

const root = process.cwd();
const src = path.join(root, "data", "mapped-products.json");
const out = path.join(root, "data", "catalog.json");
const appOut = path.join(root, "src", "data", "catalog.json");

const raw = JSON.parse(fs.readFileSync(src, "utf8"));

// ---------------------------------------------------------------- emoji

const EMOJI =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{2705}\u{274C}]/gu;

const stripEmoji = (s = "") => s.replace(EMOJI, "").replace(/[✅❌🔥💥🎉🎴📦📍💡🚚🛡🌟🎁]/g, "");

// ---------------------------------------------------------------- naming

// Descriptor fragments that add noise rather than meaning.
const NAME_NOISE = [
  /pok[eé]mon\s+tcg/gi,
  /pok[eé]mon\s+card\s+game/gi,
  /pok[eé]mon\s+cards?/gi,
  /pokemon\s+tcg/gi,
  /pokemon\s+cards?/gi,
  /trading\s+card\s+game/gi,
  /trading\s+cards?/gi,
  /\btcg\b/gi,
  /\bccg\b/gi,
  /card\s+game/gi,
  /factory\s+sealed/gi,
  /authentic\s+sealed/gi,
  /new\s*&\s*sealed/gi,
  /brand\s+new/gi,
  /u\.?\s?s\.?\s*presale/gi,
  /usa\s*&\s*europe/gi,
  /us\s+seller/gi,
  /\bpresale\b/gi,
  /pre[\s-]?order/gi,
  /pre\s?sale/gi,
  /\bsealed\b/gi,
  /\benglish\b/gi,
  /\bjapanese\b/gi,
  /\beng\b/gi,
  /\bjapan\b/gi,
  /\bchinese\b/gi,
  /\bkorean\b/gi,
  /\bus\b/gi,
  /english\s+edition/gi,
  /japanese\s+edition/gi,
];

function cleanName(input = "") {
  let s = stripEmoji(input).replace(/\s+/g, " ").trim();

  // Pull pack / box counts out before stripping.
  const counts = [];
  s = s.replace(
    /\(([^)]*\b(?:pack|packs|box|boxes|case|packs\s*\+[^)]*)\b[^)]*)\)/gi,
    (m, inner) => {
      if (/\d/.test(inner)) counts.push(inner.trim());
      return " ";
    }
  );

  // Normalise the separators used as dividers.
  s = s.replace(/\s*[|—–]\s*/g, " – ");

  // Strip descriptor noise repeatedly (they stack).
  let previous;
  do {
    previous = s;
    for (const re of NAME_NOISE) s = s.replace(re, " ");
    s = s.replace(/\s{2,}/g, " ");
  } while (s !== previous);

  // Remove leftover empty separators and edge punctuation.
  s = s
    .replace(/\s*\(\s*\)\s*/g, " ")
    .replace(/\s*\(\s*[^a-z0-9]*\s*\)\s*/gi, " ")
    .replace(/\s*\(\s*[^)]*\b(?:edition|confirmed|sealed|authentic|us|usa|u\.s\.?)\b[^)]*\)\s*/gi, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\bconfirmed\b/gi, " ")
    .replace(/\bstrenght\b/gi, "Strength")
    .replace(/\blegengs\b/gi, "Legends")
    .replace(/\s+new$/i, "")
    .replace(/(\s*–\s*)+/g, " – ")
    .replace(/^[\s–\-:,/]+|[\s–\-:,/]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+–\s+–\s+/g, " – ")
    .trim();

  // Where a " – " split leaves a short trailing brand word, drop it.
  const parts = s.split(" – ").map((p) => p.trim()).filter(Boolean);
  const filtered = parts.filter(
    (p) => !/^(cards?|box|sealed|japanese|english|tcg|pok[eé]mon|pokemon|usa|u\.s\.)$/i.test(p)
  );
  s = (filtered.length ? filtered : parts).join(" – ");

  return { name: s, counts };
}

function titleCase(input = "") {
  const minor = new Set([
    "of", "the", "and", "a", "an", "to", "in", "on", "for", "with", "vs", "by", "at", "from",
  ]);
  const prep = new Set(["of", "in", "on", "at", "to", "for", "with", "by", "from"]);

  const cap = (w) => w.replace(/[a-zà-ÿ]/, (c) => c.toUpperCase());
  const words = input.toLowerCase().split(" ");

  let out = words
    .map((word, i) => {
      if (!word) return word;
      if (i > 0 && minor.has(word)) {
        if (word === "the" && !prep.has(words[i - 1])) return cap(word);
        return word;
      }
      return cap(word);
    })
    .join(" ");

  return out
    .replace(/\btcg\b/gi, "TCG")
    .replace(/\betb\b/gi, "ETB")
    .replace(/\bop-?(\d+)/gi, "OP-$1")
    .replace(/\beb-?(\d+)/gi, "EB-$1")
    .replace(/\bprb-?(\d+)/gi, "PRB$1")
    .replace(/\bsv(\d+[a-z]?)/gi, "SV$1")
    .replace(/\bmb(\d+[a-z]?)/gi, "MB$1")
    .replace(/\bm(\d+[a-z]?)\b/gi, "M$1")
    .replace(/\btd-?(\d+)/gi, "TD$1")
    .replace(/\btd\b/gi, "TD")
    .replace(/\bsp\b/gi, "SP")
    .replace(/\bm-p\b/gi, "M-P")
    .replace(/\bhol\/([a-z0-9/-]+)/gi, (_, code) => `HOL/${code.toUpperCase()}`)
    .replace(/\bex\b/gi, "ex")
    .replace(/\bpokemon\b/gi, "Pokémon")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function slugify(input = "") {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---------------------------------------------------------------- detection

const LANG_RULES = [
  { value: "japanese", re: /\bjapanese\b|\bjapan\b|\bjp\b|日本語/i },
  { value: "chinese", re: /\bchinese\b|\bchina\b|simplified chinese|traditional chinese/i },
  { value: "korean", re: /\bkorean\b|\bkorea\b/i },
  { value: "english", re: /\benglish\b|\beng\b/i },
];

function detectLanguage(text, fallback) {
  for (const rule of LANG_RULES) if (rule.re.test(text)) return rule.value;
  return fallback === "japanese" ? "japanese" : "english";
}

const ACCESSORY_RE =
  /\bsleeves?\b|\bbinder\b|\bplaymat\b|toploader|\bdice\b|\balbum\b|\bportfolio\b|storage box|card case|deck box|sleeved/i;

const ONE_PIECE_RE =
  /\bone\s*piece\b|\bop-?\d|\beb-?\d|\bprb\d|romance dawn|azure sea|heroines edition|kingdoms of intrigue|pillars of streng|awakening of the new era|wings of the captain|500 years in the future|two legends|game two legends|the best vol/i;

const WEISS_RE = /weiss\s*schwarz|\bhololive\b|\bhol\//i;

const LICENSE_RE = /\bdisney\b|\bpixar\b|\bmarvel\b|\bchainsaw man\b/i;

const POKEMON_RE =
  /pok[eé]mon|pikachu|charizard|gengar|eevee|mega |scarlet|violet|sword|shield|\bsv\d|\bs\d+[a-z]?\b|elite trainer|\betb\b|booster|celebrations|shining fates|lost origin|lost thunder|obsidian|paldea|temporal|twilight|stellar|prismatic|surging|journey together|destined rivals|phantasmal|chaos rising|black bolt|white flare|ascended heroes|\b151\b|\bxy\b|phantom forces|team up|munikis|symphonia|dream ex|start deck|premium trainer|vstar|terastal|shiny treasure|cyber judge|ancient roar|crimson haze|wild force|night wanderer|paradise dragona|stella miracle|super electric|silver lance|black flame|battle partners|heat wave|mask of change|raging surf|future flash|clay burst|snow hazard|inferno x|glory of team rocket|dark order|mcdonald|zygarde|gardevoir|lucario|iron leaves|walking wake|roaring moon|miraidon|tohoku|fukuoka|hiroshima|storm emerald|mega evolution|prismatic/i;

function detectBrand(text, fallback) {
  const s = text.toLowerCase();
  if (/\bone piece\b/.test(s) || /\bop-?\d/.test(s) || /\beb-?\d/.test(s) || /\bprb\d/.test(s))
    return "one-piece";
  if (/weiss schwarz|hololive|hol\//.test(s)) return "weiss-schwarz";
  if (/\bdisney\b|\bpixar\b|\bmarvel\b/.test(s)) return "weiss-schwarz";
  if (
    /\bop-\d/.test(s) ||
    /romance dawn|azure sea|heroines edition|kingdoms of intrigue|pillars of streng|awakening of the new era|wings of the captain|500 years in the future|two legends/i.test(
      s
    )
  )
    return "one-piece";
  if (ACCESSORY_RE.test(s)) return "accessories";
  if (/pok[eé]mon|pokemon/.test(s) || /pikachu|charizard|gengar|eevee/.test(s)) return "pokemon";
  if (fallback === "accessories") return "pokemon";
  return fallback || "pokemon";
}

const ACCESSORY_TYPE_RE =
  /\bsleeves?\b|\bbinder\b|\bplaymat\b|\btoploader\b|\bdice\b|\balbum\b|\bportfolio\b|storage box|card case|deck box/i;

const SINGLE_RE =
  /\bfoil\b|\bsp\b|\bsr\b|\bsar\b|\bsec\b|\bpsa\b|\bcgc\b|\bbgs\b|graded|\bsingle\b|hol\/[a-z]+\d/i;

function detectType(text, brand, fallback) {
  const s = text.toLowerCase();

  if (/\bsealed case\b|case\s*\(1\d+\s*box|\(1\d+\s*box|\(20\s*box|\bcase\b.*\bboxes?\b/i.test(s))
    return "sealed-case";
  if (/elite trainer box|\betb\b/i.test(s)) return "elite-trainer-box";
  if (/\bbooster bundle\b|\bbundle\b/i.test(s)) return "booster-bundle";
  if (
    /ultra[-\s]?premium|super[-\s]?premium|premium collection|premium trainer box|special box|build\s*&\s*battle|\bcollection\b/i.test(
      s
    )
  )
    return "collection";
  if (/trial deck|starter deck|start deck/i.test(s)) return "trial-deck";
  if (/\bbooster packs?\b/i.test(s)) return "booster-pack";
  if (ACCESSORY_TYPE_RE.test(s)) return "accessory";
  if (SINGLE_RE.test(s)) return "single-card";
  if (/\bbooster box\b|\bbooster\b|display box|\bbox\b/i.test(s)) return "booster-box";

  if (brand === "accessories") return "accessory";
  if (fallback && fallback !== "accessory") return fallback;
  return "booster-box";
}

function detectPreorder(text) {
  return /presale|pre[\s-]?order|pre\s?sale|reserve/i.test(text);
}

function detectPacks(counts) {
  for (const c of counts) {
    const m = c.match(/(\d+)\s*(packs?|boxes|box)/i);
    if (m) return m[0].replace(/\s+/g, " ").trim();
  }
  return "";
}

// ---------------------------------------------------------------- copy

const TYPE_LABEL = {
  "booster-box": "booster box",
  "booster-bundle": "booster bundle",
  "elite-trainer-box": "Elite Trainer Box",
  "sealed-case": "sealed case",
  "booster-pack": "booster pack",
  collection: "premium collection",
  "trial-deck": "trial deck",
  "single-card": "single card",
  "graded-card": "graded card",
  accessory: "accessory",
};

const BRAND_LABEL = {
  pokemon: "Pokémon TCG",
  "one-piece": "One Piece Card Game",
  "weiss-schwarz": "Weiss Schwarz",
  accessories: "collecting accessories",
};

const LANG_LABEL = {
  english: "English",
  japanese: "Japanese",
  chinese: "Chinese",
  korean: "Korean",
};

const TYPE_COPY = {
  "booster-box":
    "A booster box is the standard way to open a set properly. You get the full pack count at a lower cost per pack than buying loose, which makes it the right pick whether you plan to open it or keep it sealed.",
  "booster-bundle":
    "Booster bundles group several packs into a single sealed package, a straightforward way to add to a set without committing to a full box.",
  "elite-trainer-box":
    "Elite Trainer Boxes bundle booster packs with the sleeves, dice, and storage most players need, so they work as a starter kit and a display piece at the same time.",
  "sealed-case":
    "A sealed case is the deepest way to hold a set. It stays factory sealed, which keeps the contents unsearched and the condition intact for the long term.",
  "booster-pack":
    "Single booster packs are the lowest-commitment way into a set. Each pack is factory sealed and sold individually.",
  collection:
    "Premium collections group a small number of packs with an exclusive promo or accessory, which makes them popular with collectors who want the bonus item as much as the packs.",
  "trial-deck":
    "Trial decks are ready to play straight out of the box, which makes them the simplest way to start a set or try the game.",
  "single-card":
    "This is a single card, kept in a sleeve and toploader so it arrives flat and free of surface marks.",
  "graded-card":
    "This card has been graded and encased, so its condition is verified and protected by the grading company.",
  accessory:
    "Made to keep cards protected and organised, whether you are storing a binder or sleeving a deck.",
};

const BRAND_COPY = {
  "one-piece":
    "The One Piece Card Game pairs competitive play with strong card art, so it appeals to players and collectors at the same time.",
  "weiss-schwarz":
    "Weiss Schwarz is a crossover game, which makes each release especially popular with fans of the series it features.",
};

const PACKING_LINES = [
  "Every order is inspected before it is packed. Seals, corners, and edges are checked, and anything that does not meet our standard is set aside rather than shipped and explained later.",
  "We verify the seal and inspect the box condition before dispatch, then pack it so the wrap cannot scuff and the corners cannot crush in transit.",
  "Before it leaves us the seal is checked and the box is inspected for corner and edge damage, then packed rigid so it arrives as it left.",
];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function buildCopy({ name, setName, brand, language, productType, preorder, packs, slug }) {
  const type = TYPE_LABEL[productType] || "product";
  const lang = LANG_LABEL[language] || "";
  const langPhrase = lang ? `${lang}-language ` : "";
  const seed = hash(slug);

  const nameRef = setName && setName.length > 3 ? setName : name;

  const opening = preorder
    ? `${name} is available to reserve ahead of release. We confirm availability before your order is dispatched, and if a release date moves you will hear it from us first.`
    : [
        `${name} is a factory-sealed ${langPhrase}${type} sourced through official distribution channels.`,
        `A sealed ${langPhrase}${type} that keeps ${nameRef} in original, unopened condition.`,
        `${name} arrives factory sealed, with the original wrap intact and the contents untouched.`,
      ][seed % 3];

  const paragraphs = [opening, TYPE_COPY[productType] || ""];

  if (brand === "pokemon" && language === "japanese") {
    paragraphs.push(
      "Japanese Pokémon print runs are produced in Japan and are known for consistent centring, stock, and surface finish. Many collectors prefer them for exactly that reason."
    );
  } else if (brand === "pokemon" && language === "chinese") {
    paragraphs.push(
      "Chinese Pokémon print runs are produced for the Chinese market and are collected for their distinct set composition and artwork."
    );
  } else if (BRAND_COPY[brand]) {
    paragraphs.push(BRAND_COPY[brand]);
  }

  paragraphs.push(PACKING_LINES[seed % PACKING_LINES.length]);

  const highlights = ["Factory sealed and inspected before dispatch"];
  if (lang) highlights.push(`${lang} print run`);
  if (productType === "sealed-case") highlights.push("Case sealed at the factory");
  else if (productType === "elite-trainer-box") highlights.push("Packs plus play accessories");
  else if (productType === "booster-box") highlights.push("Full box, sealed");
  else if (productType === "booster-pack") highlights.push("Single sealed pack");
  else if (productType === "trial-deck") highlights.push("Ready to play out of the box");
  if (packs) highlights.push(packs);
  highlights.push(preorder ? "Available to reserve now" : "Packed to protect the seal and corners");

  const specs = {
    Brand: BRAND_LABEL[brand] || "—",
    Language: lang || "—",
    Type: titleCase(type),
    Condition: preorder ? "Pre-order" : "New, sealed",
  };
  if (setName && setName.length > 3 && setName !== name) specs.Set = setName;
  if (packs) specs.Contents = packs;

  return {
    description: paragraphs.filter(Boolean).join("\n\n"),
    highlights,
    specs,
  };
}

// ---------------------------------------------------------------- assembly

function deriveSetName(name, brand, productType) {
  let s = name;
  const strip = [
    /\bbooster box\b/gi,
    /\bbooster bundle\b/gi,
    /\bbooster display box\b/gi,
    /\bdisplay box\b/gi,
    /elite trainer box/gi,
    /\betb\b/gi,
    /\bsealed case\b/gi,
    /\bbooster pack\b/gi,
    /premium collection/gi,
    /ultra[-\s]?premium collection/gi,
    /super[-\s]?premium collection/gi,
    /trial deck/gi,
    /premium trainer box/gi,
    /special box/gi,
  ];
  for (const re of strip) s = s.replace(re, " ");
  s = s.replace(/\s{2,}/g, " ").replace(/^[\s–\-:,]+|[\s–\-:,]+$/g, "").trim();
  return titleCase(s);
}

// ---------------------------------------------------------------- pricing

function parsePrices(p) {
  const text = [p.priceText, p.regPrice, p.salePrice, p.price]
    .filter((v) => v !== undefined && v !== null && String(v).trim() !== "")
    .join(" ");

  const range = text.match(/([\d,]+(?:\.\d+)?)\s*(?:–|—|-|to|through)\s*\$?([\d,]+(?:\.\d+)?)/i);
  if (range) {
    const a = Number(range[1].replace(/,/g, ""));
    const b = Number(range[2].replace(/,/g, ""));
    if (Number.isFinite(a) && Number.isFinite(b) && a < b) {
      return {
        price: Math.round(a * 100),
        compareAtPrice: null,
        rangeMax: Math.round(b * 100),
      };
    }
  }

  const nums = (text.match(/[\d,]+(?:\.\d+)?/g) || [])
    .map((n) => Number(n.replace(/,/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);

  const value = nums[0] ?? 0;
  return { price: Math.round(value * 100), compareAtPrice: null, rangeMax: null };
}

function bestImage(images = []) {
  const seen = new Set();
  const out = [];
  for (const img of images || []) {
    const url = img.url || img.src;
    if (!url) continue;
    if (!/^https?:\/\//.test(url)) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    out.push({ url, alt: img.alt || "" });
  }
  return out;
}

// ---------------------------------------------------------------- run

const catalog = raw.map((p) => {
  const titleRaw = String(p.title || "").replace(/\s+/g, " ").trim();
  const { name: cleaned, counts } = cleanName(titleRaw);
  const name = titleCase(cleaned) || titleCase(stripEmoji(titleRaw));

  const brand = detectBrand(titleRaw, p.brand);
  const language = detectLanguage(titleRaw, p.language);
  const productType = detectType(titleRaw, brand, p.productType);
  const preorder = detectPreorder(titleRaw);
  const packs = detectPacks(counts);

  const setName = deriveSetName(name, brand, productType) || name;

  const { price, compareAtPrice, rangeMax } = parsePrices(p);
  const images = bestImage(p.images);
  const copy = buildCopy({ name, setName, brand, language, productType, preorder, packs, slug: p.slug });

  if (rangeMax) copy.specs["Case price"] = `Up to $${(rangeMax / 100).toFixed(2)} for a full case`;

  return {
    slug: p.slug,
    name,
    subtitle: setName !== name ? setName : "",
    setName,
    brand,
    language,
    productType,
    price,
    compareAtPrice,
    currency: "USD",
    condition: "new-sealed",
    preorder,
    images: images.map((i) => ({ url: i.url, alt: i.alt || name })),
    description: copy.description,
    highlights: copy.highlights,
    specs: copy.specs,
    tags: [brand, language, productType].filter(Boolean),
    status: "published",
    featured: false,
    sourceUrl: p.url,
  };
}).filter((p) => p.price > 0);

// Regenerate clean, unique slugs from the display name.
{
  const used = new Set();
  for (const p of catalog) {
    const base = slugify(p.name) || p.slug;
    let slug = base;
    let n = 2;
    while (used.has(slug)) slug = `${base}-${n++}`;
    used.add(slug);
    p.slug = slug;
  }
}

fs.writeFileSync(out, JSON.stringify(catalog, null, 2));
fs.mkdirSync(path.dirname(appOut), { recursive: true });
fs.writeFileSync(appOut, JSON.stringify(catalog, null, 2));

const summary = {};
for (const p of catalog) summary[p.brand] = (summary[p.brand] || 0) + 1;
console.log(`Wrote ${catalog.length} products.`);
console.log("Brands:", summary);
console.log(
  catalog
    .slice(0, 12)
    .map((c) => `- ${c.name} :: ${c.brand}/${c.language}/${c.productType} $${(c.price / 100).toFixed(2)}`)
    .join("\n")
);
