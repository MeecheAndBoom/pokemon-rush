/**
 * migrate-images-to-cloudinary.mjs
 *
 * Uploads every product image that is still hosted on a third-party host
 * (pokegradeonecards.com) to Cloudinary, then rewrites src/data/catalog.json so
 * the storefront and the seed serve those images from Cloudinary instead of
 * pulling them direct from the source site.
 *
 * Idempotent: a source-URL -> Cloudinary-URL map is kept in
 * data/cloudinary-images.json, so re-runs only upload what is still external.
 *
 * Usage:
 *   node scripts/migrate-images-to-cloudinary.mjs            # upload everything pending
 *   node scripts/migrate-images-to-cloudinary.mjs --limit 3   # upload the first few (smoke test)
 *   node scripts/migrate-images-to-cloudinary.mjs --dry-run   # list what would upload
 *
 * Reads Cloudinary credentials from .env.local.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";

// ------------------------------------------------------------ env

function loadEnvFile(file) {
  if (!file) return;
  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    return;
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnvFile(path.join(repoRoot, ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env.local"));

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
if (!cloudName || !apiKey || !apiSecret) {
  console.error("Cloudinary credentials missing. Set them in .env.local first.");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const limitArg = args.indexOf("--limit");
const limit = limitArg !== -1 ? Number(args[limitArg + 1]) || 0 : 0;
const CONCURRENCY = 4;
const FOLDER = "pokestore-direct/products";

// ------------------------------------------------------------ state

// The app/seed catalogue plus the intermediate build artefact both list images.
const catalogPaths = [
  path.join(repoRoot, "src", "data", "catalog.json"),
  path.join(repoRoot, "data", "catalog.json"),
].filter((p) => fs.existsSync(p));
const mapPath = path.join(repoRoot, "data", "cloudinary-images.json");

const catalogs = catalogPaths.map((p) => ({ path: p, data: JSON.parse(fs.readFileSync(p, "utf8")) }));
const urlMap = fs.existsSync(mapPath)
  ? JSON.parse(fs.readFileSync(mapPath, "utf8"))
  : {};

const isExternal = (url) => /^https?:\/\//i.test(url) && !url.includes("res.cloudinary.com");

// Collect unique external URLs across every catalogue.
const pending = [];
for (const { data } of catalogs) {
  for (const product of data) {
    for (const image of product.images || []) {
      if (!isExternal(image.url)) continue;
      if (urlMap[image.url]) continue;
      if (!pending.includes(image.url)) pending.push(image.url);
    }
  }
}

console.log(`External image URLs still pending: ${pending.length}`);

if (dryRun) {
  for (const url of pending) console.log(`WOULD UPLOAD ${url}`);
  process.exit(0);
}

if (pending.length === 0) {
  // Still make sure any mapped URLs are applied in case a previous run was partial.
  applyMap();
  console.log("Nothing to upload.");
  process.exit(0);
}

const queue = limit ? pending.slice(0, limit) : pending;

// ------------------------------------------------------------ upload

async function upload(url) {
  const result = await cloudinary.uploader.upload(url, {
    folder: FOLDER,
    resource_type: "image",
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  });
  return result.secure_url;
}

let done = 0;
let failed = 0;
const failures = [];

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    try {
      const secureUrl = await upload(url);
      urlMap[url] = secureUrl;
      done += 1;
      console.log(`OK   ${done}/${pending.length}  ${secureUrl}`);
    } catch (error) {
      failed += 1;
      failures.push({ url, error: String(error).slice(0, 160) });
      console.log(`FAIL ${url}  -> ${String(error).slice(0, 120)}`);
    }
    // Persist as we go so an interrupted run can resume.
    if (done % 5 === 0) {
      fs.writeFileSync(mapPath, `${JSON.stringify(urlMap, null, 2)}\n`, "utf8");
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

fs.writeFileSync(mapPath, `${JSON.stringify(urlMap, null, 2)}\n`, "utf8");

// ------------------------------------------------------------ rewrite catalogue

function applyMap() {
  let replaced = 0;
  for (const { path: file, data } of catalogs) {
    let fileReplaced = 0;
    for (const product of data) {
      for (const image of product.images || []) {
        const mapped = urlMap[image.url];
        if (mapped) {
          image.url = mapped;
          fileReplaced += 1;
        }
      }
    }
    if (fileReplaced) {
      fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
      console.log(`Rewrote ${fileReplaced} URL(s) in ${file}`);
    }
    replaced += fileReplaced;
  }
  return replaced;
}

const replaced = applyMap();

console.log(`\nUploaded: ${done}   Failed: ${failed}   Catalogue URLs rewritten: ${replaced}`);
if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures) console.log(`  ${f.url}\n    ${f.error}`);
}
console.log(`\nCatalogues: ${catalogPaths.join(", ")}`);
console.log(`URL map:    ${mapPath}`);
console.log("Next: node scripts/seed.mjs   (pushes the new URLs into MongoDB)");
