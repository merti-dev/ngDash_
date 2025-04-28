export function approxNet2025(gross: number): number {
  let ratio: number;

  if (gross <= 30_000) {
    /* low-income band: ~72 % net */
    ratio = 0.72;
  } else if (gross <= 45_000) {
    /* drop from 72 % → 66 % over 15 k (slope −0.000004) */
    ratio = 0.72 - 0.000004 * (gross - 30_000);
  } else if (gross <= 65_000) {
    /* drop from 66 % → 60 % over 20 k (slope −0.000003) */
    ratio = 0.66 - 0.000003 * (gross - 45_000);
  } else {
    /* high-income: continue to fall but clamp at 52 % */
    ratio = 0.60 - 0.000002 * (gross - 65_000);
    ratio = Math.max(ratio, 0.52);
  }

  return Math.round(gross * ratio); // annual net €
}
  