# API Bug Report

## BUG-API-001

**Title:** API ignores client-supplied id and username on create

**Severity:** High  
**Priority:** High  
**Area:** Employees API – POST  

**Steps to Reproduce:**
1. Send POST /api/Employees with:
   - Custom `id`
   - Custom `username`
2. Inspect response

**Actual Result:**
- API returns:
  - A different `id` than provided
  - A different `username` (e.g., "TestUser938")

**Expected Result:**
- Either:
  - API respects provided values, OR  
  - API clearly documents that these fields are server-generated  

**Impact:**
- Contract inconsistency
- Confusing behavior for API consumers

**Notes:**
- Same behavior observed in PUT responses

---

## BUG-API-002

**Title:** Decimal dependants value returns 405 Method Not Allowed

**Severity:** High  
**Priority:** High  
**Area:** Employees API – POST validation  

**Steps to Reproduce:**
1. Send POST /api/Employees with:
   - `"dependants": 1.5`

**Actual Result:**
- Response status: 405 Method Not Allowed  
- Response header: `Allow: GET`  
- Empty response body  

**Expected Result:**
- Response status: 400 Bad Request  
- Validation error message indicating invalid data type  

**Impact:**
- Incorrect HTTP semantics
- Indicates request is misrouted or improperly validated

---

## BUG-API-003

**Title:** API allows creation without required username

**Severity:** High  
**Priority:** High  
**Area:** Employees API – POST validation  

**Steps to Reproduce:**
1. Send POST /api/Employees without `username`

**Actual Result:**
- Response status: 200 OK  
- Employee is created successfully  
- Server assigns a default username  

**Expected Result:**
- Request should fail with 400 Bad Request  
- `username` is marked as required in schema  

**Impact:**
- Schema validation is not enforced
- Contract mismatch between documentation and implementation

**Note:**
- Same issue for PUT request
---

## BUG-API-004

**Title:** API accepts undocumented extra properties despite schema restriction

**Severity:** Medium  
**Priority:** Medium  
**Area:** Employees API – Schema validation  

**Steps to Reproduce:**
1. Send POST /api/Employees with an extra field:
   - `"foo": "bar"`

**Actual Result:**
- Response status: 200 OK  
- Employee is created successfully  
- Extra field is ignored

**Expected Result:**
- Request should fail  
- Schema defines `additionalProperties: false`

**Impact:**
- API contract not enforced
- Allows unexpected payloads

---

## BUG-API-005

**Title:** Null dependants value returns 405 instead of validation error

**Severity:** High  
**Priority:** High  
**Area:** Employees API – POST validation  

**Steps to Reproduce:**
1. Send POST /api/Employees with:
   - `"dependants": null`

**Actual Result:**
- Response status: 405 Method Not Allowed  
- Empty body  

**Expected Result:**
- Response status: 400 Bad Request  
- Validation error indicating invalid/null value  

**Impact:**
- Incorrect HTTP semantics
- Indicates improper request validation handling

---

## BUG-API-006

**Title:** String dependants value is accepted and coerced silently

**Severity:** Medium  
**Priority:** Medium  
**Area:** Employees API – Type validation  

**Steps to Reproduce:**
1. Send POST /api/Employees with:
   - `"dependants": "2"`

**Actual Result:**
- Response status: 200 OK  
- Value is stored as integer `2`

**Expected Result:**
- Request should fail with 400 Bad Request  
- API should enforce integer type strictly  

**Impact:**
- Silent type coercion

---

## BUG-API-007

**Title:** Mixed string dependants value returns 405 instead of validation error

**Severity:** High  
**Priority:** High  
**Area:** Employees API – POST validation  

**Steps to Reproduce:**
1. Send POST /api/Employees with:
   - `"dependants": "2abc"`

**Actual Result:**
- Response status: 405 Method Not Allowed  

**Expected Result:**
- Response status: 400 Bad Request  
- Clear validation error  

**Impact:**
- Incorrect HTTP semantics
- Inconsistent validation behavior

---

## BUG-API-008

**Title:** Invalid UUID returns 405 instead of validation error

**Severity:** High  
**Priority:** High  
**Area:** Employees API – Input validation  

**Steps to Reproduce:**
1. Send POST /api/Employees with:
   - `"id": "not-a-uuid"`

**Actual Result:**
- Response status: 405 Method Not Allowed  

**Expected Result:**
- Response status: 400 Bad Request  
- Validation error indicating invalid UUID  

**Impact:**
- Incorrect HTTP semantics
- Input validation failure

---

## BUG-API-009

**Title:** DELETE non-existing ID returns 200 OK

**Severity:** Medium  
**Priority:** Medium  
**Area:** Employees API – DELETE  

**Steps to Reproduce:**
1. Send DELETE /api/Employees/{non-existing-id}

**Actual Result:**
- Response status: 200 OK  

**Expected Result:**
- Response should indicate resource not found  

**Impact:**
- Misleading response
- Makes debugging difficult

---

## BUG-API-010

**Title:** DELETE with invalid UUID returns 405 instead of validation error

**Severity:** Medium  
**Priority:** Medium  
**Area:** Employees API – DELETE validation  

**Steps to Reproduce:**
1. Send DELETE /api/Employees/not-a-uuid  

**Actual Result:**
- Response status: 405 Method Not Allowed  

**Expected Result:**
- Response status: 400 Bad Request  

**Impact:**
- Incorrect HTTP semantics

---

## Observations

### Decimal Precision in Response

- API returns:
  - `benefitsCost`: 76.92308
  - `net`: 1923.0769

**Note:**
- Values are not rounded to 2 decimals
- Likely acceptable if UI handles rounding

---

### Read-only Fields Properly Ignored

- Sending `gross` manually does not override server calculation
- API correctly recalculates values

**Note:**
- Correct behavior
- Not a bug

---

