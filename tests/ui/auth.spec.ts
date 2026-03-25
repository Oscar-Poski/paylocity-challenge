import { test } from '@playwright/test';

import { BenefitsDashboardPage } from './pages/benefits-dashboard-page';
import { LoginPage } from './pages/login-page';

test.describe('Benefits Dashboard authentication', () => {
  test('successful login loads the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const benefitsDashboardPage = new BenefitsDashboardPage(page);

    await loginPage.login();
    await benefitsDashboardPage.expectLoaded();
  });
});
