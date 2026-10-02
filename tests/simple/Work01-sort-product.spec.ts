import { test, expect } from '@playwright/test';

test('Work01: เรียงสินค้าตามราคาจากน้อยไปมาก', async ({ page }) => {

  // Login

  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Sort: Price (low to high)

  await page

    .locator('[data-test="product-sort-container"]')

    .selectOption('lohi');

  // Assert: ราคาต้องเรียงจากน้อยไปมาก

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();

  const prices = priceTexts.map((text) => Number(text.replace('$', '')));

  expect(prices).toEqual([...prices].sort((a, b) => a - b));

});
