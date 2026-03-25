# Paylocity Bug and Automation Challenge

This repository contains a single Playwright + TypeScript project for both API and UI automation against the Paylocity Benefits Dashboard.

## Initial Structure

```text
.
├── docs/
├── tests/
│   ├── api/
│   │   ├── employees.contract.spec.ts
│   │   └── employees.validation.spec.ts
│   ├── helpers/
│   │   ├── calculations.ts
│   │   ├── employee-assertions.ts
│   │   ├── employee-factory.ts
│   │   ├── employee-service.ts
│   │   ├── env.ts
│   │   └── types.ts
│   └── ui/
│       ├── auth.spec.ts
│       ├── employees.spec.ts
│       └── pages/
│           ├── benefits-dashboard-page.ts
│           └── login-page.ts
├── .env.example
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Prerequisites

- Node.js 18+
- Valid challenge credentials and API auth token

## Environment Variables

- `PAYLOCITY_BASE_URL`: API base URL including `/Prod`
- `PAYLOCITY_UI_URL`: login page URL
- `AUTH_API_PAYLOCITY`: raw auth token value used as `Authorization: Basic <token>`
- `PAYLOCITY_USERNAME`: UI login username
- `PAYLOCITY_PASSWORD`: UI login password

If `AUTH_API_PAYLOCITY` already includes the `Basic ` prefix, the helper keeps it as-is.

## Install

```bash
npm install
npx playwright install
```

## Run

```bash
npm run test:api
npm run test:ui
npm test
```

