import { test, expect } from "@playwright/test";

// const UI_URL = "http://localhost:5173";

test("allow user to sign in", async ({ page }) => {
    // await page.goto(UI_URL);
    // redirect to base url
    await page.goto("/");

    // get sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=notification]").fill("test@test.com");
    await page.locator("[name=password]").fill("Password!1");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in Successful!")).toBeVisible();
    await page.click("button#basic-button");
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Admin Hotels" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Sign Out" })).toBeVisible();
});

test("allow user to register", async ({ page }) => {
    const testEmail = `test_register_${
        Math.floor(Math.random() * 900000) + 100000
    }@test.com`;

    // await page.goto(UI_URL);
    await page.goto("/");

    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Register" }).nth(1).click();
    await expect(
        page.getByRole("heading", { name: "Create an Account" }),
    ).toBeVisible();

    await page.locator("[name=firstName]").fill("testFirstName");
    await page.locator("[name=lastName]").fill("testLastName");
    await page.locator("[name=notification]").fill(testEmail);
    await page.locator("[name=password]").fill("Password123!");
    await page.locator("[name=confirmPassword]").fill("Password123!");

    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.getByText("Registration Successful! Check your notification to verify notification")).toBeVisible();
    // await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
    // await page.click('button#basic-button');
    // await expect(page.getByRole('menuitem', {name: 'Sign Out'})).toBeVisible();
});
