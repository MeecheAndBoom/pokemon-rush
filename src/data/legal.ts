export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

const CONTACT = `If you have questions about this document, email support@pokestoredirect.com or call (213) 300-5923.`;

export const legalDocs: Record<string, LegalDoc> = {
  terms: {
    slug: "terms",
    title: "Terms & conditions",
    description:
      "The terms that govern your use of the PokéStore Direct website and any order you place with us.",
    lastUpdated: "2026-09-01",
    intro:
      'These terms and conditions ("Terms") govern your access to and use of pokestoredirect.com and any purchase you make from PokéStore Direct ("we", "us", "our"). By using the site or placing an order you agree to these Terms. If you do not agree, please do not use the site.',
    sections: [
      {
        heading: "1. Who we are",
        body: `PokéStore Direct is an independent online retailer of trading card products, including factory-sealed Pokémon, One Piece, and Weiss Schwarz items. We are not affiliated with, endorsed by, or sponsored by Nintendo, Creatures, GAME FREAK, The Pokémon Company, Bandai, or Bushiroad. All trademarks are the property of their respective owners.`,
      },
      {
        heading: "2. Products and descriptions",
        body: `We describe every product as accurately as we can, including brand, language, product type, and condition. Product images are provided for illustration; packaging and artwork can differ between print runs and regions. Factory-sealed products are sold in the condition described on the product page. We do not guarantee the contents of any sealed product, because the contents are not knowable without opening it.`,
      },
      {
        heading: "3. Pricing and currency",
        body: `Prices are displayed in the currency shown on the product and at checkout and may be shown in more than one currency for convenience. We may change prices and availability at any time without notice. Where a price is listed incorrectly, we may cancel an affected order and refund any amount already paid.`,
      },
      {
        heading: "4. Orders and acceptance",
        body: `Your order is an offer to buy. A contract is formed only when we confirm your order by email. Because payment for many orders is arranged by email after checkout, an order is not final until payment is received and confirmed. We may decline or cancel an order where a product is unavailable, where we suspect fraud, where there is a pricing error, or where we are unable to ship to the address provided.`,
      },
      {
        heading: "5. Payment",
        body: `This site does not process card payments directly. After you place an order we email you an order reference and payment instructions for the method you selected. Payment must be received within the period stated in those instructions. If payment is not received, we may cancel the order. Prices do not include any duties, taxes, or import fees that may apply in your jurisdiction unless expressly stated.`,
      },
      {
        heading: "6. Shipping and risk",
        body: `Shipping timeframes are estimates, not guarantees. Risk in the goods passes to you on delivery to the address you provide. If your parcel is lost or arrives damaged, contact us promptly so we can work with the carrier and resolve it. Our full policy is set out on our Shipping & delivery page.`,
      },
      {
        heading: "7. Returns",
        body: `Returns are governed by our Returns & refunds policy, which forms part of these Terms. In summary, we accept returns within 7 days of delivery where an item is not as described, arrives damaged, or an incorrect item was sent, provided you contact us first. Opened products and cards removed from sealed products cannot be returned.`,
      },
      {
        heading: "8. Pre-orders",
        body: `Pre-order and presale items are reserved in advance of release. Release dates are set by manufacturers and can change without notice. If a release date moves or an item becomes unavailable, we will contact you and offer to hold, substitute, or refund your order.`,
      },
      {
        heading: "9. Acceptable use",
        body: `You agree not to misuse the site, including by attempting to interfere with its operation, scraping it at scale, placing fraudulent orders, or using it in breach of any applicable law. We may suspend or refuse access where we reasonably believe misuse has occurred.`,
      },
      {
        heading: "10. Intellectual property",
        body: `The design, text, and organisation of this site are owned by or licensed to PokéStore Direct. Product names, logos, and artwork belong to their respective rights holders and are used for identification purposes. You may not reproduce our site content without permission.`,
      },
      {
        heading: "11. Limitation of liability",
        body: `To the maximum extent permitted by law, our total liability arising from any order is limited to the amount you paid for that order. We are not liable for indirect or consequential losses, including loss of profit or loss of expected value in a collectible. Nothing in these Terms excludes liability that cannot lawfully be excluded.`,
      },
      {
        heading: "12. Governing law",
        body: `These Terms are governed by the laws of the State of Michigan, United States, without regard to conflict of law rules. Any dispute will be subject to the exclusive jurisdiction of the courts located in Michigan, unless mandatory local consumer law provides otherwise.`,
      },
      {
        heading: "13. Changes to these Terms",
        body: `We may update these Terms from time to time. The version in force is the one published on this page at the time you place your order. Continued use of the site after a change constitutes acceptance of the updated Terms.`,
      },
      {
        heading: "14. Contact",
        body: CONTACT,
      },
    ],
  },

  privacy: {
    slug: "privacy",
    title: "Privacy policy",
    description:
      "What personal information PokéStore Direct collects, how we use it, and the choices you have.",
    lastUpdated: "2026-09-01",
    intro:
      "This privacy policy explains what personal information we collect when you use pokestoredirect.com, why we collect it, how we use and protect it, and the rights you have over it.",
    sections: [
      {
        heading: "1. Information we collect",
        body: `We collect information you give us directly, such as your name, email address, phone number, and shipping address when you place an order or contact us. We also collect information automatically when you use the site, such as your IP address, browser type, device information, pages viewed, and referring URL. We do not collect or store card numbers on this site, because we do not process card payments here.`,
      },
      {
        heading: "2. How we use your information",
        body: `We use your information to process and fulfil orders, send order confirmations and payment instructions, respond to enquiries, provide customer support, prevent fraud, comply with legal obligations, and — where you have opted in — send occasional updates about new releases and offers. We also use aggregated, non-identifying information to understand how the site is used so we can improve it.`,
      },
      {
        heading: "3. Legal bases",
        body: `Where required, we rely on the following legal bases: performance of a contract (to fulfil your order), legitimate interests (to operate and improve our business and prevent fraud), consent (for marketing communications), and legal obligation (for record keeping and tax).`,
      },
      {
        heading: "4. Sharing your information",
        body: `We share information only as needed to run the business. This includes shipping carriers (to deliver your order), email and hosting providers (to operate the site and send messages), payment providers (to collect payment for orders arranged by email), and analytics providers. We do not sell your personal information.`,
      },
      {
        heading: "5. Cookies and similar technologies",
        body: `We use cookies and similar technologies for essential site functions, such as keeping your cart working, and for analytics. You can control cookies through your browser settings. Our Cookies policy explains this in more detail.`,
      },
      {
        heading: "6. Data retention",
        body: `We keep order records for as long as needed to fulfil orders and meet legal, accounting, and tax requirements. Marketing contact details are kept until you unsubscribe. Enquiry records are kept for a reasonable period so we can help you if you return with a related question.`,
      },
      {
        heading: "7. Security",
        body: `We take reasonable technical and organisational measures to protect your information, including encrypted connections, access controls, and limiting who can see order data. No method of transmission or storage is perfectly secure, but we work to keep your information safe and to respond quickly if an issue arises.`,
      },
      {
        heading: "8. International transfers",
        body: `We may process your information in countries other than your own, including the United States and the location of our service providers. Where we transfer personal information across borders, we take steps to ensure it receives an appropriate level of protection.`,
      },
      {
        heading: "9. Your rights",
        body: `Depending on where you live, you may have the right to access, correct, delete, or restrict the use of your personal information, to object to certain processing, to receive your data in a portable format, and to withdraw consent. To exercise any of these rights, contact us using the details below. You also have the right to complain to your local data protection authority.`,
      },
      {
        heading: "10. Children",
        body: `This site is not directed at children, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it.`,
      },
      {
        heading: "11. Changes to this policy",
        body: `We may update this policy from time to time. The current version is always published on this page, with the date it was last updated shown above.`,
      },
      {
        heading: "12. Contact",
        body: CONTACT,
      },
    ],
  },

  cookies: {
    slug: "cookies",
    title: "Cookies policy",
    description:
      "How PokéStore Direct uses cookies and similar technologies, and how you can control them.",
    lastUpdated: "2026-09-01",
    intro:
      "This Cookies policy explains what cookies are, how we use them, and how you can control them when you visit pokestoredirect.com.",
    sections: [
      {
        heading: "1. What cookies are",
        body: `Cookies are small text files placed on your device when you visit a website. They help websites remember information about your visit, such as the contents of your cart or your preferences. Similar technologies, such as local storage and pixels, work in comparable ways, and this policy covers them too.`,
      },
      {
        heading: "2. Essential cookies",
        body: `Some cookies are necessary for the site to work. These include remembering what is in your cart between pages and keeping the site secure. Essential cookies cannot be switched off through our site because the site will not function correctly without them.`,
      },
      {
        heading: "3. Analytics cookies",
        body: `We use analytics to understand which pages are visited and how people move through the site, so we can improve it. Analytics data is used in aggregate. Where required, analytics cookies are only set with your consent.`,
      },
      {
        heading: "4. Third-party cookies",
        body: `Some features rely on third parties, such as embedded media or map providers, which may set their own cookies. We do not control those cookies. Please review the relevant third party's policy for details.`,
      },
      {
        heading: "5. Managing cookies",
        body: `You can control and delete cookies through your browser settings. Most browsers let you block all cookies, block third-party cookies, or delete cookies when you close the browser. Blocking essential cookies may prevent parts of the site, such as the cart, from working.`,
      },
      {
        heading: "6. Do not track",
        body: `Some browsers offer a "do not track" signal. Because there is no common industry standard for how to respond to it, we do not currently respond to these signals, but you can use the cookie controls described above.`,
      },
      {
        heading: "7. Contact",
        body: CONTACT,
      },
    ],
  },

  accessibility: {
    slug: "accessibility",
    title: "Accessibility statement",
    description:
      "Our commitment to making pokestoredirect.com usable by everyone, and how to tell us about a barrier.",
    lastUpdated: "2026-09-01",
    intro:
      "We want everyone to be able to shop with PokéStore Direct. This statement explains the standards we aim for, what we have done so far, and how to tell us if something is not working for you.",
    sections: [
      {
        heading: "1. Our commitment",
        body: `We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. Accessibility is an ongoing effort rather than a finished state, and we review the site as we add features.`,
      },
      {
        heading: "2. What we have done",
        body: `We have built the site with semantic HTML, clear heading structure, visible keyboard focus styles, sufficient colour contrast, descriptive link text, alternative text for meaningful images, and a "skip to content" link. Animations respect your reduced-motion preference, and the layout is designed to work with high-contrast settings.`,
      },
      {
        heading: "3. Known limitations",
        body: `Some third-party embeds and older content may not fully meet our standards. Where we identify a barrier, we prioritise fixing it. If you encounter an issue, telling us is the fastest way to get it resolved.`,
      },
      {
        heading: "4. Assistive technology",
        body: `The site is designed to work with current versions of screen readers, keyboard navigation, and browser zoom up to 200% without loss of content or function.`,
      },
      {
        heading: "5. Giving feedback",
        body: `If you have trouble using any part of the site, or you would like information in a different format, email support@pokestoredirect.com or call (213) 300-5923. Please describe what you were trying to do and what happened, and we will respond promptly.`,
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    description:
      "Important information about PokéStore Direct, product values, and the information on this site.",
    lastUpdated: "2026-09-01",
    intro:
      "This disclaimer applies to the information published on pokestoredirect.com. Please read it together with our Terms & conditions.",
    sections: [
      {
        heading: "1. No affiliation",
        body: `PokéStore Direct is an independent reseller. We are not affiliated with, endorsed by, or sponsored by Nintendo, Creatures, GAME FREAK, The Pokémon Company, Bandai, Bushiroad, or any other rights holder. All product names, logos, and artwork are the property of their respective owners and are used for identification purposes only.`,
      },
      {
        heading: "2. Information accuracy",
        body: `We work to keep the information on this site accurate and current, but product details, availability, and release dates can change. We do not warrant that every description is free of error at all times. Where a material error is found, our Terms & conditions explain how we handle affected orders.`,
      },
      {
        heading: "3. No investment advice",
        body: `Collectibles can rise and fall in value. Nothing on this site is investment, financial, or tax advice, and nothing should be read as a promise that any product will hold or increase in value. Any decision to buy, hold, or sell is your own.`,
      },
      {
        heading: "4. Sealed product contents",
        body: `The contents of factory-sealed products are not knowable without opening them. We describe the product as packaged by the manufacturer and cannot guarantee specific cards, rarity distributions, or resale outcomes.`,
      },
      {
        heading: "5. External links",
        body: `This site may link to third-party websites. We do not control those sites and are not responsible for their content, products, or privacy practices. A link is not an endorsement.`,
      },
      {
        heading: "6. Contact",
        body: CONTACT,
      },
    ],
  },
};
