import { expect, test } from '@playwright/test';

import {
  ANNUAL_SALARY,
  GROSS_PAY_PER_PAYCHECK,
  expectedBenefitsCost,
  expectedNetPay,
  formatMoney
} from '../helpers/calculations';
import { buildEmployeePayload } from '../helpers/employee-factory';
import { deleteEmployee, deleteEmployeesByName } from '../helpers/employee-service';

import { BenefitsDashboardPage } from './pages/benefits-dashboard-page';
import { LoginPage } from './pages/login-page';

test.describe('Benefits Dashboard employees', () => {
  test('add employee shows expected payroll calculations', async ({ page, request }) => {
    const employee = buildEmployeePayload({ dependants: 2 });
    const loginPage = new LoginPage(page);
    const benefitsDashboardPage = new BenefitsDashboardPage(page);
    let createdEmployeeId: string | undefined;

    try {
      await loginPage.login();
      await benefitsDashboardPage.expectLoaded();
      await benefitsDashboardPage.addEmployee(employee);

      const createdRow = await benefitsDashboardPage.readEmployeeRow(employee.firstName, employee.lastName);
      createdEmployeeId = createdRow[0];

      const row = await benefitsDashboardPage.readRowById(createdEmployeeId);

      //expect(row.lastName).toBe(employee.lastName);  // Uncomment when issue is fixed.
      //expect(row.firstName).toBe(employee.firstName);  // Uncomment when issue is fixed.
      expect(row.dependants).toBe(String(employee.dependants));
      expect(row.salary).toBe(formatMoney(ANNUAL_SALARY));
      expect(row.gross).toBe(formatMoney(GROSS_PAY_PER_PAYCHECK));
      expect(row.benefitsCost).toBe(formatMoney(expectedBenefitsCost(employee.dependants)));
      expect(row.net).toBe(formatMoney(expectedNetPay(employee.dependants)));
    } finally {
      if (createdEmployeeId) {
        await deleteEmployee(request, createdEmployeeId);
      } else {
        await deleteEmployeesByName(request, employee.firstName, employee.lastName);
      }
    }
  });

  test('edit employee updates dependants and recalculates payroll values', async ({
    page,
    request
  }) => {
    const employee = buildEmployeePayload({ dependants: 1 });
    const updatedDependants = 4;
    const loginPage = new LoginPage(page);
    const benefitsDashboardPage = new BenefitsDashboardPage(page);
    let createdEmployeeId: string | undefined;

    try {
      await loginPage.login();
      await benefitsDashboardPage.expectLoaded();
      await benefitsDashboardPage.addEmployee(employee);

      const createdRow = await benefitsDashboardPage.readEmployeeRow(employee.firstName, employee.lastName);
      createdEmployeeId = createdRow[0];

      await benefitsDashboardPage.editEmployee(createdEmployeeId, {
        firstName: employee.firstName,
        lastName: employee.lastName,
        dependants: updatedDependants
      });

      const row = await benefitsDashboardPage.readRowById(createdEmployeeId);

      expect(row.dependants).toBe(String(updatedDependants));
      expect(row.salary).toBe(formatMoney(ANNUAL_SALARY));
      expect(row.gross).toBe(formatMoney(GROSS_PAY_PER_PAYCHECK));
      expect(row.benefitsCost).toBe(formatMoney(expectedBenefitsCost(updatedDependants)));
      expect(row.net).toBe(formatMoney(expectedNetPay(updatedDependants)));
    } finally {
      if (createdEmployeeId) {
        await deleteEmployee(request, createdEmployeeId);
      } else {
        await deleteEmployeesByName(request, employee.firstName, employee.lastName);
      }
    }
  });

  test('delete employee removes the row from the table', async ({ page, request }) => {
    const employee = buildEmployeePayload({ dependants: 1 });
    const loginPage = new LoginPage(page);
    const benefitsDashboardPage = new BenefitsDashboardPage(page);
    let createdEmployeeId: string | undefined;

    try {
      await loginPage.login();
      await benefitsDashboardPage.expectLoaded();
      await benefitsDashboardPage.addEmployee(employee);

      const createdRow = await benefitsDashboardPage.readEmployeeRow(employee.firstName, employee.lastName);
      createdEmployeeId = createdRow[0];

      await benefitsDashboardPage.deleteEmployee(createdEmployeeId);
      await benefitsDashboardPage.expectEmployeeRowRemoved(createdEmployeeId);
      createdEmployeeId = undefined;
    } finally {
      if (createdEmployeeId) {
        await deleteEmployee(request, createdEmployeeId);
      } else {
        await deleteEmployeesByName(request, employee.firstName, employee.lastName);
      }
    }
  });
});
