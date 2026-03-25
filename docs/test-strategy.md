# Test Strategy

## Objective

This document defines the testing approach for the Paylocity Benefits Dashboard challenge. The goal is to assess the application for functional correctness, calculation accuracy, data integrity, and usability issues, and to build a focused automation suite for both API and UI.

## Scope

The scope of testing includes the Benefits Dashboard UI and the Employees API used by the application. The application supports adding, editing, and deleting employees and their dependents, and it must correctly calculate salary-related benefit deductions shown to the employer.

In scope:

- Login flow 
- Employee add flow
- Employee edit flow
- Employee delete flow
- Displayed employee table data
- Payroll and benefits calculations
- API validation behavior

Out of scope:

- Performance or load testing
- Security penetration testing
- Browser compatibility
- Visual design review

## Business Rules

- Every employee is paid 2000.00 per paycheck before deductions
- There are 26 paychecks in a year
- Employee annual benefits cost is 1000.00
- Each dependent adds 500.00 per year in benefits cost

Expectations:

- Annual salary = 2000.00 x 26 = 52000.00
- Benefits cost per paycheck = (1000.00 + dependants x 500.00) / 26
- Net pay per paycheck = 2000.00 - benefits cost per paycheck

These formulas will be used as test oracles in both exploratory testing and automation.

## Test Approach

### 1. Exploratory testing

The first phase will be exploratory testing of both UI and API. The purpose is to understand actual system behavior, uncover defects, and identify the most valuable scenarios for automation.

### 2. Automation selection

Not everything will be automated. Automation will focus on:

- Core workflows 
- High-value business assertions

## Manual Test Coverage Areas

### UI

- Login and access to dashboard
- Add employee with valid values
- Edit employee values and verify updated table state
- Delete employee and verify row removal
- Table content correctness
- Required field behavior
- Invalid dependents input
- Calculation correctness in displayed columns

### API

- GET employees
- POST employee
- PUT employee
- DELETE employee by id
- Missing required fields
- Invalid data types
- Boundary values for dependants
- Invalid ids

## Planned Automation Coverage

### API automation

- Create employee with valid payload
- Read employee list and confirm created record
- Update employee fields
- Delete employee
- Negative validation scenarios for dependants and required fields
- Calculation assertions on returned values

### UI automation

- Add employee and validate row data, calculations
- Edit employee and validate updated row data, calculations
- Delete employee and validate removal

## Defect Reporting

Bugs found during testing will be documented in:

- `docs/ui-bug-report.md`
- `docs/api-bug-report.md`

## Tooling 

- Playwright with TypeScript for both UI and API