export type PaymentMethodLike = {
  slug: string;
  label: string;
  description: string;
  instructions: string;
  details: { label: string; value: string }[];
};

export const defaultPaymentMethods: PaymentMethodLike[] = [
  {
    slug: "bank-transfer",
    label: "Bank transfer",
    description: "Pay by wire or local bank transfer. Instructions are sent with your order.",
    instructions:
      "We will email you the bank details for your currency within one business day. Your order is reserved until payment clears.",
    details: [],
  },
  {
    slug: "paypal-invoice",
    label: "PayPal invoice",
    description: "We send a PayPal invoice you can pay with a card or PayPal balance.",
    instructions:
      "A PayPal invoice will arrive by email shortly. You can pay it with any major card, even without a PayPal account.",
    details: [],
  },
  {
    slug: "crypto",
    label: "Cryptocurrency",
    description: "Pay in BTC, ETH, or USDT. The rate is locked when we confirm your order.",
    instructions:
      "Reply to your confirmation email with the coin you would like to use and we will send a wallet address and a locked rate.",
    details: [],
  },
  {
    slug: "cash-pickup",
    label: "Cash on pickup",
    description: "Available for customers collecting in person.",
    instructions:
      "We will confirm a collection time by email. Bring your order reference and a valid ID.",
    details: [],
  },
];
