import type { EmployeePayload } from './types';

type EmployeeOverrides = Partial<EmployeePayload>;

export function buildEmployeePayload(overrides: EmployeeOverrides = {}): EmployeePayload {
  const uniqueSuffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    firstName: `Test${uniqueSuffix}`,
    lastName: `User${uniqueSuffix}`,
    username: `TestUser938`,
    dependants: 2,
    ...overrides
  };
}
