import { test, expect } from "@playwright/test";

test("Work03: Missing Postal Code", async ({ page }) => {
    // Login
    await page.goto("/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await expect(page).toHaveURL(/inventory\.html/);

    // Add Product
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    // Checkout
    await page.locator(".shopping_cart_link").click();
    await expect(page).toHaveURL(/cart\.html/);
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // เติมชื่อและนามสกุล แต่ไม่กรอกรหัสไปรษณีย์ แล้วกด Continue
    await page.locator('[data-test="firstName"]').fill("John");
    await page.locator('[data-test="lastName"]').fill("Doe");
    await page.locator('[data-test="continue"]').click();

    // Verify Postal Code validation
    await expect(page.locator('[data-test="error"]')).toContainText(
        "Postal Code is required",
    );
    await expect(page).toHaveURL(/checkout-step-one\.html/);
});
