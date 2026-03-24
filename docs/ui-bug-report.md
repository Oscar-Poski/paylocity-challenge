# UI Bug Report

## BUG-UI-001
Title: Login with invalid username returns HTTP 405 instead of user-friendly error

Severity: High  
Priority: High  
Area: Authentication / Login  

Preconditions:
- User is on login page

Steps to Reproduce:
1. Enter an invalid username
2. Enter any password
3. Submit login form

Actual Result:
Application returns "HTTP ERROR 405"

Expected Result:
Application should display a clear, user-friendly error message indicating invalid credentials

---

## BUG-UI-002
Title: Benefits Dashboard accessible without authentication

Severity: Critical  
Priority: High  
Area: Security / Access Control  

Steps to Reproduce:
1. Open browser
2. Navigate directly to /Prod/Benefits

Actual Result:
Benefits Dashboard loads without login

Expected Result:
User should be redirected to login page or blocked


---

## BUG-UI-003
Title: User remains authenticated after logout when using browser back button

Severity: Critical  
Priority: High  
Area: Authentication / Session Management  

Steps to Reproduce:
1. Login successfully
2. Logout
3. Click browser back button

Actual Result:
Dashboard is displayed and user appears logged in

Expected Result:
User should remain logged out and be redirected to login page


---

## BUG-UI-004
Title: First and Last Name columns are reversed in employee table

Severity: High  
Priority: High  
Area: Benefits Dashboard / Employee Table  

Steps to Reproduce:
1. Add employee with:
   - First Name: Oscar
   - Last Name: Rivera
2. Observe table

Actual Result:
First name appears under "Last Name" column and vice versa

Expected Result:
Each value should appear under the correct column


---

## BUG-UI-005
Title: Dependants field accepts decimal values and truncates them

Severity: Medium  
Priority: Medium  
Area: Add/Edit Employee  

Steps to Reproduce:
1. Open Add Employee modal
2. Enter dependants = 1.5
3. Save employee

Actual Result:
Value is accepted and truncated to 1

Expected Result:
Application should reject non-integer values and show validation error


---

## BUG-UI-006
Title: Dependants field accepts alphanumeric values and parses partial integer

Severity: Medium  
Priority: Medium  
Area: Add/Edit Employee  

Steps to Reproduce:
1. Open Add Employee modal
2. Enter dependants = "2abc" or "2f5f"
3. Save employee

Actual Result:
Application accepts input and parses value as 2

Expected Result:
Application should reject invalid numeric input and display validation message


---

## BUG-UI-007
Title: Special characters allowed in first name without validation

Severity: Low  
Priority: Low  
Area: Add/Edit Employee  

Steps to Reproduce:
1. Open Add Employee modal
2. Enter first name = "ó!&%$"
3. Save

Actual Result:
Employee is created successfully

Expected Result:
Application should validate input format or restrict invalid characters (depending on requirements)

Notes:
Might be acceptable depending on business rules, but worth clarifying


---

## BUG-UI-008
Title: Numeric values allowed in first name field

Severity: Low  
Priority: Low  
Area: Add/Edit Employee  

Steps to Reproduce:
1. Enter first name = "12"
2. Save employee

Actual Result:
Employee is created successfully

Expected Result:
First name should likely be restricted to alphabetic characters


---

## BUG-UI-009
Title: One-character names allowed without validation

Severity: Low  
Priority: Low  
Area: Add/Edit Employee  

Steps to Reproduce:
1. Enter first name = "A"
2. Enter last name = "B"
3. Save

Actual Result:
Employee is created successfully

Expected Result:
Minimum length validation may be required (business dependent)


---

## BUG-UI-010
Title: Table layout breaks with long names (UI overflow issue)

Severity: Medium  
Priority: Low  
Area: Benefits Dashboard / Table Layout  

Steps to Reproduce:
1. Create employee with 50-character first and last names
2. Observe table layout

Actual Result:
Table width exceeds container and breaks layout, showing visual split/misalignment

Expected Result:
Table should remain responsive and handle long content (truncate, wrap, or scroll)


---

## BUG-UI-011
Title: Duplicate employees can be created without restriction

Severity: Low  
Priority: Low  
Area: Add Employee  

Steps to Reproduce:
1. Create employee with specific name and dependants
2. Repeat same creation
3. Create employees with same names but different dependants

Actual Result:
All records are created without restriction

Expected Result:
System may require duplicate prevention or warning (depends on business rules)

Notes:
Could be valid behavior as employees are not uniquely identified by name