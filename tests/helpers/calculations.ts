export const GROSS_PAY_PER_PAYCHECK = 2000;
export const PAYCHECKS_PER_YEAR = 26;
export const EMPLOYEE_ANNUAL_BENEFITS_COST = 1000;
export const DEPENDANT_ANNUAL_BENEFITS_COST = 500;
export const ANNUAL_SALARY = GROSS_PAY_PER_PAYCHECK * PAYCHECKS_PER_YEAR;

export function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

export function expectedBenefitsCost(dependants: number): number {
  return roundToTwo(
    (EMPLOYEE_ANNUAL_BENEFITS_COST + dependants * DEPENDANT_ANNUAL_BENEFITS_COST) /
      PAYCHECKS_PER_YEAR
  );
}

export function expectedNetPay(dependants: number): number {
  return roundToTwo(GROSS_PAY_PER_PAYCHECK - expectedBenefitsCost(dependants));
}

export function formatMoney(value: number): string {
  return value.toFixed(2);
}
