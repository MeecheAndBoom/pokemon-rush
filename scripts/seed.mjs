/**
 * seed.mjs
 *
 * Creates the first admin user, default payment methods, categories, and
 * (optionally) imports the bundled catalogue into MongoDB.
 *
 * Usage:  node scripts/seed.mjs
 * Reads configuration from .env.local.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ------------------------------------------------------------ env

// Minimal .env parser (values already in the process environment win).
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

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Add it to .env.local first.");
  process.exit(1);
}

// ----------------------------------------------------------------- models

const { Schema, model, models } = mongoose;
const opts = { timestamps: true };

const AdminUser =
  models.AdminUser ||
  model(
    "AdminUser",
    new Schema(
      {
        email: { type: String, required: true, unique: true, index: true, lowercase: true },
        passwordHash: { type: String, required: true },
        name: { type: String, default: "Admin" },
        role: { type: String, enum: ["admin", "staff"], default: "admin" },
        lastLoginAt: { type: Date },
      },
      opts
    )
  );

const PaymentMethod =
  models.PaymentMethod ||
  model(
    "PaymentMethod",
    new Schema(
      {
        slug: { type: String, required: true, unique: true, index: true },
        label: { type: String, required: true },
        description: { type: String, default: "" },
        instructions: { type: String, default: "" },
        details: [{ label: String, value: String }],
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true, index: true },
      },
      opts
    )
  );

const Category =
  models.Category ||
  model(
    "Category",
    new Schema(
      {
        slug: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true },
        parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null, index: true },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true, index: true },
        seo: {
          title: { type: String, default: "" },
          description: { type: String, default: "" },
        },
      },
      opts
    )
  );

const Product =
  models.Product ||
  model(
    "Product",
    new Schema(
      {
        slug: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true },
        subtitle: { type: String, default: "" },
        brand: { type: String, default: "pokemon", index: true },
        language: { type: String, default: "english", index: true },
        productType: { type: String, default: "booster-box", index: true },
        setName: { type: String, default: "" },
        series: { type: String, default: "" },
        releaseDate: { type: Date },
        sku: { type: String, sparse: true },
        price: { type: Number, required: true, default: 0 },
        compareAtPrice: { type: Number },
        currency: { type: String, default: "USD" },
        condition: { type: String, default: "new-sealed" },
        description: { type: String, default: "" },
        highlights: { type: [String], default: [] },
        specs: { type: Schema.Types.Mixed, default: {} },
        tags: { type: [String], default: [] },
        images: [{ url: String, alt: String }],
        status: { type: String, default: "published", index: true },
        featured: { type: Boolean, default: false },
      },
      opts
    )
  );

const Review =
  models.Review ||
  model(
    "Review",
    new Schema(
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", index: true },
        orderId: { type: Schema.Types.ObjectId, ref: "Order" },
        authorName: { type: String, required: true },
        authorEmail: { type: String, default: "" },
        rating: { type: Number, min: 1, max: 5, required: true },
        title: { type: String, default: "" },
        body: { type: String, required: true },
        status: { type: String, default: "approved", index: true },
        verifiedPurchase: { type: Boolean, default: false },
        helpfulCount: { type: Number, default: 0 },
        adminReply: { type: String, default: "" },
        featured: { type: Boolean, default: false },
      },
      opts
    )
  );

// ----------------------------------------------------------------- data

const PAYMENT_METHODS = [
  {
    slug: "card-link",
    label: "Secure card link",
    description:
      "We email a secure, single-use payment link once your order and shipping total are confirmed.",
    instructions:
      "After you place the order we send a secure payment link to the same email address. The link hosts a single payment for that order only, and no card details are stored on our site.",
    order: 0,
  },
  {
    slug: "bank-transfer",
    label: "Bank transfer",
    description:
      "Pay by wire or ACH transfer. Our account details are sent with the order confirmation.",
    instructions:
      "We email our bank details with your order. Send the exact total and include your order number as the reference so we can match the payment quickly.",
    order: 1,
  },
  {
    slug: "interac-e-transfer",
    label: "Interac e-Transfer",
    description: "Canadian customers can pay by Interac e-Transfer.",
    instructions:
      "We email the e-Transfer recipient address with your order. Use the order number in the message so we can release the payment.",
    order: 2,
  },
  {
    slug: "crypto",
    label: "Crypto",
    description: "Pay in stablecoin or Bitcoin. Confirm with us before sending.",
    instructions:
      "We send the wallet address and the exact amount with your order. Always confirm the address with us through the support email before sending funds.",
    order: 3,
  },
];

const CATEGORIES = [
  { slug: "english-pokemon", name: "English Pokémon", order: 0, description: "English-language Pokémon sealed product." },
  { slug: "japanese-pokemon", name: "Japanese Pokémon", order: 1, description: "Japanese-language Pokémon sealed product." },
  { slug: "one-piece", name: "One Piece", order: 2, description: "The One Piece Card Game, English and Japanese." },
  { slug: "weiss-schwarz", name: "Weiss Schwarz", order: 3, description: "Weiss Schwarz and other Bushiroad crossover sets." },
  { slug: "accessories", name: "Accessories", order: 4, description: "Sleeves, storage, and tools for collectors." },
];

const REVIEWS = [
  {
    authorName: "Daniel R.",
    rating: 5,
    title: "Packed like it mattered",
    body: "The box arrived with the seal untouched and the corners perfect. You can tell someone actually checked it before it shipped.",
    featured: true,
    status: "approved",
  },
  {
    authorName: "Priya S.",
    rating: 5,
    title: "Smooth from order to door",
    body: "I ordered a Japanese booster box and had tracking the next morning. The condition matched the photos exactly.",
    featured: true,
    status: "approved",
  },
  {
    authorName: "Marcus T.",
    rating: 4,
    title: "Great case, honest timing",
    body: "The sealed case took a little longer because it was a pre-order, but they kept me updated the whole way. Worth the wait.",
    featured: false,
    status: "approved",
  },
  {
    authorName: "Elena K.",
    rating: 5,
    title: "Knows the product",
    body: "Asked a question about a set difference and got a real answer, not a copy-paste reply. Bought two boxes after that.",
    featured: false,
    status: "approved",
  },
];

// ----------------------------------------------------------------- run

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  // Admin user
  const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (!password) {
    console.warn("ADMIN_PASSWORD not set - skipping admin user seed.");
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await AdminUser.updateOne(
      { email },
      { $set: { email, passwordHash, name: "PokéStore Direct Admin", role: "admin" } },
      { upsert: true }
    );
    console.log(`Admin user ready: ${email}`);
  }

  // Storefront settings. Never clobbers values the admin has already saved.
  const settings = mongoose.connection.db.collection("sitesettings");
  const existing = await settings.findOne({ key: "site" });
  if (!existing) {
    await settings.insertOne({
      key: "site",
      adminEmail: email,
      phone: "",
      whatsapp: "",
      whatsappMessage: "",
      address: { line1: "", line2: "", city: "", country: "" },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`Storefront settings created (notifications -> ${email}).`);
  } else if (!existing.adminEmail) {
    await settings.updateOne(
      { key: "site" },
      { $set: { adminEmail: email, updatedAt: new Date() } }
    );
    console.log(`Storefront settings notifications -> ${email}.`);
  } else {
    console.log("Storefront settings already saved - leaving them untouched.");
  }

  // Payment methods
  for (const method of PAYMENT_METHODS) {
    await PaymentMethod.updateOne(
      { slug: method.slug },
      { $set: { ...method, isActive: true } },
      { upsert: true }
    );
  }
  console.log(`Payment methods ready: ${PAYMENT_METHODS.length}`);

  // Categories
  for (const category of CATEGORIES) {
    await Category.updateOne(
      { slug: category.slug },
      { $set: { ...category, isActive: true } },
      { upsert: true }
    );
  }
  console.log(`Categories ready: ${CATEGORIES.length}`);

  // Catalogue
  let catalog = [];
  try {
    const raw = fs.readFileSync(new URL("../src/data/catalog.json", import.meta.url), "utf8");
    catalog = JSON.parse(raw);
  } catch {
    console.warn("Could not read src/data/catalog.json - skipping catalogue import.");
  }

  if (catalog.length) {
    if (process.argv.includes("--reset-products")) {
      const removed = await Product.deleteMany({});
      console.log(`Removed ${removed.deletedCount} existing products.`);
    }
    const operations = catalog.map((p) => ({
      updateOne: {
        filter: { slug: p.slug },
        update: {
          $set: {
            slug: p.slug,
            name: p.name,
            subtitle: p.subtitle || "",
            setName: p.setName || "",
            brand: p.brand,
            language: p.language === "n/a" ? "n/a" : p.language,
            productType: p.productType,
            price: p.price,
            compareAtPrice: p.compareAtPrice ?? undefined,
            currency: p.currency || "USD",
            condition: p.condition || "new-sealed",
            description: p.description || "",
            highlights: p.highlights || [],
            specs: p.specs || {},
            tags: p.tags || [],
            images: p.images || [],
            status: p.status || "published",
            featured: Boolean(p.featured),
          },
        },
        upsert: true,
      },
    }));

    let imported = 0;
    for (let i = 0; i < operations.length; i += 50) {
      const res = await Product.bulkWrite(operations.slice(i, i + 50), { ordered: false });
      imported += (res.upsertedCount || 0) + (res.modifiedCount || 0);
    }
    console.log(`Catalogue ready: ${catalog.length} products (${imported} written)`);
  }

  // Reviews
  const existingReviews = await Review.countDocuments();
  if (existingReviews === 0) {
    await Review.insertMany(REVIEWS);
    console.log(`Reviews ready: ${REVIEWS.length}`);
  } else {
    console.log(`Reviews already present (${existingReviews}) - skipped.`);
  }

  await mongoose.disconnect();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
