export function approxNet2025(gross: number): number {
    const netPerc =
        gross < 50_000 ? 0.642 - 0.00001 * (gross - 45_000)
      : gross < 70_000 ? 0.60  - 0.00005 * (gross - 50_000)
      : 0.55;
    return Math.round(gross * netPerc);
  }
  