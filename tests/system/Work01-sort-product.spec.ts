import { test, expect } from "@playwright/test";

test("ST-05: Sort Product by price low to high", async ({ page }) => {
    // Login
    await page.goto("/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await expect(page).toHaveURL(/inventory\.html/);

    // Select Price (low to high)
    await page
        .locator('[data-test="product-sort-container"]')
        .selectOption("lohi");

    // Verify displayed prices are in ascending order
    const prices = await page
        .locator(".inventory_item_price")
        .evaluateAll((elements) =>
            elements.map((element) => Number(element.textContent?.replace("$", ""))),
        );
    const sortedPrices = [...prices].sort(
        (firstPrice, secondPrice) => firstPrice - secondPrice,
    );

    expect(prices).toEqual(sortedPrices);
});
