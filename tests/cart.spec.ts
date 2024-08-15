import { test, expect, Locator } from "@playwright/test";
import { Inventory } from "./pageobjects/Inventory";
import { Cart } from "./pageobjects/Cart";

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
    test("should verify cart contents after adding and removing items", async ({}) => {
      // Add items to cart
      await inventory.addItemToCartByName("Sauce Labs Bike Light");
      await inventory.addItemToCartByName("Sauce Labs Bolt T-Shirt");

      // Navigate to cart
      await cart.goToCart();
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

    test("should navigate to inventory page when 'Continue Shopping' is clicked", async ({
      page,
    }) => {
      await cart.goToCart();
      await cart.continueShopping();
      expect(page.url()).toBe(inventory.url);
    });

    test("should navigate to checkout page when 'Checkout' is clicked", async ({
      page,
    }) => {
      await inventory.addItemToCartByName("Sauce Labs Bike Light");
      await cart.goToCart();
      await cart.goToCheckout();
      expect(page.url()).toContain("/checkout-step-one.html");
    });
  });
});
