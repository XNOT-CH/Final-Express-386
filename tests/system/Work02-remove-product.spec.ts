import { test, expect } from '@playwright/test';

test('Work02: User ลบสินค้าออกจากตะกร้าที่หน้า Inventory ได้', async ({ page }) => {

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

    .locator('[data-test="add-to-cart-sauce-labs-onesie"]')

    .click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // ปุ่มต้องเปลี่ยนเป็น Remove

  await expect(page.locator('[data-test="remove-sauce-labs-onesie"]'))

    .toBeVisible();

  // =====================================================

  // Remove Product (หน้า Inventory)

  // =====================================================

  await page

    .locator('[data-test="remove-sauce-labs-onesie"]')

    .click();

  // =====================================================

  // Verify Result

  // =====================================================

  // Badge ต้องหายไป

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

  // ปุ่มต้องกลับเป็น Add to cart

  await expect(page.locator('[data-test="add-to-cart-sauce-labs-onesie"]'))

    .toBeVisible();

  // ตะกร้าต้องว่าง

  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  await expect(page.locator('.cart_item')).toHaveCount(0);

});
