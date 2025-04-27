export function requiredNetSalary(
    currentNet: number,
    savings: number,
    targetIndex: number,
    baseIndex = 63.6          // Mannheim
  ): number {
    const expensesNow   = currentNet - savings;
    const targetExpense = expensesNow * (targetIndex / baseIndex);
    return Math.round(targetExpense + savings);
  }
  