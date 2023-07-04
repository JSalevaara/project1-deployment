const { test, expect } = require("@playwright/test");

test("Lists page has expected title and headings.", async ({ page }) => {
  await page.goto("/lists")
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText("Shopping lists!")
  await expect(page.locator("h2")).toHaveText("Add shopping list")
  await expect(page.locator("h3")).toHaveText("Current shopping lists")
})

test("Can create shopping lists", async ({ page }) => {
  await page.goto("/lists")
  await page.locator("input[type=text]").type("List for test")
  await page.click("text=Add list!")
  await expect(page.getByTestId('list')).toHaveText("List for test")
})

test("Can add items to a shopping list", async ({ page }) => {
  await page.goto("/lists/1")
  const itemName = "apples"
  await page.locator("input[type=text]").type(itemName)
  await page.locator("input[type=submit]").click()
  await expect(page.locator("li")).toHaveText(itemName)
})

test("Can label items collected", async ({ page }) => {
  await page.goto("/lists/1")
  await page.click("text=Mark collected!")
  await expect(page.locator("del")).toHaveText("apples")
})

test("Can deactivate lists", async ({ page }) => {
  await page.goto("/lists")
  await page.click("text=Deactivate list!")
  await expect(page.locator("ul")).toBeEmpty()
})