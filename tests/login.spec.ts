import { test, expect } from '@playwright/test';
import { Login } from "./pageobjects/Login";

let login: Login;

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  login = new Login(page);
  await login.goto();
  expect(page.url()).toBe(login.url);
});

test.describe('Login Page Tests', () => {
  test('should login successfully with valid credentials', async () => {
    await login.signIn('standard_user', 'secret_sauce');
  });

  test('should display error message for invalid credentials', async () => {
    await login.signIn('incorrect_user', 'incorrect_password');

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('should display required field error messages', async () => {
    await login.username.fill('');
    await login.password.fill('');
    await login.login.click();

    await expect(login.errorMessage).toContainText(
      'Epic sadface: Username is required'
    );

    await login.username.fill('standard_user');
    await login.login.click();

    await expect(login.errorMessage).toContainText(
      'Epic sadface: Password is required'
    );
  });
});
