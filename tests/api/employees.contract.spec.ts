import { expect, test } from '@playwright/test';

import { expectEmployeeFinancials } from '../helpers/employee-assertions';
import { buildEmployeePayload } from '../helpers/employee-factory';
import {
  createEmployee,
  expectDeleteSucceeded,
  deleteEmployee,
  deleteEmployeesByName,
  findEmployeeById,
  getEmployees,
  updateEmployee
} from '../helpers/employee-service';
import type { Employee, EmployeeUpdatePayload } from '../helpers/types';

test.describe('Employees API contract', () => {
  test('GET all employees returns a valid employee collection', async ({ request }) => {
    const employees = await getEmployees(request);

    expect(Array.isArray(employees)).toBe(true);

    if (employees.length > 0) {
      const employee = employees[0];

      expect(employee).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          username: expect.any(String),
          dependants: expect.any(Number),
          salary: expect.any(Number),
          gross: expect.any(Number),
          benefitsCost: expect.any(Number),
          net: expect.any(Number)
        })
      );
    }
  });

  test('POST creates an employee and returns the expected calculations', async ({ request }) => {
    const payload = buildEmployeePayload({ dependants: 2 });
    let createdEmployeeId: string | undefined;

    try {
      const response = await createEmployee(request, payload);
      expect(response.status()).toBe(200);

      const createdEmployee = (await response.json()) as Employee;
      createdEmployeeId = createdEmployee.id;

      expect(createdEmployee.firstName).toBe(payload.firstName);
      expect(createdEmployee.lastName).toBe(payload.lastName);
      expect(createdEmployee.id).toEqual(expect.any(String));
      expectEmployeeFinancials(createdEmployee, payload.dependants);

      const employees = await getEmployees(request);
      const matchingEmployee = employees.find((employee) => employee.id === createdEmployee.id);

      expect(matchingEmployee).toBeDefined();
      expect(matchingEmployee?.firstName).toBe(payload.firstName);
      expect(matchingEmployee?.lastName).toBe(payload.lastName);
      expectEmployeeFinancials(matchingEmployee as Employee, payload.dependants);
    } finally {
      if (createdEmployeeId) {
        await deleteEmployee(request, createdEmployeeId);
      } else {
        await deleteEmployeesByName(request, payload.firstName, payload.lastName);
      }
    }
  });

  test('PUT updates an existing employee successfully and recalculates totals', async ({
    request
  }) => {
    const createPayload = buildEmployeePayload({ dependants: 1 });
    let createdEmployeeId: string | undefined;

    try {
      const createResponse = await createEmployee(request, createPayload);
      expect(createResponse.status()).toBe(200);

      const createdEmployee = (await createResponse.json()) as Employee;
      createdEmployeeId = createdEmployee.id;

      const updatePayload: EmployeeUpdatePayload = {
        id: createdEmployee.id,
        firstName: createPayload.firstName,
        lastName: createPayload.lastName,
        username: createdEmployee.username,
        dependants: 4
      };

      const updateResponse = await updateEmployee(request, updatePayload);
      expect(updateResponse.status()).toBe(200);

      const updatedEmployee = (await updateResponse.json()) as Employee;

      expect(updatedEmployee.id).toBe(createdEmployee.id);
      expect(updatedEmployee.firstName).toBe(updatePayload.firstName);
      expect(updatedEmployee.lastName).toBe(updatePayload.lastName);
      expect(updatedEmployee.dependants).toBe(updatePayload.dependants);
      expectEmployeeFinancials(updatedEmployee, updatePayload.dependants);

      const matchingEmployee = await findEmployeeById(request, createdEmployee.id);

      expect(matchingEmployee).toBeDefined();
      expect(matchingEmployee?.dependants).toBe(updatePayload.dependants);
      expectEmployeeFinancials(matchingEmployee as Employee, updatePayload.dependants);
    } finally {
      if (createdEmployeeId) {
        await deleteEmployee(request, createdEmployeeId);
      } else {
        await deleteEmployeesByName(request, createPayload.firstName, createPayload.lastName);
      }
    }
  });

  test('DELETE existing employee succeeds', async ({ request }) => {
    const payload = buildEmployeePayload({ dependants: 1 });
    let createdEmployeeId: string | undefined;

    try {
      const createResponse = await createEmployee(request, payload);
      expect(createResponse.status()).toBe(200);

      const createdEmployee = (await createResponse.json()) as Employee;
      createdEmployeeId = createdEmployee.id;

      const deleteResponse = await deleteEmployee(request, createdEmployee.id);

      await expectDeleteSucceeded(deleteResponse);
      await expect(findEmployeeById(request, createdEmployee.id)).resolves.toBeUndefined();
      createdEmployeeId = undefined;
    } finally {
      if (createdEmployeeId) {
        await deleteEmployee(request, createdEmployeeId);
      } else {
        await deleteEmployeesByName(request, payload.firstName, payload.lastName);
      }
    }
  });
});
