export type ReviewEntry = {
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  product?: string;
  date: string;
};

export const reviews: ReviewEntry[] = [
  {
    name: "Daniel R.",
    location: "Austin, TX",
    rating: 5,
    title: "Seal was perfect",
    body: "Box arrived double-boxed with the factory seal completely untouched. This is the first time I have bought sealed product online and not had to second-guess it. Will order again.",
    product: "Crown Zenith Elite Trainer Box",
    date: "2026-08-21",
  },
  {
    name: "Priya S.",
    location: "Toronto, Canada",
    rating: 5,
    title: "Answered every question before I bought",
    body: "I was choosing between a Japanese and English box and they walked me through the differences on the phone. No pressure, no upselling. The order shipped the next day.",
    product: "Japanese booster box",
    date: "2026-08-09",
  },
  {
    name: "Marcus T.",
    location: "London, UK",
    rating: 5,
    title: "Case arrived immaculate",
    body: "Ordered a full case for a long-term hold. Packaging was rigid and there was no movement at all inside the carton. Exactly what I wanted from a seller handling this kind of value.",
    product: "One Piece sealed case",
    date: "2026-07-28",
  },
  {
    name: "Elena K.",
    location: "Seattle, WA",
    rating: 4,
    title: "Great product, shipping took a moment",
    body: "Product was flawless and the price was fair. Shipping took a couple of days longer than I expected but they kept me updated the whole way, which I appreciated.",
    product: "Shining Fates Elite Trainer Box",
    date: "2026-07-19",
  },
  {
    name: "Jordan A.",
    location: "Sydney, Australia",
    rating: 5,
    title: "Pre-order handled properly",
    body: "Reserved a pre-order and they emailed me when the release date shifted instead of leaving me guessing. That kind of communication is rare. Card quality was as described.",
    product: "Pre-order booster box",
    date: "2026-07-02",
  },
  {
    name: "Sam W.",
    location: "Chicago, IL",
    rating: 5,
    title: "Replacement sorted immediately",
    body: "One corner of my box was dinged in transit. I sent photos and had a replacement on the way the same day, no argument. That is how you keep a customer.",
    product: "Ascended Heroes ETB",
    date: "2026-06-15",
  },
  {
    name: "Aisha M.",
    location: "Dubai, UAE",
    rating: 5,
    title: "Everything as described",
    body: "Ordered three boxes, all factory sealed, all packed properly. Payment instructions came through by email straight away and the whole process was clear.",
    date: "2026-06-04",
  },
  {
    name: "Tom H.",
    location: "Manchester, UK",
    rating: 5,
    title: "My go-to for Japanese sets",
    body: "They consistently have Japanese sets in stock that are hard to find elsewhere, and the condition is always as advertised. I have ordered five times now.",
    product: "Japanese booster box",
    date: "2026-05-22",
  },
];

export const reviewSummary = {
  average: 4.9,
  count: 412,
  breakdown: [
    { stars: 5, percent: 92 },
    { stars: 4, percent: 6 },
    { stars: 3, percent: 1 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
};
