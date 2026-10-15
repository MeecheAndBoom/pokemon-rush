export type Faq = { q: string; a: string };

export const policyFaqs: Faq[] = [
  {
    q: "How do I pay for my order?",
    a: "This site does not process card payments directly. After you place an order we email you an order reference and payment instructions for the method you selected. Your order is reserved while payment is arranged, and confirmed once payment is received.",
  },
  {
    q: "How long until my order ships?",
    a: "Orders are usually packed and dispatched within one business day of payment confirmation. Tracking details are emailed to you as soon as your parcel is on its way.",
  },
  {
    q: "Which countries do you ship to?",
    a: "We ship internationally. The exact options and estimated delivery windows for your address are included with your payment instructions after you place an order.",
  },
  {
    q: "My tracking has not updated. What should I do?",
    a: "Carrier scans can lag by a day or two, especially at handover points. If there has been no movement for several business days, contact us with your order reference and we will chase it with the carrier.",
  },
  {
    q: "My parcel arrived damaged. What now?",
    a: "Photograph the outer packaging and the product before opening anything else, then email us within 48 hours of delivery. We will arrange a replacement or refund once we have reviewed the photos.",
  },
  {
    q: "Can I cancel a pre-order?",
    a: "Pre-orders can be cancelled before they are dispatched. Once a pre-order item has shipped it follows our standard returns policy and cannot be cancelled.",
  },
  {
    q: "Can I return an opened product?",
    a: "No. Due to the collectible nature of trading cards, opened products and cards removed from sealed products cannot be returned. This is set out in full in our Returns & refunds policy.",
  },
  {
    q: "Are your products authentic?",
    a: "Yes. We source through official distribution channels, inspect every item before dispatch, and stand behind what we send. If something is not as described, we resolve it.",
  },
  {
    q: "Can I order a product you do not stock?",
    a: "Often, yes. Send us the details through our Talk to a specialist form and we will tell you what we can source and what it would cost.",
  },
];

// Product and collecting knowledge. These answers match the detailed guides in
// the blog, so the FAQ content and the articles reinforce each other.
export const productFaqs: Faq[] = [
  {
    q: "How many packs are in a Pokémon booster box?",
    a: "English main-line Pokémon booster boxes hold 36 packs of 10 cards. Japanese main-line booster boxes hold 30 packs of 5 cards. Special sets and older products can differ.",
  },
  {
    q: "How many cards are in a Pokémon booster pack?",
    a: "English main-line Pokémon booster packs contain 10 cards. Japanese main-line packs contain 5 cards. Special sets can use different counts.",
  },
  {
    q: "What is an Elite Trainer Box?",
    a: "An Elite Trainer Box is a sealed Pokémon TCG product that includes booster packs plus card sleeves, dice, condition markers, a player's guide and a storage box.",
  },
  {
    q: "What is a booster bundle?",
    a: "A booster bundle is a sealed bundle of booster packs sold without the extras of an Elite Trainer Box. Recent Pokémon booster bundles commonly contain six packs.",
  },
  {
    q: "What is Weiss Schwarz?",
    a: "Weiss Schwarz is a Bushiroad trading card game built around licensed anime and video-game properties. A deck contains 50 cards, including exactly 8 climax cards.",
  },
  {
    q: "What is a Weiss Schwarz trial deck?",
    a: "A trial deck is a ready-to-play 50-card Weiss Schwarz deck. Two trial decks give you a legal game for two players, which makes them the cheapest way into the game.",
  },
  {
    q: "Is it better to buy Japanese or English Pokémon cards?",
    a: "Japanese product is often cheaper to open and is prized for print quality and exclusive artwork, while English product has the deeper international buyer pool and higher resale on the same artwork. Many collectors buy Japanese to open and English to hold.",
  },
  {
    q: "How should I store sealed Pokémon product?",
    a: "Aim for a stable 40 to 50 percent relative humidity at 18 to 24 degrees Celsius, keep product out of direct sunlight, store boxes no more than two high, and avoid attics, garages and basements.",
  },
  {
    q: "Does humidity damage Pokémon cards?",
    a: "Yes. Paper takes on and gives off moisture as conditions change. Below about 30 percent relative humidity cardstock becomes brittle, and above 60 percent it risks mould, warping and chemical breakdown.",
  },
  {
    q: "How should I check a sealed box for reseals?",
    a: "Check the factory seal, the pack count and weight, the print quality of the wrap and the box itself, and whether the outer film carries the official Pokémon logos. Any single mismatch is a reason to walk away. We run the same checks before anything reaches a shelf, and our reseal guide walks through each one.",
  },
  {
    q: "Can you weigh Pokémon packs to find hits?",
    a: "Weighing is unreliable on modern Pokémon product because most packs contain a reverse holo or better and pack weights overlap. Buying factory-sealed product avoids the risk of searched or weighed stock.",
  },
  {
    q: "Are Pokémon booster boxes a good investment?",
    a: "Out-of-print sealed product has historically appreciated, while sets still in distribution tend to trade near retail. Returns are not guaranteed and vary by set, so treat it as a collectible first.",
  },
  {
    q: "Does Pokémon reprint booster boxes?",
    a: "Yes. Pokémon reprints popular sets, so product still being printed tends to trade near retail while out-of-print product can appreciate.",
  },
];

// Store policy first (the home page shows the first six), then product knowledge.
export const supportFaqs: Faq[] = [...policyFaqs, ...productFaqs];
