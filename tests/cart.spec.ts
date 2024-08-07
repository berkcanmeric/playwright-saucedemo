import { test, expect, Locator } from "@playwright/test";
import { Inventory } from "./pageobjects/inventory";
import { Cart } from "./pageobjects/cart";

let inventory: Inventory;
let cart: Cart;

test.beforeEach(async ({ page }) => {
  inventory = new Inventory(page);
  cart = new Cart(page);
  await inventory.goto();
  expect(page.url()).toBe(inventory.url);
});

test.describe("Inventory Page Tests", () => {
  test.describe("Functionality Tests", () => {
    test("should verify cart contents after adding and removing items", async ({
      page,
    }) => {
      // Add items to cart
      await inventory.addItemToCartByName("Sauce Labs Bike Light");
      await inventory.addItemToCartByName("Sauce Labs Bolt T-Shirt");

      // Navigate to cart
      await page.click(".shopping_cart_link");

      // Verify items in cart
      await expect(cart.itemName("Sauce Labs Bike Light")).toBeVisible();
      await expect(cart.itemName("Sauce Labs Bolt T-Shirt")).toBeVisible();
      await expect(cart.shoppingCartItemCount).toHaveText("2");

      // Remove items from cart
      await cart.removeItemFromCartByName("Sauce Labs Bike Light");
      await cart.removeItemFromCartByName("Sauce Labs Bolt T-Shirt");

      // Verify cart is empty
      await expect(cart.shoppingCartItemCount).not.toBeVisible();
    });
  });
});
