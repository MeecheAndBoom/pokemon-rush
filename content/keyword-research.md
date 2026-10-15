# PokéStore Direct — SEO Keyword Research

Generated: 2026-10-15
Site audited: `https://pokemon-rush-sigma.vercel.app`
Scope: keyword research only. No application code was written.

---

## 1. Method and evidence

### 1.1 What was queried

All data below comes from live endpoints fetched during this session.

| Source | Endpoint | Status | What it gave |
|---|---|---|---|
| Google autocomplete | `https://suggestqueries.google.com/complete/search?client=firefox&q=<seed>` | Worked, no blocking | 10 suggestions per seed; used as the demand proxy across ~120 seeds |
| Bing autosuggest | `https://api.bing.com/osjson.aspx?query=<seed>` | Worked | Corroborated Google suggestions for head terms |
| DuckDuckGo HTML | `https://html.duckduckgo.com/html/?q=<query>` | Worked for the first 2 requests, then HTTP 202 (rate limit) | SERP titles/URLs for competitor analysis |
| DuckDuckGo Lite | `https://lite.duckduckgo.com/lite/?q=<query>` | Reliable via the fetch tool, full 10-result pages | Main SERP source for the competitor map |
| Google Chrome client | `https://www.google.com/complete/search?client=chrome&q=<seed>` | Not needed (Firefox client worked) | — |
| Mojeek | `https://www.mojeek.com/search` | Connection failed from this host | Fell back to DuckDuckGo |
| Ecosia | `https://www.ecosia.org/search` | HTTP 403 | Fell back |
| Microsoft Bing HTML | `https://www.bing.com/search` | HTTP 200 but bot-mitigated and returned wrong-locale results | Abandoned as unreliable for SERP |
| Brave Search HTML | `https://search.brave.com/search` | HTTP 200 but results are JS-rendered | Abandoned |
| Live site | `https://pokemon-rush-sigma.vercel.app/` | Worked | Confirmed brand name, section URLs, product slugs, shipping/returns copy |

### 1.2 Seeds used

Primary seeds: `sealed pokemon cards`, `pokemon booster box`, `japanese pokemon booster box`, `english pokemon booster box`, `elite trainer box`, `pokemon etb`, `pokemon booster bundle`, `pokemon 151 booster bundle`, `pokemon 30th anniversary`, `prismatic evolutions`, `surging sparks`, `pokemon booster box case`, `sealed pokemon case`, `pokemon special set`, `one piece card game booster box`, `one piece tcg`, `op-09`, `op-15`, `one piece card game english`, `one piece starter deck`, `weiss schwarz booster box`, `weiss schwarz english booster box`, `weiss schwarz japanese booster box`, `weiss schwarz case`, `weiss schwarz trial deck`, `where to buy sealed pokemon cards`, `buy pokemon cards online`, `pokemon cards for sale`, `cheap pokemon booster boxes`, `free shipping pokemon cards`, `japanese vs english pokemon cards`, `why are japanese pokemon cards cheaper`, `pokemon card investing`, `sealed pokemon investment`, `best sealed pokemon investments 2026`, `how to store pokemon booster boxes`, `how to tell if a pokemon box is resealed`, `psa grading cost`, `cgc pokemon grading`, `wholesale pokemon cards`, `pokemon card sleeves`, `toploaders`, `pokemon card storage`, `pokestore direct`, `pokestore`, `pokemon rush`, `pokemon direct`.

### 1.3 Example raw evidence (autocomplete output)

```
seed: "sealed pokemon cards"
-> sealed pokemon cards, ...near me, ...for sale, ...booster box, ...uk,
   ...value, ...canada, ...ebay, ...1st edition, ...price

seed: "japanese pokemon booster box"
-> japanese pokemon booster box, ...wholesale, ...msrp, ...151,
   ...guaranteed hits, ...pull rates, ...hit rate, ...guarantee, ...case, ...near me

seed: "elite trainer box"
-> elite trainer box, ...pokemon, ...30th anniversary, ...pitch black,
   ...151, ...chaos rising, ...perfect order

seed: "where to buy sealed pokemon cards"
-> ...online, ...near me, ...in tokyo, ...in japan, ...reddit, ...uk,
   where to buy unopened pokemon cards

seed: "weiss schwarz english booster box"
-> ...nikke, ...frieren, ...dandadan, ...eminence in shadow, ...umamusume,
   ...marvel, ...pixar, ...hololive

seed: "pokestore direct"   -> (empty)
seed: "does pokestore direct ship worldwide" -> (empty)
seed: "where does pokestore direct ship from" -> (empty)
seed: "pokemon rush" ->
   pokemon rush, nature rash pokemon, pokemon rush card,
   pokémon rumble rush, pokémon rumble rush apk, ... pokedex,
   pokemon go rush hour, bull rush pokemon radical red
```

### 1.4 Caveats — read this before using any number

- **This is a demand proxy, not volume.** Autocomplete ordering reflects query frequency and session context. It does not give monthly searches. No volume figures are invented anywhere in this report. Demand signals below are relative rankings derived from (a) whether a term appears as a top-level suggestion, (b) how many distinct modifiers it attracts, and (c) how often it surfaced across multiple seeds.
- **A term with no autocomplete is not zero-demand.** `is it worth buying sealed pokemon cards`, `how long do pokemon cards last sealed`, and `weiss schwarz english 2026 releases` returned empty suggestion arrays. That usually means the exact phrase is uncommon, not that the topic is dead. The underlying topic still appears through variants.
- **Suggestions are language/locale polluted.** French-language results appear for several seeds (`elite trainer box 30 ans`, `pokemon etb nuit noire`, `pokestore france`). Treat those as noise for a US/English store.
- **SERP snapshots are single-day and single-locale.** DuckDuckGo results are one point in time; rankings shift. Use the competitor map as "who is in the arena", not as a live rank tracker.
- **No third-party keyword tool was used** (no Ahrefs, Semrush, Keyword Planner). Where a competition level is stated it is a qualitative guess based on the observed result set plus domain authority, not a measurable difficulty score.
- **`pokemon-rush` is a brand liability.** The domain namespaced "pokemon rush" and that phrase is already owned by Pokémon Rumble Rush and unrelated terms. The brand is "PokéStore Direct" and the email is `support@pokestoredirect.com`; the domain does not match. That mismatch is the single biggest brand-search problem (see section 5).

---

## 2. Demand-signal legend

| Signal | Meaning |
|---|---|
| High | Appears as a top-level autocomplete suggestion; attracts many distinct modifiers; recurs across multiple seeds. Head demand. |
| Medium | Appears as a modifier or minor suggestion; real but narrower. |
| Low | Does not autocomplete, or only surfaces as a rare variant. Long-tail / emerging. |
| Very High / High / Med / Low (competition) | Qualitative guess at ranking difficulty from the observed SERP: big-box and marketplace dominance = Very High; mix of authorities and small shops = High/Med; mostly small shops and forums = Low-Med. |

---

## 3. Keyword tables by intent

### 3(a) Transactional / high commercial intent

| Keyword | Intent | Demand | Competition | Target URL |
|---|---|---|---|---|
| buy pokemon cards online | Buy | High | Very High | `/shop` |
| pokemon cards for sale | Buy | High | Very High | `/shop` |
| sealed pokemon cards for sale | Buy | High | High | `/shop` |
| pokemon booster box for sale | Buy | High | Very High | `/shop/pokemon` |
| where to buy sealed pokemon cards | Buy / research | Med-High | Med | `/shop/pokemon` |
| buy japanese pokemon cards usa | Buy | Med | Med | `/shop/pokemon?language=japanese` |
| cheap pokemon booster boxes | Buy | Med | High | `/shop/pokemon` |
| elite trainer box for sale | Buy | Med | High | `/shop/pokemon?type=elite-trainer-box` |
| pokemon booster box case | Buy | Med | High | `/shop/pokemon?type=sealed-case` |
| sealed pokemon case / sealed case pokemon | Buy | Med | Med | `/shop/pokemon?type=sealed-case` |
| free shipping pokemon cards | Buy | Low-Med | Med | `/shipping-delivery` |
| wholesale pokemon cards | B2B buy | Med | Med | `/wholesale` |
| wholesale pokemon booster boxes | B2B buy | Med | Med | `/wholesale` |
| one piece card game booster box | Buy | High | High | `/shop/one-piece` |
| one piece tcg english booster box | Buy | Med | Med | `/shop/one-piece` |
| buy one piece sealed case | Buy | Low | Low-Med | `/shop/one-piece` |
| one piece card game where to buy | Buy | Med | Med | `/shop/one-piece` |
| weiss schwarz english booster box | Buy | Med | Low-Med | `/shop/weiss-schwarz` |
| weiss schwarz booster box (english) | Buy | Med | Low-Med | `/shop/weiss-schwarz` |
| buy weiss schwarz trial deck | Buy | Low-Med | Low | `/shop/weiss-schwarz` |
| pokemon card sleeves | Buy | High | High | `/shop/accessories` |
| toploaders / toploaders for cards | Buy | High | High | `/shop/accessories` |
| pokemon card storage box | Buy | Med | High | `/shop/accessories` |
| pokemon booster box (msrp / retail price) query | Buy / research | High | Very High | `/shop/pokemon` |

### 3(b) Category & product-type

| Keyword | Intent | Demand | Competition | Target URL |
|---|---|---|---|---|
| pokemon booster box | Category | High | Very High | `/shop/pokemon` |
| elite trainer box | Category | High | Very High | `/shop/pokemon` |
| pokemon etb | Category | High | Very High | `/shop/pokemon` |
| pokemon booster bundle | Category | Med-High | High | `/shop/pokemon` |
| pokemon booster box case | Category | Med | High | `/shop/pokemon?type=sealed-case` |
| pokemon special set | Category / info | Med | Med | `/shop/pokemon` |
| pokemon super premium collection | Category | Med | High | `/shop/pokemon` |
| pokemon premium collection box | Category | Med | High | `/shop/pokemon` |
| one piece tcg | Category | High | High | `/shop/one-piece` |
| one piece starter deck | Category | Med | Med | `/shop/one-piece` |
| one piece card game english | Category / language | Med | Med | `/shop/one-piece` |
| weiss schwarz booster box | Category | Med | Low-Med | `/shop/weiss-schwarz` |
| weiss schwarz trial deck | Category | Med | Low | `/shop/weiss-schwarz` |
| weiss schwarz case | Category | Low-Med | Low | `/shop/weiss-schwarz` |
| tcg booster box / trading card game store online | Category | Med | High | `/shop` |
| card sleeves and toploaders | Category | Med | Med | `/shop/accessories` |

### 3(c) Set-specific & language-specific

| Keyword | Intent | Demand | Competition | Target URL |
|---|---|---|---|---|
| japanese pokemon booster box | Set / language buy | High | Med | `/shop/pokemon?language=japanese` |
| english pokemon booster box | Set / language buy | Med | High | `/shop/pokemon?language=english` |
| japanese pokemon booster box case | Set buy | Med | Med | `/shop/pokemon?language=japanese` |
| japanese booster box guaranteed hits | Info / buy | Med | Med | `/shop/pokemon?language=japanese` |
| pokemon 151 booster bundle | Set buy | High | High | `/shop/pokemon` |
| pokemon 151 booster box / etb | Set buy | High | High | `/shop/pokemon` |
| pokemon 30th anniversary | Set | High | High | `/shop/pokemon` |
| pokemon 30th anniversary etb | Set buy | Med | Med | `/shop/pokemon?type=elite-trainer-box` |
| prismatic evolutions etb / booster bundle | Set buy | High | High | `/shop/pokemon` |
| surging sparks booster box / etb | Set buy | Med-High | High | `/shop/pokemon` |
| ascended heroes pokemon center etb | Set buy | Med | Med | `/shop/pokemon?type=elite-trainer-box` |
| one piece op-15 (adventure on kami's island) | Set buy | Med | Med | `/shop/one-piece` |
| one piece op-09 / op-14 / op-16 | Set buy | Med | Med | `/shop/one-piece` |
| one piece heroines edition eb-03 | Set buy | Low-Med | Low | `/shop/one-piece` |
| weiss schwarz japanese booster box | Set / language buy | Med | Low-Med | `/shop/weiss-schwarz` |
| weiss schwarz english release schedule 2026 | Set / info | Low-Med | Low | `/blog/weiss-schwarz-english-2026-releases` |
| japanese vs english pokemon cards | Comparison | Med | Med | `/blog/japanese-vs-english-print-runs-box-maths` |
| japanese booster box vs english | Comparison | Med | Med | `/blog/japanese-vs-english-print-runs-box-maths` |
| pokemon terastal festival ex / mega dream ex box | Set buy | Low-Med | Low-Med | `/shop/pokemon?language=japanese` |

### 3(d) Informational / long-tail

| Keyword | Intent | Demand | Competition | Target URL |
|---|---|---|---|---|
| pokemon card investing | Info / commercial | High | Med | `/blog` |
| sealed pokemon investment | Info | Med | Med | `/blog` |
| best sealed pokemon investments 2026 | Info / commercial | Med | Med | `/blog` |
| are pokemon booster boxes a good investment | Info | Med | Med | `/blog` |
| how to store pokemon booster boxes | Info | Med | Low-Med | `/blog/storing-sealed-product-humidity-light-long-hold` |
| does humidity damage pokemon cards | Info | Low-Med | Low | `/blog/storing-sealed-product-humidity-light-long-hold` |
| best way to store pokemon booster boxes | Info | Low-Med | Low | `/blog/storing-sealed-product-humidity-light-long-hold` |
| how to tell if a pokemon box is resealed | Info | Med | Med | `/blog/checking-sealed-boxes-for-reseals` |
| how to tell if a pokemon booster box is resealed | Info | Med | Med | `/blog/checking-sealed-boxes-for-reseals` |
| psa grading cost | Info / commercial | High | Med | `/blog/psa-cgc-bgs-grading-value-2026` |
| cgc pokemon grading | Info | Med | Med | `/blog/psa-cgc-bgs-grading-value-2026` |
| grading pokemon cards worth it | Info | Low-Med | Low-Med | `/blog/psa-cgc-bgs-grading-value-2026` |
| how many packs in a pokemon booster box | Info | Med | Low | `/blog/japanese-vs-english-print-runs-box-maths` |
| how many packs in a japanese booster box | Info | Med | Low | `/blog/japanese-vs-english-print-runs-box-maths` |
| why are japanese pokemon cards cheaper | Info | Med | Low | `/blog/japanese-vs-english-print-runs-box-maths` |
| are japanese pokemon cards worth more | Info | Med | Low | `/blog/japanese-vs-english-print-runs-box-maths` |
| is it better to buy japanese or english pokemon cards | Info | Low-Med | Low | `/blog/japanese-vs-english-print-runs-box-maths` |
| what is a booster bundle | Info | Med | Low | `/shop/pokemon` |
| what is a case of pokemon cards | Info | Low-Med | Low | `/shop/pokemon` |
| when do pokemon cards restock | Info | Med | Med | `/support` |
| does pokemon reprint booster boxes | Info | Low-Med | Low | `/blog` |
| is one piece tcg worth collecting | Info | Low-Med | Low | `/blog` |
| what is weiss schwarz | Info | Med | Low | `/blog/weiss-schwarz-english-2026-releases` |
| one piece op-15 release date | Info | Low-Med | Low | `/blog/one-piece-op15-worldwide-launch-april-restricted-list` |
| can you weigh pokemon packs | Info | Low-Med | Low | `/blog/checking-sealed-boxes-for-reseals` |
| how to ship pokemon cards safely | Info | Low-Med | Low | `/shipping-delivery` |

---

## 4. Brand terms

**"PokéStore Direct" is brand new and has no search demand yet.** Confirmed: `pokestore direct`, `does pokestore direct ship worldwide`, and `where does pokestore direct ship from` all returned empty Google suggestion arrays.

Risks found in the live data:

- `pokestore` autocompletes almost entirely to **French retailers** — `pokestore france`, `pokestore metz`, `pokestore paris`, `pokestore 57`, `pokestore 88`. The generic brand word is already occupied.
- `pokemon rush` (the domain) is dominated by **Pokémon Rumble Rush** and unrelated results (`nature rash pokemon`, `pokemon go rush hour`). The domain adds no brand equity and actively competes for meaning.
- The visible brand (`PokéStore Direct`) and the domain (`pokemon-rush-sigma.vercel.app`) do not match, and the `.vercel.app` subdomain is not ownable long term.

Recommendation to start owning the brand:

1. **Pick one canonical name and repeat it verbatim** in the logo, footer, email, socials, and every title tag: `PokéStore Direct` (with the "Direct"). Always use the full two-word form, never bare "PokéStore".
2. **Get a matching domain** such as `pokestoredirect.com` (the site already uses `support@pokestoredirect.com`, so this is consistent) and 301 the Vercel URL to it. Brand queries convert to a domain; an unrelated domain cannot.
3. **Create a branded entity footprint**: Google Business Profile (Los Angeles), Instagram/X/TikTok with the exact name, a consistent NAP block on `/about` and `/contact`, and `Organization` + `WebSite` structured data with the same brand.
4. **Seed the two-word phrase in content** so it earns a suggestion: use "PokéStore Direct" in blog bylines, FAQ answers, press mentions, and review requests. Branded autocomplete normally appears once enough people search it.
5. **Own the disambiguated phrase**: target "PokéStore Direct" with the store qualifier in the homepage and about titles (for example, "PokéStore Direct — Factory-Sealed Trading Cards"), so a user search for the brand resolves to the store rather than to French `pokestore` retailers.
6. **Do not invest in ranking for "pokemon rush".** Let the domain retire; it is not a keyword the store wants.

---

## 5. Competitor landscape

Based on the DuckDuckGo result sets fetched for `buy sealed pokemon cards`, `pokemon booster box`, `japanese pokemon booster box`, `elite trainer box`, `where to buy sealed pokemon cards`, `one piece card game booster box`, `one piece card game english booster box`, `weiss schwarz english booster box`, `pokemon card investing`, `sealed pokemon investment`, `how to tell if a pokemon booster box is resealed`, and `pokemon booster box wholesale`.

**Head commercial terms — big-box and marketplaces own the top.** Domains observed ranking: `amazon.com`, `walmart.com`, `target.com`, `ebay.com`, `pokemoncenter.com`, `dacardworld.com`, `tcgplayer.com` / `shop.tcgplayer.com`. A 132-product independent store will not out-rank these for bare "pokemon booster box" or "pokemon cards for sale". Do not spend effort there.

**US independent sealed shops that do rank.** `poke-collect.com`, `cardsupplyco.com`, `cavegamers.com`, `cashcardsunlimited.com`, `pokecardvault.com`, `pokecardsdepot.com`, `pokevaultusa.com`. These are direct peers and prove the space is winnable below the head terms.

**Japanese import shops — where the store's strongest angle lives.** `pokeninjapan.store`, `plazajapan.com`, `itsukijapan.com`, `fujicardshop.com`, `pokeunlimited.com`, `pokevault.com`, `skylinetcg.com`, `tcghobby.com`, plus Amazon/eBay. Note the recurring copy angle: "authentic, factory sealed, shipped worldwide", "shipped directly from Japan", "fast shipping across the U.S." PokéStore Direct's "checked for reseals before dispatch" is a genuine differentiator these shops rarely state.

**One Piece TCG.** Official `en.onepiece-cardgame.com` plus Amazon, eBay, Target, TCGplayer. Smaller shops ranking: `universetcg.com`, `pokeboxusa.com`, `hobbiesville.com`, `n4ytcg.com`. Competition here is thinner than Pokémon head terms.

**Weiss Schwarz English.** Official `en.ws-tcg.com`, Amazon, eBay, `japan2uk.com`, `n4ytcg.com` (specialises in sealed Weiss Schwarz cases), `cardmarket.com` (EU marketplace). This is the softest of the three games and the best near-term commercial opportunity.

**Investing / informational cluster.** `tcgindex.io`, `pokemonpricetracker.com`, `tcginvest.io`, `thecardshopfinder.com`, `moneymade.io`, `pokeinvest.io`, `pokeinvesting.com`, `mintvandal.com`, `sealedalpha.com`, `ravaver.com`, `cardlines.com`, `mastergrade.ai`, `evolvault.com`, and `reddit.com/r/PokemonInvesting`. Mostly blogs and trackers — contestable with genuinely useful, well-linked content.

**Reseal / authentication cluster.** `delightfultcg.com`, `cardtracker.au`, `sleevenocardbehind.com`, `pokemasterstcg.com`, `pokefolio.eu`, `pokesnap.app`, `rorzcards.com`, `tcgbox.co.uk`, plus Reddit r/PokeInvesting. This is the store's existing blog's strongest topical fit and the competition is small sites, not majors.

**Wholesale.** `faire.com`, `vendingwholesale.com`, `blackeaglewholesale.com`, `supplyleader.com`, `buymorecards.com`, `tcgwholesalehq.com`, `americangeneraldistributors.com`, `kitakamicards.com`. Minimums observed: $500+ free shipping, $5,000 minimum (AGD). Note `tcgwholesalehq.com` already sells "authentic Japanese Pokémon, One Piece, Weiss Schwarz … to stores worldwide", i.e. a direct competitor on exactly the store's three-game mix.

### Where a small independent store can realistically win

1. **Japanese Pokémon by product + set + "guaranteed hits" / "case" modifiers.** High-intent, medium difficulty, and the store already specialises here.
2. **Weiss Schwarz English** — trial decks, specific licences (NIKKE, Blue Archive, Umamusume, Frieren, Dandadan), and English-exclusive sets. Low competition, licensing long-tail.
3. **One Piece specific sets and product types** (OP-XX booster boxes, starter decks, EB cases) — thinner SERPs than Pokémon.
4. **Reseal / authenticity / storage** informational content, converting to the shop. The competition is small blogs.
5. **"Where to buy + country"** transactional long-tails (`buy japanese pokemon cards usa`, `pokemon cards online uk`, `...canada`), where worldwide shipping is the pitch.
6. **Bundles and cases** ("buy sealed case", "booster box case") — high ticket, low volume, low competition.
7. **Wholesale for shops/breakers** — commercial intent with a real budget behind it.

---

## 6. FAQ / People-Also-Ask questions worth targeting

Phrased as real user questions. The first 30 double as the FAQPage structured-data set in `content/keywords.json`.

1. How many packs are in a Pokémon booster box?
2. How many packs are in a Japanese Pokémon booster box?
3. How many cards are in a Pokémon booster pack?
4. What is an Elite Trainer Box?
5. What is a booster bundle?
6. What is a booster box case?
7. Do you sell single cards or only sealed product?
8. Are PokéStore Direct products factory sealed?
9. How do you check a sealed box for reseals?
10. How can I tell if a Pokémon booster box is resealed?
11. Can you weigh Pokémon packs to find hits?
12. Is it better to buy Japanese or English Pokémon cards?
13. Why are Japanese Pokémon cards cheaper than English?
14. Are Japanese Pokémon cards worth more than English?
15. Are Pokémon booster boxes a good investment?
16. Does Pokémon reprint booster boxes?
17. How should I store sealed Pokémon product?
18. Does humidity damage Pokémon cards?
19. When did One Piece OP-15 release?
20. What changed on the One Piece restricted list in April 2026?
21. What is Weiss Schwarz?
22. How many packs are in a Weiss Schwarz display?
23. What is a Weiss Schwarz trial deck?
24. Is One Piece TCG worth collecting?
25. Is PSA, CGC or BGS better for grading Pokémon cards?
26. How much does PSA grading cost?
27. How much does CGC grading cost?
28. Which countries do you ship to?
29. Where do you ship from?
30. How long until my order ships?
31. How is my order packed?
32. Can I cancel a pre-order?
33. Do you offer wholesale or bulk pricing?
34. What is inside the 30th Celebration set?

---

## 7. Recommended title tags and meta descriptions

Rules applied: title <= 60 characters, description <= 155 characters, unique primary keyword per page, brand appended only where it fits.

### Pages

| Path | Title tag | Meta description |
|---|---|---|
| `/` | Sealed Pokémon, One Piece & Weiss Schwarz Cards | Factory-sealed Pokémon, One Piece and Weiss Schwarz cards. Booster boxes, ETBs, bundles and cases, checked before dispatch and shipped worldwide. |
| `/shop` | Buy Sealed Trading Cards Online | Pokémon, One Piece | Shop factory-sealed booster boxes, ETBs, bundles and cases for Pokémon, One Piece and Weiss Schwarz. Authentic product, packed to arrive sealed. |
| `/shop/pokemon` | Sealed Pokémon Booster Boxes & ETBs | Buy factory-sealed Pokémon booster boxes, Elite Trainer Boxes and bundles, English and Japanese. Inspected for reseals before dispatch. Ships worldwide. |
| `/shop/one-piece` | Sealed One Piece Card Game Booster Boxes & Cases | Buy sealed One Piece Card Game booster boxes, cases and starter decks, English and Japanese. Factory-sealed, checked and shipped worldwide. |
| `/shop/weiss-schwarz` | Sealed Weiss Schwarz Booster Boxes | English & JP | Shop sealed Weiss Schwarz booster boxes and trial decks, English and Japanese, including English-exclusive sets. Authentic product, shipped worldwide. |
| `/shop/accessories` | Card Sleeves, Toploaders & Storage Accessories | Protect your cards with sleeves, toploaders, storage boxes and booster box protectors. Accessories chosen for sealed and graded collections. |
| `/services` | TCG Sourcing, Pre-Orders & Collector Advice | Need a set, language or case we do not list? We source sealed Pokémon, One Piece and Weiss Schwarz, take pre-orders and give collector advice. |
| `/about` | About PokéStore Direct | Sealed TCG Specialists | We are collectors selling factory-sealed Pokémon, One Piece and Weiss Schwarz only. Sourced through official distribution and checked before every order ships. |
| `/support` | Support & FAQs | PokéStore Direct | Answers on ordering, payment, shipping, tracking and pre-orders for sealed Pokémon, One Piece and Weiss Schwarz product. Contact a real person any time. |
| `/shipping-delivery` | Shipping & Delivery | Worldwide Sealed Card Orders | How we pack and ship factory-sealed trading cards worldwide, dispatch times, tracking, and what to do if a parcel is delayed or arrives damaged. |
| `/returns-refunds` | Returns & Refunds | Sealed Trading Cards | Our returns and refund policy for sealed trading cards, including damaged parcels, pre-order cancellations and what cannot be returned once opened. |
| `/wholesale` | Wholesale Sealed TCG | Pokémon, One Piece & Weiss | Wholesale and bulk pricing on sealed Pokémon, One Piece and Weiss Schwarz cases for shops, breakers and resellers. Tell us what you need. |

### Blog posts

| Path | Title tag | Meta description |
|---|---|---|
| `/blog/storing-sealed-product-humidity-light-long-hold` | How to Store Sealed Pokémon Product: Humidity & Light | A storage routine for sealed Pokémon product: 40 to 50 percent humidity, stable temperature, no direct sun, and why the garage and attic ruin boxes. |
| `/blog/japanese-vs-english-print-runs-box-maths` | Japanese vs English Pokémon Boxes: Print Run Maths | An English box is 36 packs of 10; a Japanese box is 30 packs of 5. What that difference means for pull density, print quality, price and resale. |
| `/blog/one-piece-op15-worldwide-launch-april-restricted-list` | One Piece OP-15 Launch & the April 2026 Restricted List | OP-15 Adventure on Kami's Island launched worldwide on 3 April 2026. What the April restricted list changed, and what a sealed display actually contains. |
| `/blog/psa-cgc-bgs-grading-value-2026` | PSA vs CGC vs BGS: Pokémon Grading Value 2026 | PSA 10s outsell CGC 10s and BGS 9.5s on identical cards, but 2026 fees changed again. How to run the break-even sum before you submit a card. |
| `/blog/30th-celebration-set-pull-rates-sealed-prices` | 30th Celebration Pull Rates & Sealed Prices | Inside the 30th Celebration set: five foils per pack, a Classic Collection card in about 1 in 10 packs, and what the anniversary did to sealed prices. |
| `/blog/checking-sealed-boxes-for-reseals` | How to Check a Sealed Pokémon Box for Reseals | Seams, factory vent holes, printed Pokéball logos, weight and glue. The checks we run on every sealed box before it reaches a shelf. |
| `/blog/weiss-schwarz-english-2026-releases` | Weiss Schwarz English 2026 Release Schedule & Sets | Weiss Schwarz English added Umamusume, Blue Archive, NIKKE and more in 2026. A tour of the year, and why English-exclusive cards hold value. |

---

## 8. Quick wins checklist for a store this size

1. **Fix the brand/domain mismatch first.** Choose `PokéStore Direct`, get a matching domain, 301 the Vercel URL. Brand search is the cheapest traffic a new store can own.
2. **Write unique title tags and meta descriptions for all 20 pages above** (currently most sections share generic templates). This is the highest-leverage, lowest-effort change.
3. **Ship `FAQPage` structured data** from the 30 questions in `keywords.json` on `/support` (and relevant FAQs on category pages). Target the People-Also-Ask questions directly.
4. **Build one collection page per high-value set+language combination** you actually stock, e.g. Japanese booster boxes, English booster boxes, Elite Trainer Boxes, sealed cases. Use the existing query-param filters as landing pages and give them real H1s and copy.
5. **Give Japanese Pokémon its own landing copy** using the exact modifiers customers type: "guaranteed hits", "case", "pull rates", "import". These are medium-competition and match the store's identity.
6. **Own the reseal / authenticity topic.** The existing post is genuinely differentiated; expand it and add internal links from every seal-related product page to it.
7. **Weiss Schwarz English is the softest commercial SERP.** Add per-licence sections (NIKKE, Blue Archive, Umamusume, Frieren) and trial-deck content.
8. **Add an "authenticity and sealing" proof block** sitewide (vent holes, Pokéball stamp, weight check) because that is the trust message competitors do not state.
9. **Target transactional "where to buy + country" long-tails** (`usa`, `uk`, `canada`, `worldwide shipping`) since worldwide shipping is a core promise.
10. **Convert informational readers**: every blog post should end with a clear link to the matching category page and a newsletter capture.
11. **Publish the missing set/product explainers** from the FAQ list that have no page yet: "what is a booster bundle", "what is a case of Pokémon cards", "does Pokémon reprint boxes", "is One Piece TCG worth collecting".
12. **Do not chase head terms** ("pokemon booster box", "pokemon cards for sale"). Spend zero hours there.
13. **Add internal links** from blog posts to `/shop/product/<slug>` for the exact products mentioned (30th Anniversary, OP-15, Phantasmal Flames, etc.).
14. **Track branded search** monthly and re-run this autocomplete sweep quarterly to catch new set names early.
15. **Keep the honesty posture** ("no emoji", factual, no affiliate padding). It is a real differentiator in this niche and it supports E-E-A-T for the YMYL-adjacent spending decisions involved.

---

## 9. What could not be verified

- **Actual monthly search volumes** for any keyword. No keyword tool with volume data was available or used. All demand language here is relative.
- **Live Google SERP positions.** Google search HTML was not fetched; DuckDuckGo was the SERP proxy. DuckDuckGo rankings approximate but do not equal Google rankings.
- **Keyword difficulty scores.** Competition columns are qualitative guesses from the observed result sets.
- **Bing SERPs.** Bing HTML returned bot-mitigated, wrong-locale results and was discarded.
- **Mojeek and Ecosia SERPs.** Mojeek failed to connect; Ecosia returned HTTP 403.
- **Whether the domain will resolve or rank.** The Vercel preview domain is not a durable brand home; behaviour was not tested beyond content inspection.
