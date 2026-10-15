export function generateOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `PSD-${year}-${rand}`;
}
