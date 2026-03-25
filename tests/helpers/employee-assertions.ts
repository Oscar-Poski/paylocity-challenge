import { expect } from '@playwright/test';

import {
  ANNUAL_SALARY,
  GROSS_PAY_PER_PAYCHECK,
  expectedBenefitsCost,
  expectedNetPay
} from './calculations';
import type { Employee } from './types';

export function expectEmployeeFinancials(employee: Employee, dependants: number): void {
  expect(employee.salary).toBeCloseTo(ANNUAL_SALARY, 2);
  expect(employee.gross).toBeCloseTo(GROSS_PAY_PER_PAYCHECK, 2);
  expect(employee.benefitsCost).toBeCloseTo(expectedBenefitsCost(dependants), 2);
  expect(employee.net).toBeCloseTo(expectedNetPay(dependants), 2);
}
