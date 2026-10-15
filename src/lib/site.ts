export type Address = {
  line1: string;
  line2: string;
  city: string;
  country: string;
};

// Static defaults. The live values can be overridden from Admin -> Settings
// (see src/lib/settings.ts). Anything displayed on the storefront should be read
// through getSiteSettings() rather than imported from here directly.
export const site = {
  name: "PokéStore Direct",
  shortName: "PokéStore Direct",
  tagline: "Authentic trading cards, sealed and ready to ship.",
  description:
    "PokéStore Direct supplies factory-sealed Pokémon, One Piece, and Weiss Schwarz trading cards, sourced through official distribution channels and shipped worldwide.",
  url: "https://www.pokestoredirect.com",
  phone: "(213) 300-5923",
  email: "sales@pokestoredirect.com",
  hours: "Monday to Friday, 9am – 6pm (PT)",
  address: {
    line1: "",
    line2: "",
    city: "Los Angeles, CA",
    country: "United States",
  } as Address,
  whatsapp: "12133005923",
  whatsappMessage:
    "Hi PokéStore Direct — I'd like some help with a sealed card order.",
  social: {
    instagram: "https://instagram.com",
    x: "https://x.com",
    facebook: "https://facebook.com",
  },
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export const shopNav = [
  { label: "Pokémon", href: "/shop/pokemon" },
  { label: "One Piece", href: "/shop/one-piece" },
  { label: "Weiss Schwarz", href: "/shop/weiss-schwarz" },
  { label: "Accessories", href: "/shop/accessories" },
];

export const footerNav = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Japanese Pokémon", href: "/shop/pokemon?language=japanese" },
      { label: "English Pokémon", href: "/shop/pokemon?language=english" },
      { label: "Elite Trainer Boxes", href: "/shop/pokemon?type=elite-trainer-box" },
      { label: "Sealed cases", href: "/shop/pokemon?type=sealed-case" },
      { label: "One Piece", href: "/shop/one-piece" },
      { label: "Weiss Schwarz", href: "/shop/weiss-schwarz" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blog & guides", href: "/blog" },
      { label: "Reviews", href: "/reviews" },
      { label: "Contact", href: "/contact" },
      { label: "Talk to a specialist", href: "/talk-to-a-specialist" },
      { label: "Wholesale", href: "/wholesale" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Support", href: "/support" },
      { label: "Track an order", href: "/track-order" },
      { label: "Shipping & delivery", href: "/shipping-delivery" },
      { label: "Returns & refunds", href: "/returns-refunds" },
      { label: "Finance disclosure", href: "/finance-disclosure" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & conditions", href: "/legal/terms" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Cookies policy", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Disclaimer", href: "/legal/disclaimer" },
      { label: "Sitemap", href: "/legal/sitemap" },
    ],
  },
];

/** Joins the non-empty parts of an address into a single display string. */
export function formatAddress(address: Address) {
  return [address.line1, address.line2, address.city, address.country]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");
}
