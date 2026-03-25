export interface Employee {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dependants: number;
  salary: number;
  gross: number;
  benefitsCost: number;
  net: number;
}

export interface EmployeePayload {
  id?: string; // ID is overriden.
  username?: string; // Username is overriden.
  firstName: string;
  lastName: string;
  dependants: number;
}

export interface EmployeeUpdatePayload extends EmployeePayload {
  id: string;
}
