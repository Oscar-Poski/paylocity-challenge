import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';

import { buildApiUrl, getApiAuthHeaders } from './env';
import type { Employee, EmployeeUpdatePayload } from './types';

const employeesEndpoint = buildApiUrl('api/Employees');

export async function getEmployees(request: APIRequestContext): Promise<Employee[]> {
  const response = await request.get(employeesEndpoint, {
    headers: getApiAuthHeaders()
  });

  expect(response.status()).toBe(200);

  return (await response.json()) as Employee[];
}

export async function createEmployee(
  request: APIRequestContext,
  payload: object
): Promise<APIResponse> {
  return request.post(employeesEndpoint, {
    data: payload,
    headers: getApiAuthHeaders()
  });
}

export async function updateEmployee(
  request: APIRequestContext,
  payload: EmployeeUpdatePayload | object
): Promise<APIResponse> {
  return request.put(employeesEndpoint, {
    data: payload,
    headers: getApiAuthHeaders()
  });
}

export async function deleteEmployee(
  request: APIRequestContext,
  employeeId: string
): Promise<APIResponse> {
  return request.delete(buildApiUrl(`api/Employees/${employeeId}`), {
    headers: getApiAuthHeaders()
  });
}

export async function findEmployeeById(
  request: APIRequestContext,
  employeeId: string
): Promise<Employee> {
  const response = await request.get(buildApiUrl(`api/Employees/${employeeId}`), {
    headers: getApiAuthHeaders()
  });

  expect(response.status()).toBe(200);

  return (await response.json()) as Employee;
}

export async function findEmployeesByName(
  request: APIRequestContext,
  firstName: string,
  lastName: string
): Promise<Employee[]> {
  const employees = await getEmployees(request);

  return employees.filter(
    (employee) => employee.firstName === firstName && employee.lastName === lastName
  );
}

export async function deleteEmployeesByName(
  request: APIRequestContext,
  firstName: string,
  lastName: string
): Promise<void> {
  const matches = await findEmployeesByName(request, firstName, lastName);

  for (const employee of matches) {
    await deleteEmployee(request, employee.id);
  }
}

export async function expectDeleteSucceeded(response: APIResponse): Promise<void> {
  expect(response.ok()).toBe(true);
  expect([200, 204]).toContain(response.status());
}
