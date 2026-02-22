export function formatPrice(amount = 0, decimals = 2, currency = "$") {
  return `${currency}${(amount / 10 ** decimals).toFixed(decimals)}`;
}
