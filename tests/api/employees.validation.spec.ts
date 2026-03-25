import { expect, test } from '@playwright/test';

import { buildEmployeePayload } from '../helpers/employee-factory';
import {
  createEmployee,
  deleteEmployee,
  deleteEmployeesByName,
  findEmployeeById,
  updateEmployee
} from '../helpers/employee-service';
import type { EmployeeUpdatePayload } from '../helpers/types';

const NON_EXISTING_ID = '00000000-0000-0000-0000-000000000000';
const INVALID_UUID = 'not-a-uuid';

test.describe('Employees API validation', () => {
  test('POST with dependants = -1 returns 400', async ({ request }) => {
    const payload = buildEmployeePayload({ dependants: -1 });

    const response = await createEmployee(request, payload);

    expect(response.status()).toBe(400);
  });

  test('POST with dependants = 33 returns 400', async ({ request }) => {
    const payload = buildEmployeePayload({ dependants: 33 });

    const response = await createEmployee(request, payload);

    expect(response.status()).toBe(400);
  });

  test('POST with decimal dependants = 1.5 returns 400', async ({ request }) => {
    const payload = {
      ...buildEmployeePayload(),
      dependants: 1.5
    };

    const response = await createEmployee(request, payload);

    expect(response.status()).toBe(400);
  });

  test('POST with extra undocumented property returns 400', async ({ request }) => {
    const payload = {
      ...buildEmployeePayload(),
      foo: 'bar'
    };

    try {
      const response = await createEmployee(request, payload);

      expect(response.status()).toBe(400);
    } finally {
      await deleteEmployeesByName(request, payload.firstName, payload.lastName);
    }
  });

  test('POST with null dependants returns 400', async ({ request }) => {
    const payload = {
      ...buildEmployeePayload(),
      dependants: null
    };

    const response = await createEmployee(request, payload);

    expect(response.status()).toBe(400);
  });

  test('POST with dependants as string \"2\" returns 400', async ({ request }) => {
    const payload = {
      ...buildEmployeePayload(),
      dependants: '2'
    };

    try {
      const response = await createEmployee(request, payload);

      expect(response.status()).toBe(400);
    } finally {
      await deleteEmployeesByName(request, payload.firstName, payload.lastName);
    }
  });

  test('POST with dependants as string \"2abc\" returns 400', async ({ request }) => {
    const payload = {
      ...buildEmployeePayload(),
      dependants: '2abc'
    };

    const response = await createEmployee(request, payload);

    expect(response.status()).toBe(400);
  });

  test('PUT with non-existing ID returns 404 instead of creating a new record', async ({ request }) => {
    const payload: EmployeeUpdatePayload = {
      ...buildEmployeePayload({ dependants: 1 }),
      id: NON_EXISTING_ID
    };

    try {
      const response = await updateEmployee(request, payload);

      expect(response.status()).toBe(404);
      await expect(findEmployeeById(request, payload.id)).resolves.toBeUndefined();
    } finally {
      await deleteEmployeesByName(request, payload.firstName, payload.lastName);
    }
  });

  test('DELETE non-existing ID returns 404', async ({ request }) => {
    const response = await deleteEmployee(request, NON_EXISTING_ID);

    expect(response.status()).toBe(404);
  });

  test('DELETE invalid UUID returns 400', async ({ request }) => {
    const response = await deleteEmployee(request, INVALID_UUID);

    expect(response.status()).toBe(400);
  });
});
