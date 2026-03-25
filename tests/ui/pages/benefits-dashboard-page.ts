import { expect, type Locator, type Page } from '@playwright/test';

import type { EmployeePayload } from '../../helpers/types';

export interface EmployeeTableRow {
  id: string;
  lastName: string;
  firstName: string;
  dependants: string;
  salary: string;
  gross: string;
  benefitsCost: string;
  net: string;
}

export class BenefitsDashboardPage {
  readonly table: Locator;

  constructor(private readonly page: Page) {
    this.table = this.page.locator('#employeesTable');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('#add')).toBeVisible();
    await expect(this.table).toBeVisible();
    await expect(this.table.locator('tbody')).toBeVisible();
  }

  async addEmployee(employee: Pick<EmployeePayload, 'firstName' | 'lastName' | 'dependants'>): Promise<void> {
    await this.openAddEmployeeModal();
    await this.fillEmployeeForm(employee);
    await this.page.locator('#addEmployee').click();
    await expect(this.page.locator('#employeeModal')).toBeHidden();
  }

  async editEmployee(
    employeeId: string,
    updates: Pick<EmployeePayload, 'firstName' | 'lastName' | 'dependants'>
  ): Promise<void> {
    await this.rowById(employeeId).locator('.fa-edit').click();
    await expect(this.page.locator('#employeeModal')).toBeVisible();
    await this.fillEmployeeForm(updates);
    await this.page.locator('#updateEmployee').click();
    await expect(this.page.locator('#employeeModal')).toBeHidden();
  }

  async deleteEmployee(employeeId: string): Promise<void> {
    const row = this.rowById(employeeId);

    await row.locator('.fa-times').click();
    await expect(this.page.locator('#deleteModal')).toBeVisible();
    await this.page.locator('#deleteEmployee').click();
    await expect(this.page.locator('#deleteModal')).toBeHidden();
  }

  async openAddEmployeeModal(): Promise<void> {
    await this.page.locator('#add').click();
    await expect(this.page.locator('#employeeModal')).toBeVisible();
  }

  async fillEmployeeForm(
    employee: Pick<EmployeePayload, 'firstName' | 'lastName' | 'dependants'>
  ): Promise<void> {
    await this.page.locator('#firstName').fill(employee.firstName);
    await this.page.locator('#lastName').fill(employee.lastName);
    await this.page.locator('#dependants').fill(String(employee.dependants));
  }

  employeeRow(firstName: string, lastName: string): Locator {
    return this.page
      .locator('#employeesTable tbody tr')
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .last();
  }

  rowById(employeeId: string): Locator {
    return this.page.locator('#employeesTable tbody tr').filter({ hasText: employeeId }).last();
  }

  async readEmployeeRow(firstName: string, lastName: string): Promise<string[]> {
    const row = this.employeeRow(firstName, lastName);

    await expect(row).toBeVisible();

    return row.locator('td').allTextContents();
  }

  async readRowById(employeeId: string): Promise<EmployeeTableRow> {
    const row = this.rowById(employeeId);

    await expect(row).toBeVisible();

    const cells = await row.locator('td').allTextContents();

    return {
      id: cells[0],
      lastName: cells[1],
      firstName: cells[2],
      dependants: cells[3],
      salary: cells[4],
      gross: cells[5],
      benefitsCost: cells[6],
      net: cells[7]
    };
  }

  async readHeaderLabels(): Promise<string[]> {
    return this.page.locator('#employeesTable thead th').allTextContents();
  }

  async expectEmployeeRowRemoved(employeeId: string): Promise<void> {
    await expect(this.rowById(employeeId)).toHaveCount(0);
  }
}
