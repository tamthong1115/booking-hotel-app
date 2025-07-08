import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    // get sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=notification]").fill("1@test.com");
    await page.locator("[name=password]").fill("Password!1");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to search for hotels", async ({ page }) => {
    await page.goto(`${UI_URL}`);

    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
    await expect(page.getByRole("link", { name: "Dublin Getaways" }).first()).toBeVisible();
});


test("should show hotel detail", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    await page.getByRole("button", { name: "Search" }).click();

    await page.getByRole("link", { name: "Dublin Getaways" }).first().click();

    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();

});


test("should book hotel", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Dublin");

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);

    await page.getByRole("button", { name: "Search" }).click();

    await page.getByRole("link", { name: "Dublin Getaways" }).first().click();

    await page.getByRole("button", { name: "Book Now" }).click();

    await expect(page.getByText("Your Booking Detail")).toBeVisible();
});