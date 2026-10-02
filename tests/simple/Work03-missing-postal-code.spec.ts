import { test, expect } from '@playwright/test';

test('Work03: Checkout ไม่ผ่านเมื่อไม่กรอก Postal Code', async ({ page }) => {

  // Login

  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Add Product -> Cart -> Checkout

  await page

    .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')

    .click();

  await page.locator('.shopping_cart_link').click();

  await page.locator('[data-test="checkout"]').click();

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // กรอกชื่อ แต่ไม่กรอก Postal Code

  await page.locator('#first-name').fill('John');

  await page.locator('#last-name').fill('Doe');

  await page.locator('[data-test="continue"]').click();

  // Assert: ต้องแสดง Error

  await expect(page.locator('[data-test="error"]'))

    .toHaveText('Error: Postal Code is required');

});
