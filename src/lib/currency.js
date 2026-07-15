/** Formats a plain rupee amount (e.g. 249) as "₹249", with Indian-style
 * thousands separators (e.g. 12499 -> "₹12,499") via the en-IN locale. */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
