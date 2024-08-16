import { test, expect } from "@playwright/test";
import { Inventory } from "./pageobjects/Inventory";
import { Cart } from "./pageobjects/Cart";
import { CheckoutStepOne } from "./pageobjects/CheckoutStepOne";
import { CheckoutStepTwo } from "./pageobjects/CheckoutStepTwo";

let inventory: Inventory;
let cart: Cart;
let checkoutStepOne: CheckoutStepOne;
let checkoutStepTwo: CheckoutStepTwo;

test.beforeEach(async ({ page }) => {
  inventory = new Inventory(page);
  cart = new Cart(page);
  checkoutStepOne = new CheckoutStepOne(page);
  checkoutStepTwo = new CheckoutStepTwo(page);
});

test.describe("CheckoutStepTwo Page Tests", () => {
  test.describe("General UI Tests", () => {
    test("should verify checkout step two page elements", async ({ page }) => {
      await checkoutStepTwo.goto();
      expect(page.url()).toBe(checkoutStepTwo.url);

      await expect(checkoutStepTwo.title).toHaveText("Checkout: Overview");
      await expect(checkoutStepTwo.quantityLabel).toHaveText("QTY");
      await expect(checkoutStepTwo.descriptionLabel).toHaveText("Description");
      await expect(checkoutStepTwo.paymentInfoLabel).toHaveText(
        "Payment Information:"
      );
      await expect(checkoutStepTwo.paymentValueLabel).toHaveText(
        "SauceCard #31337"
      );
      await expect(checkoutStepTwo.shippingInfoLabel).toHaveText(
        "Shipping Information:"
      );
      await expect(checkoutStepTwo.shippingValueLabel).toHaveText(
        "Free Pony Express Delivery!"
      );
      await expect(checkoutStepTwo.priceTotalLabel).toHaveText("Price Total");
      await expect(checkoutStepTwo.itemTotalLabel).toHaveText("Item total: $0");
      await expect(checkoutStepTwo.taxLabel).toHaveText("Tax: $0.00");
      await expect(checkoutStepTwo.totalLabel).toHaveText("Total: $0.00");
      await expect(checkoutStepTwo.cancelButton).toHaveText("Cancel");
      await expect(checkoutStepTwo.finishButton).toHaveText("Finish");

      await expect(checkoutStepTwo.title).toBeVisible();
      await expect(checkoutStepTwo.quantityLabel).toBeVisible();
      await expect(checkoutStepTwo.descriptionLabel).toBeVisible();
      await expect(checkoutStepTwo.paymentInfoLabel).toBeVisible();
      await expect(checkoutStepTwo.paymentValueLabel).toBeVisible();
      await expect(checkoutStepTwo.shippingInfoLabel).toBeVisible();
      await expect(checkoutStepTwo.shippingValueLabel).toBeVisible();
      await expect(checkoutStepTwo.priceTotalLabel).toBeVisible();
      await expect(checkoutStepTwo.itemTotalLabel).toBeVisible();
      await expect(checkoutStepTwo.taxLabel).toBeVisible();
      await expect(checkoutStepTwo.totalLabel).toBeVisible();
      await expect(checkoutStepTwo.cancelButton).toBeVisible();
      await expect(checkoutStepTwo.finishButton).toBeVisible();
    });
  });
  test.describe("Functionality Tests", () => {
    test("should fill out form and navigate to checkout complete", async ({
      page,
    }) => {
      await inventory.addItemToCartByName("Sauce Labs Bike Light");
      await inventory.addItemToCartByName("Sauce Labs Bolt T-Shirt");

      await cart.goToCart();
      // Verify items in cart
      await expect(cart.itemName("Sauce Labs Bike Light")).toBeVisible();
      await expect(cart.itemName("Sauce Labs Bolt T-Shirt")).toBeVisible();
      await expect(cart.shoppingCartItemCount).toHaveText("2");

      await cart.goToCheckout();
      expect(page.url()).toContain(checkoutStepOne.url);

      await checkoutStepOne.fillForm("John", "Doe", "12345");
      await checkoutStepOne.clickContinue();
      expect(page.url()).toContain(checkoutStepTwo.url);

      //TODO: continue from here
    });
  });
});
