import { test, expect } from '@playwright/test';

test('Work01: User เรียงสินค้าตามราคาและชื่อได้ถูกต้อง', async ({ page }) => {

  // =====================================================

  // Login

  // =====================================================

  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  await expect(page.locator('.inventory_item')).toHaveCount(6);

  // =====================================================

  // Sort: Price (low to high)

  // =====================================================

  await page

    .locator('[data-test="product-sort-container"]')

    .selectOption('lohi');

  await expect(page.locator('[data-test="active-option"]'))

    .toHaveText('Price (low to high)');

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();

  const prices = priceTexts.map((text) => Number(text.replace('$', '')));

  // ราคาต้องเรียงจากน้อยไปมาก

  expect(prices).toEqual([...prices].sort((a, b) => a - b));

  // =====================================================

  // Sort: Name (Z to A)

  // =====================================================

  await page

    .locator('[data-test="product-sort-container"]')

    .selectOption('za');

  await expect(page.locator('[data-test="active-option"]'))

    .toHaveText('Name (Z to A)');

  const names = await page.locator('.inventory_item_name').allTextContents();

  // ชื่อต้องเรียงจาก Z ไป A

  expect(names).toEqual([...names].sort().reverse());

  // จำนวนสินค้าต้องไม่เปลี่ยนหลังเรียง

  await expect(page.locator('.inventory_item')).toHaveCount(6);

});
