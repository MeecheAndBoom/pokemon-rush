/**
 * Per-page search metadata.
 *
 * Titles and descriptions here come from the keyword research in
 * content/keyword-research.md (see content/keywords.json for the raw output).
 *
 * The root layout appends " | PokéStore Direct" to page titles, so a page title
 * must stay at or under 41 characters for the rendered <title> to remain within
 * the ~60 character limit Google displays. Pages whose title is already the full
 * string set `absolute: true`.
 */
export type SeoEntry = {
  title: string;
  /** Bypass the root title template because the title is already complete. */
  absolute?: boolean;
  description: string;
  keywords: readonly string[];
};

export const pageSeo: Record<string, SeoEntry> = {
  "/": {
    title: "Sealed Pokémon Cards, Boxes & Cases | PokéStore Direct",
    absolute: true,
    description:
      "Factory-sealed Pokémon, One Piece and Weiss Schwarz cards. Booster boxes, ETBs, bundles and cases, checked before dispatch and shipped worldwide.",
    keywords: [
      "sealed pokemon cards",
      "factory sealed trading cards",
      "buy sealed pokemon cards",
      "sealed tcg product online",
      "pokemon booster boxes",
    ],
  },
  "/shop": {
    title: "Buy Sealed Trading Cards Online",
    description:
      "Shop factory-sealed booster boxes, ETBs, bundles and cases for Pokémon, One Piece and Weiss Schwarz. Authentic product, packed to arrive sealed.",
    keywords: [
      "sealed trading cards",
      "tcg booster boxes for sale",
      "buy sealed trading cards online",
      "pokemon one piece weiss schwarz",
    ],
  },
  "/services": {
    title: "TCG Sourcing, Pre-Orders & Advice",
    description:
      "Need a set, language or case we do not list? We source sealed Pokémon, One Piece and Weiss Schwarz, take pre-orders and give collector advice.",
    keywords: ["tcg sourcing service", "sealed case sourcing", "card pre-order service", "collector advice"],
  },
  "/about": {
    title: "About PokéStore Direct | Sealed TCG Specialists",
    absolute: true,
    description:
      "We sell factory-sealed Pokémon, One Piece and Weiss Schwarz only. Sourced through official distribution and checked before every order ships.",
    keywords: ["sealed tcg specialist store", "authentic sealed pokemon seller", "pokestore direct"],
  },
  "/blog": {
    title: "Sealed TCG Guides & Market Notes",
    description:
      "Buying guides and market notes on sealed Pokémon, One Piece and Weiss Schwarz product: storage, print runs, pull rates, reseal checks and grading.",
    keywords: [
      "sealed trading card guides",
      "pokemon card investing",
      "sealed product blog",
      "tcg market notes",
    ],
  },
  "/contact": {
    title: "Contact Us & Wholesale Enquiries",
    description:
      "Contact PokéStore Direct about an order, a release we do not stock, wholesale pricing or a sourcing request. A real person replies within one business day.",
    keywords: ["contact pokestore direct", "sealed card support", "wholesale enquiries"],
  },
  "/support": {
    title: "Support & FAQs | PokéStore Direct",
    absolute: true,
    description:
      "Answers on ordering, payment, shipping, tracking and pre-orders for sealed Pokémon, One Piece and Weiss Schwarz product. Contact a real person any time.",
    keywords: [
      "sealed trading card order help",
      "pokemon card order faq",
      "pre-order cancellation",
      "tracking help",
    ],
  },
  "/track-order": {
    title: "Track an Order",
    description:
      "Track a PokéStore Direct order with your order reference. See current status, dispatch progress and carrier tracking for sealed card deliveries.",
    keywords: ["track order", "pokestore direct tracking", "sealed card delivery status"],
  },
  "/shipping-delivery": {
    title: "Shipping & Delivery",
    description:
      "How we pack and ship factory-sealed trading cards worldwide, dispatch times, tracking, and what to do if a parcel is delayed or arrives damaged.",
    keywords: [
      "worldwide trading card shipping",
      "sealed pokemon shipping",
      "how long does shipping take",
      "packed to arrive sealed",
    ],
  },
  "/returns-refunds": {
    title: "Returns & Refunds",
    description:
      "Our returns and refund policy for sealed trading cards, including damaged parcels, pre-order cancellations and what cannot be returned once opened.",
    keywords: [
      "sealed trading card returns",
      "can i return pokemon cards",
      "pre-order refund",
      "damaged parcel policy",
    ],
  },
  "/reviews": {
    title: "Customer Reviews",
    description:
      "What buyers say about ordering sealed Pokémon, One Piece and Weiss Schwarz product from PokéStore Direct, and how we handle the rare problem order.",
    keywords: ["pokestore direct reviews", "sealed card store reviews", "trusted tcg reseller"],
  },
  "/wholesale": {
    title: "Wholesale Sealed TCG",
    description:
      "Wholesale and bulk pricing on sealed Pokémon, One Piece and Weiss Schwarz cases for shops, breakers and resellers. Tell us what you need.",
    keywords: ["wholesale pokemon cards", "wholesale one piece cards", "bulk sealed cases", "tcg wholesale usa"],
  },
  "/talk-to-a-specialist": {
    title: "Talk to a Specialist",
    description:
      "Tell us the set, language or case you are after and a specialist will confirm availability, sourcing options and pricing for sealed trading card product.",
    keywords: ["tcg sourcing request", "find sealed product", "card specialist"],
  },
  "/finance-disclosure": {
    title: "Finance Disclosure",
    description:
      "How PokéStore Direct handles payment instructions, pricing, currency and financial disclosures for sealed trading card orders.",
    keywords: ["finance disclosure", "pokestore direct payment"],
  },
  "/legal": {
    title: "Legal & Policies",
    description:
      "Terms, privacy, cookies, accessibility and disclaimer documents for PokéStore Direct, covering sealed trading card orders and website use.",
    keywords: ["terms and conditions", "privacy policy", "legal"],
  },
  "/legal/sitemap": {
    title: "Sitemap",
    description:
      "Every page on pokestoredirect.com, grouped by shop, company, help and legal sections, in one place.",
    keywords: ["sitemap", "pokestore direct pages"],
  },
};

export type BrandSeo = {
  title: string;
  description: string;
  keywords: readonly string[];
};

export const brandSeo: Record<string, BrandSeo> = {
  pokemon: {
    title: "Sealed Pokémon Booster Boxes & ETBs",
    description:
      "Buy factory-sealed Pokémon booster boxes, Elite Trainer Boxes and bundles, English and Japanese. Inspected for reseals before dispatch. Ships worldwide.",
    keywords: [
      "pokemon booster box",
      "elite trainer box",
      "pokemon booster bundle",
      "sealed pokemon cards for sale",
      "japanese pokemon booster box",
    ],
  },
  "one-piece": {
    title: "Sealed One Piece Booster Boxes & Cases",
    description:
      "Buy sealed One Piece Card Game booster boxes, cases and starter decks, English and Japanese. Factory-sealed, checked and shipped worldwide.",
    keywords: [
      "one piece card game booster box",
      "one piece tcg english booster box",
      "one piece sealed case",
      "one piece starter deck",
    ],
  },
  "weiss-schwarz": {
    title: "Sealed Weiss Schwarz Boxes & Trial Decks",
    description:
      "Shop sealed Weiss Schwarz booster boxes and trial decks, English and Japanese, including English-exclusive sets. Authentic product, shipped worldwide.",
    keywords: [
      "weiss schwarz booster box",
      "weiss schwarz english booster box",
      "weiss schwarz trial deck",
      "weiss schwarz japanese booster box",
    ],
  },
  accessories: {
    title: "Card Sleeves, Toploaders & Storage",
    description:
      "Protect your cards with sleeves, toploaders, storage boxes and booster box protectors. Accessories chosen for sealed and graded collections.",
    keywords: ["pokemon card sleeves", "toploaders", "card storage box", "booster box protector"],
  },
};

/** Per-article search metadata, keyed by post slug. */
export const postSeo: Record<string, BrandSeo> = {
  "storing-sealed-product-humidity-light-long-hold": {
    title: "How to Store Sealed Pokémon Product: Humidity & Light",
    description:
      "A storage routine for sealed Pokémon product: 40 to 50 percent humidity, stable temperature, no direct sun, and why the garage and attic ruin boxes.",
    keywords: [
      "how to store pokemon booster boxes",
      "sealed pokemon storage",
      "humidity pokemon cards",
      "best way to store sealed product",
    ],
  },
  "japanese-vs-english-print-runs-box-maths": {
    title: "Japanese vs English Pokémon Boxes: Print Run Maths",
    description:
      "An English box is 36 packs of 10; a Japanese box is 30 packs of 5. What that difference means for pull density, print quality, price and resale.",
    keywords: [
      "japanese vs english pokemon cards",
      "how many packs in a japanese booster box",
      "japanese booster box vs english",
      "why are japanese pokemon cards cheaper",
    ],
  },
  "one-piece-op15-worldwide-launch-april-restricted-list": {
    title: "One Piece OP-15 Launch & the April 2026 Restricted List",
    description:
      "OP-15, Adventure on Kami's Island, launched worldwide on 3 April 2026. What the April ban list changed and what is inside an English display.",
    keywords: [
      "one piece op-15",
      "one piece restricted list",
      "one piece card game booster box",
      "adventure on kamis island",
    ],
  },
  "psa-cgc-bgs-grading-value-2026": {
    title: "PSA vs CGC vs BGS: Pokémon Grading Value 2026",
    description:
      "PSA slabs outsell CGC and BGS on the same card, but 2026 prices moved again. How to work out whether grading a Pokémon card is worth the fee.",
    keywords: [
      "psa grading cost",
      "psa vs cgc vs bgs",
      "pokemon card grading",
      "is grading pokemon cards worth it",
    ],
  },
  "30th-celebration-set-pull-rates-sealed-prices": {
    title: "30th Celebration Pull Rates & Sealed Prices",
    description:
      "The 30th Celebration set shipped with five all-foil cards per pack and a Classic Collection chase. What is inside, and how sealed prices have moved.",
    keywords: [
      "pokemon 30th anniversary",
      "30th celebration pull rates",
      "pokemon 30th anniversary set",
      "sealed pokemon prices",
    ],
  },
  "checking-sealed-boxes-for-reseals": {
    title: "How to Check a Sealed Pokémon Box for Reseals",
    description:
      "Shrink wrap seams, factory logos, weight and glue lines: the reseal checks we run on every sealed Pokémon box, and the signs that should stop you buying.",
    keywords: [
      "how to tell if a pokemon box is resealed",
      "resealed pokemon booster box",
      "fake pokemon cards",
      "sealed pokemon verification",
    ],
  },
  "weiss-schwarz-english-2026-releases": {
    title: "Weiss Schwarz English 2026 Release Schedule & Sets",
    description:
      "Weiss Schwarz English added Umamusume, Blue Archive, NIKKE and more through 2026. A tour of the release calendar and why English-exclusive cards hold value.",
    keywords: [
      "weiss schwarz english 2026 releases",
      "weiss schwarz release schedule 2026",
      "weiss schwarz english booster box",
      "what is weiss schwarz",
    ],
  },
};
