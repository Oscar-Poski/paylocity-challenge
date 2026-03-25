import { expect, type Page } from '@playwright/test';

import { getUiCredentials, getUiUrl } from '../../helpers/env';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(getUiUrl());
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('#Username')).toBeVisible();
    await expect(this.page.locator('#Password')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Log In' })).toBeVisible();
  }

  async login(): Promise<void> {
    const credentials = getUiCredentials();

    await this.goto();
    await this.expectLoaded();
    await this.page.locator('#Username').fill(credentials.username);
    await this.page.locator('#Password').fill(credentials.password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }
}
