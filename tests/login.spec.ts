import {  test, expect } from '@playwright/test';

test.describe('Login HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://app-financas-olssistemas.flutterflow.app/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('flutter-view')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'carlosrrocha08@gmail.com');
    await page.fill('input[type="password"]', 'carlos123');
    await page.click('input[class="submitBtn"]');
    
    await expect(page).toHaveURL('https://app-financas-olssistemas.flutterflow.app/homePage');
    await expect(page.locator('flutter-view')).toHaveText('Seja Bem-Vindo, Carlos Rocha');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'invaliduser');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('flutter-view')).toHaveText('Error: Invalid login credentials');
  });
});