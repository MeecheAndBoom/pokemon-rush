export const site = {
  name: "Pokemon Rush",
  shortName: "Pokemon Rush",
  tagline: "Authentic trading cards, sealed and ready to ship.",
  description:
    "Pokemon Rush supplies factory-sealed Pokémon, One Piece, and Weiss Schwarz trading cards, sourced through official distribution channels and shipped worldwide.",
  url: "http://localhost:3000",
  phone: "(313) 364-9615",
  phoneHref: "tel:+13133649615",
  email: "support@pokemonrush.com",
  salesEmail: "sales@pokemonrush.com",
  hours: "Monday to Friday, 9am – 6pm (EST)",
  address: {
    line1: "Sunshine City Alpa 2F",
    line2: "3 Chome-1-2 Higashiikebukuro",
    city: "Toshima City, Tokyo 170-6002",
    country: "Japan",
  },
  social: {
    instagram: "https://instagram.com",
    x: "https://x.com",
    facebook: "https://facebook.com",
  },
};

export const mainNav = [
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
      { label: "Japanese Pokémon", href: "/shop/pokemon/japanese" },
      { label: "English Pokémon", href: "/shop/pokemon/english" },
      { label: "Elite Trainer Boxes", href: "/shop/pokemon/elite-trainer-box" },
      { label: "Sealed cases", href: "/shop/pokemon/sealed-case" },
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
