import { test, expect } from '@playwright/test';

test('Work02: ลบสินค้าออกจากตะกร้าได้', async ({ page }) => {

  // Login

  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Add Product

  await page

    .locator('[data-test="add-to-cart-sauce-labs-onesie"]')

    .click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Remove Product

  await page

    .locator('[data-test="remove-sauce-labs-onesie"]')

    .click();

  // Assert: Badge ต้องหายไป

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

});
