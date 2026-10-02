import { test, expect } from "@playwright/test";

test("Work02: Remove Product ก่อน Checkout", async ({ page }) => {
	// Login
	await page.goto("/");
	await page.locator("#user-name").fill("standard_user");
	await page.locator("#password").fill("secret_sauce");
	await page.locator("#login-button").click();
	await expect(page).toHaveURL(/inventory\.html/);

	// Add 2 Products
	await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
	await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
	await expect(page.locator(".shopping_cart_badge")).toHaveText("2");

	// Open Cart and remove 1 Product
	await page.locator(".shopping_cart_link").click();
	await expect(page).toHaveURL(/cart\.html/);
	await expect(page.locator(".cart_item")).toHaveCount(2);

	await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
	await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
	await expect(page.locator(".cart_item")).toHaveCount(1);

	// Checkout
	await page.locator('[data-test="checkout"]').click();
	await expect(page).toHaveURL(/checkout-step-one\.html/);
	await page.locator('[data-test="firstName"]').fill("John");
	await page.locator('[data-test="lastName"]').fill("Doe");
	await page.locator('[data-test="postalCode"]').fill("50000");
	await page.locator('[data-test="continue"]').click();

	// Verify Overview contains only 1 Product
	await expect(page).toHaveURL(/checkout-step-two\.html/);
	await expect(page.locator(".cart_item")).toHaveCount(1);
	await expect(page.locator(".inventory_item_name")).toHaveText(
		"Sauce Labs Backpack",
	);
});
