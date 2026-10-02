import { test, expect } from '@playwright/test';

test('Work03: Checkout ไม่ผ่านเมื่อไม่กรอก Postal Code', async ({ page }) => {

  // =====================================================

  // Login

  // =====================================================

  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // =====================================================

  // Add Product

  // =====================================================

  await page

    .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')

    .click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // =====================================================

  // Cart -> Checkout

  // =====================================================

  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  await page.locator('[data-test="checkout"]').click();

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // =====================================================

  // กรอก First Name และ Last Name แต่ไม่กรอก Postal Code

  // =====================================================

  await page.locator('#first-name').fill('John');

  await page.locator('#last-name').fill('Doe');

  await page.locator('[data-test="continue"]').click();

  // =====================================================

  // Validation Result

  // =====================================================

  await expect(page.locator('[data-test="error"]'))

    .toHaveText('Error: Postal Code is required');

  // ต้องยังอยู่หน้า Checkout Step One

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // ข้อมูลที่กรอกไว้ต้องยังอยู่

  await expect(page.locator('#first-name')).toHaveValue('John');

  await expect(page.locator('#last-name')).toHaveValue('Doe');

});
