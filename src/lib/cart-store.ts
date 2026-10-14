"use client";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
};

const KEY = "pokemon-rush-cart";
const EVENT = "pokemon-rush-cart-change";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function addToCart(line: Omit<CartLine, "quantity">, quantity = 1) {
  const lines = readCart();
  const existing = lines.find((l) => l.slug === line.slug);
  if (existing) {
    existing.quantity += quantity;
  } else {
    lines.push({ ...line, quantity });
  }
  writeCart(lines);
}

export function updateQuantity(slug: string, quantity: number) {
  const lines = readCart()
    .map((l) => (l.slug === slug ? { ...l, quantity: Math.max(0, quantity) } : l))
    .filter((l) => l.quantity > 0);
  writeCart(lines);
}

export function removeLine(slug: string) {
  writeCart(readCart().filter((l) => l.slug !== slug));
}

export function clearCart() {
  writeCart([]);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.price * l.quantity, 0);
}

export function onCartChange(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
