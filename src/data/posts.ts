export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingMinutes: number;
  cover?: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "how-to-spot-a-resealed-pokemon-booster-box",
    title: "How to spot a resealed Pokémon booster box",
    excerpt:
      "Resealed product is the most common problem in the sealed market. Here is what to look at before you open a parcel, and what to do if something looks wrong.",
    category: "Guides",
    author: "Pokemon Rush",
    date: "2026-08-14",
    readingMinutes: 7,
    body: `
Resealing is the practice of opening a sealed product, removing the valuable contents, and closing it again so it looks untouched. It affects every part of the market, from single booster packs to full cases. The good news is that resealed product almost always leaves a trace. You just need to know where to look.

**Start with the seal itself.**

A factory seal is applied by machine, so it is even, consistent, and tight to the box. Resealed boxes are usually wrapped by hand. Look for wrinkles, loose sections, or a heat seal that has obviously been melted with a hair dryer or heat gun. Run your thumb along the edges of the wrap. Factory wrap sits flush. Hand wrap tends to lift.

**Check the folds.**

On most booster boxes the factory wrap forms a neat, predictable pattern on the base and lid. Resealed boxes are often re-wrapped in a different pattern, or with the fold on the wrong face. If you have a second box of the same set, compare them side by side. Consistency is the tell.

**Look at the box, not just the wrap.**

Factory boxes are printed and folded in one pass, so the print is sharp and the cardboard is crisp. Resealed boxes are frequently opened along the top flap with a thin blade, which leaves a faint score line. Hold the box under a light at a shallow angle and look along the flap seams. You are looking for a line that should not be there.

**Weigh it if you can.**

A full booster box has a known approximate weight for each set. An empty or partially filled box is noticeably light. This is not conclusive on its own, because printing runs vary, but a box that is far below the expected weight is worth a second look.

**Check the packs inside.**

If you have already opened the box, the packs themselves tell the story. Factory packs are sealed evenly, with a clean crimp across the top and bottom. Resealed packs often have a double crimp, a loose crimp, or glue residue. Cards that feel stiff or have a slight bend can be a sign that packs were opened, searched, and refilled.

**Buy from sellers who understand this.**

The single best protection is the seller. A specialist reseller checks seals before dispatch, packs product so the seal cannot be damaged in transit, and stands behind what they send. If a seller cannot describe how they verify seals, that is information too.

**If something is wrong.**

Photograph the packaging and the product before you open anything else, then contact the seller immediately. Legitimate sellers want to know about resealed product in their supply chain, because it is a problem for them as well.

Sealed collecting rewards patience and attention. The few minutes you spend checking a box is the difference between a long-term hold and an expensive lesson.
`.trim(),
  },
  {
    slug: "japanese-vs-english-pokemon-cards",
    title: "Japanese vs English Pokémon cards: what actually differs",
    excerpt:
      "Print quality, release timing, pull rates, and exclusive artwork. A practical breakdown of the two print runs and who each one suits.",
    category: "Guides",
    author: "Pokemon Rush",
    date: "2026-07-30",
    readingMinutes: 6,
    body: `
Collectors ask this constantly, and the honest answer is that the two print runs serve different goals. Neither is simply better. They are different products.

**Release timing.**

Japanese sets typically release in Japan first. English sets follow months later, and the English release often combines cards from more than one Japanese set. That means a Japanese collector can open a card long before it appears internationally, and an English collector often gets a broader single set.

**Print quality.**

Japanese cards are printed in Japan, and the general consensus among collectors is that the stock, centering, and surface finish are more consistent. If you are chasing a card for grading, Japanese print runs are often the safer starting point. English print runs have improved over the years, but variance is still part of the game.

**Pull rates and set composition.**

Japanese booster boxes have a defined number of packs and a fairly consistent distribution of the highest rarity cards. English boxes have their own distribution rules. Neither is objectively more generous, but they are different, and experienced collectors track them set by set.

**Exclusive artwork.**

Some of the most sought-after artwork appears only in the Japanese print run, or appears there first. If a particular illustration is the reason you collect, check which print run includes it before you buy.

**Language and play.**

If you intend to play competitively in a specific region, use the language that is legal there. Japanese cards are not legal in most English-language organised play, and the reverse is also true. For pure collecting this does not matter.

**Which should you buy?**

If you want to open product early and value consistency, Japanese is a strong default. If you want the widest single set and the version most people recognise, English is the natural choice. Many collectors hold both, and there is no rule that says you have to pick one.
`.trim(),
  },
  {
    slug: "elite-trainer-box-vs-booster-box",
    title: "Elite Trainer Box vs Booster Box: which should you buy?",
    excerpt:
      "One is built for opening, the other for volume. Here is how to decide based on what you actually want out of a set.",
    category: "Guides",
    author: "Pokemon Rush",
    date: "2026-07-12",
    readingMinutes: 5,
    body: `
The two products look similar on a shelf and behave very differently when you get them home.

**What an Elite Trainer Box is for.**

An Elite Trainer Box, or ETB, is a self-contained starter kit. It includes a small number of booster packs plus the accessories you need to actually use them: sleeves, dice, a marker, and a storage box. It is the sensible first purchase if you are new to a set, or if you want a tidy way to keep a small collection organised.

**What a booster box is for.**

A booster box is volume. It contains many more packs and exists for people who want to open a meaningful amount of a set, whether to build a deck, chase a specific card, or hold sealed product for the long term. The per-pack cost is lower, which is the whole point.

**Which is better for sealed collecting?**

Both can be held sealed. Booster boxes are the more established long-term hold because they are the standard unit of a set and their value tracks the set's popularity. ETBs are also collected, and in some sets they appreciate well, but they are a smaller, more specialised market.

**Which is better for opening?**

If your goal is to open packs and enjoy it, a booster box gives you far more of that for the money. An ETB is better if you want the accessories and a smaller, controlled opening.

**A simple rule.**

If you are new to a set, start with one ETB so you have the accessories and a taste of the set. If you already know you want the set, buy a booster box. If you are buying to hold, buy sealed booster boxes from sets with strong demand, and store them properly.

There is no wrong answer, only the one that matches what you actually want to do with the cards.
`.trim(),
  },
  {
    slug: "how-we-pack-and-ship-sealed-cards",
    title: "How we pack and ship sealed card products",
    excerpt:
      "Seals and corners are the two things that decide the value of a sealed product. Here is exactly how we protect both in transit.",
    category: "Behind the scenes",
    author: "Pokemon Rush",
    date: "2026-06-28",
    readingMinutes: 4,
    body: `
A sealed product is only worth what its condition says it is worth. That is why packing is not an afterthought for us. It is the part of the job that decides whether the product arrives with the same value it left with.

**Inspection before packing.**

Every box is inspected before it is packed. We check the factory seal for consistency, look at the corners and edges for crushing, and confirm the product matches the order. Anything that does not pass is set aside rather than shipped and explained later.

**Corner protection.**

Corners take the first hit in transit, so they get the most attention. Product is wrapped so the corners cannot make contact with the outer box, and empty space is filled so nothing can slide.

**Seal protection.**

The factory wrap is thin and can be scuffed or lifted by friction. We keep the wrap away from tape and other adhesive, and we avoid packing materials that could rub against it.

**Rigid outer packaging.**

Boxes are shipped in rigid outer cartons sized to the product rather than oversized cartons that let contents move. For higher-value orders we add additional rigidity so the parcel cannot be compressed.

**Tracking, every time.**

Every order ships with tracking, and the tracking details are sent to you as soon as the parcel is dispatched. If a parcel is delayed, we would rather you hear it from us early.

**If something arrives damaged.**

It should not, but if it does, photograph the outer packaging and the product before opening anything further and email us. We resolve damaged deliveries quickly and without argument.
`.trim(),
  },
  {
    slug: "one-piece-card-game-buying-a-case",
    title: "One Piece Card Game: what to know before you buy a case",
    excerpt:
      "Cases are the biggest commitment in the hobby. Before you buy one, understand what a case is, how sets are structured, and what to expect.",
    category: "Guides",
    author: "Pokemon Rush",
    date: "2026-06-10",
    readingMinutes: 6,
    body: `
The One Piece Card Game has grown into one of the most active trading card games in the world, and sealed cases have become a serious part of how people collect it. Before you commit to a case, it helps to understand what you are actually buying.

**What a case is.**

A case is a factory-sealed carton containing a fixed number of booster boxes. It is the largest standard unit a distributor sells. Buying a case means you are buying the set at wholesale volume, usually at a lower cost per pack than buying boxes individually.

**Why cases are held sealed.**

A sealed case is the deepest expression of confidence in a set. Because it is sealed, its contents are unsearched and its condition is preserved. For collectors holding long term, a sealed case is the cleanest possible asset.

**What to check before buying.**

Confirm the case is factory sealed and has not been opened and re-taped. Check the case label and the printing against the set's official details. Ask whether the case has been stored flat, away from heat and moisture. Storage matters as much as the seal.

**Case vs box.**

A case is a commitment. Only buy a case if you genuinely want that volume, whether to open it or to hold it. If you want to open a moderate amount and keep the rest sealed, a smaller number of boxes gives you more flexibility.

**Storage matters.**

Store sealed product upright, in a dry, temperature-stable space, away from direct sunlight. Heat and humidity will damage cardboard and can affect the wrap. A closet is usually better than a garage.

**Our approach.**

When we list a case, we describe the format, confirm it is factory sealed, and pack it so the outer carton and the product inside both arrive intact. If you want advice on a specific set before committing, contact us and we will tell you what we know.
`.trim(),
  },
  {
    slug: "weiss-schwarz-explained",
    title: "Weiss Schwarz explained for new collectors",
    excerpt:
      "A crossover card game with deep anime licences and a loyal collector base. What Weiss Schwarz is, and why it is worth a look.",
    category: "Guides",
    author: "Pokemon Rush",
    date: "2026-06-05",
    readingMinutes: 5,
    body: `
Weiss Schwarz is a Japanese trading card game built almost entirely around licensed properties. If you follow anime or specific game franchises, there is a good chance a Weiss Schwarz set exists for something you already care about.

**What makes it different.**

Most trading card games build their own world. Weiss Schwarz borrows worlds. A single set might be dedicated to one series, and the game has covered an enormous range of them over the years. That makes it a genuinely different collecting experience: you are often collecting a series first and a game second.

**Trial decks and booster packs.**

The entry point is usually a trial deck, which is a ready-to-play starter product for a specific series. From there, booster packs and boxes let you build out a collection and improve a deck. If you are new, a trial deck for a series you like is the simplest way in.

**Japanese and English product.**

Weiss Schwarz has both Japanese and English print runs, and they do not always cover the same series. If a specific series matters to you, check which language has it before you buy.

**Why collectors stay.**

The artwork is consistently strong, the licensing is deep, and the collector base is dedicated. Cards from popular series hold interest for a long time, which makes sealed product a reasonable hold for the right sets.

**Getting started.**

Pick a series you actually like, start with a trial deck or a small number of packs, and see whether the game suits you. If it does, the set list is large enough to keep you busy for years.
`.trim(),
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
