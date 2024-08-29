import { test, expect } from "@playwright/test";
import { Inventory } from "./pageobjects/Inventory";
import { Cart } from "./pageobjects/Cart";
import { CheckoutStepOne } from "./pageobjects/CheckoutStepOne";
import { CheckoutStepTwo } from "./pageobjects/CheckoutStepTwo";
import { CheckoutComplete } from "./pageobjects/CheckoutComplete";

// Define constants for static texts
const CHECKOUT_STEP_TWO_TITLE = "Checkout: Overview";
const QTY_LABEL_TEXT = "QTY";
const DESCRIPTION_LABEL_TEXT = "Description";
const PAYMENT_INFO_LABEL_TEXT = "Payment Information:";
const PAYMENT_VALUE_LABEL_TEXT = "SauceCard #31337";
const SHIPPING_INFO_LABEL_TEXT = "Shipping Information:";
const SHIPPING_VALUE_LABEL_TEXT = "Free Pony Express Delivery!";
const PRICE_TOTAL_LABEL_TEXT = "Price Total";
const ITEM_TOTAL_LABEL_TEXT = "Item total: $0";
const TAX_LABEL_TEXT = "Tax: $0.00";
const TOTAL_LABEL_TEXT = "Total: $0.00";
const CANCEL_BUTTON_TEXT = "Cancel";
const FINISH_BUTTON_TEXT = "Finish";
const THANK_YOU_HEADER_TEXT = "Thank you for your order!";
const ORDER_DISPATCH_TEXT =
  "Your order has been dispatched, and will arrive just as fast as the pony can get there!";

let inventory: Inventory;
let cart: Cart;
let checkoutStepOne: CheckoutStepOne;
let checkoutStepTwo: CheckoutStepTwo;
let checkoutComplete: CheckoutComplete;

test.beforeEach(async ({ page }) => {
  inventory = new Inventory(page);
  cart = new Cart(page);
  checkoutStepOne = new CheckoutStepOne(page);
  checkoutStepTwo = new CheckoutStepTwo(page);
  checkoutComplete = new CheckoutComplete(page);
});

test.describe("CheckoutStepTwo Page Tests", () => {
  test.describe("General UI Tests", () => {
    test("should verify checkout step two page elements", async ({ page }) => {
      await checkoutStepTwo.goto();
      expect(page.url()).toBe(checkoutStepTwo.url);

      await expect(checkoutStepTwo.title).toHaveText(CHECKOUT_STEP_TWO_TITLE);
      await expect(checkoutStepTwo.quantityLabel).toHaveText(QTY_LABEL_TEXT);
      await expect(checkoutStepTwo.descriptionLabel).toHaveText(
        DESCRIPTION_LABEL_TEXT
      );
      await expect(checkoutStepTwo.paymentInfoLabel).toHaveText(
        PAYMENT_INFO_LABEL_TEXT
      );
      await expect(checkoutStepTwo.paymentValueLabel).toHaveText(
        PAYMENT_VALUE_LABEL_TEXT
      );
      await expect(checkoutStepTwo.shippingInfoLabel).toHaveText(
        SHIPPING_INFO_LABEL_TEXT
      );
      await expect(checkoutStepTwo.shippingValueLabel).toHaveText(
        SHIPPING_VALUE_LABEL_TEXT
      );
      await expect(checkoutStepTwo.priceTotalLabel).toHaveText(
        PRICE_TOTAL_LABEL_TEXT
      );
      await expect(checkoutStepTwo.itemTotalLabel).toHaveText(
        ITEM_TOTAL_LABEL_TEXT
      );
      await expect(checkoutStepTwo.taxLabel).toHaveText(TAX_LABEL_TEXT);
      await expect(checkoutStepTwo.totalLabel).toHaveText(TOTAL_LABEL_TEXT);
      await expect(checkoutStepTwo.cancelButton).toHaveText(CANCEL_BUTTON_TEXT);
      await expect(checkoutStepTwo.finishButton).toHaveText(FINISH_BUTTON_TEXT);

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
      await inventory.goto();
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

      await expect(checkoutStepTwo.itemTotalLabel).toHaveText(
        "Item total: $25.98"
      );
      await expect(checkoutStepTwo.taxLabel).toHaveText("Tax: $2.08");
      await expect(checkoutStepTwo.totalLabel).toHaveText("Total: $28.06");

      await checkoutStepTwo.finishButton.click();
      expect(page.url()).toBe(checkoutComplete.url);

      await expect(checkoutComplete.checkMark).toBeVisible();
      await expect(checkoutComplete.header).toHaveText(THANK_YOU_HEADER_TEXT);
      await expect(checkoutComplete.text).toHaveText(ORDER_DISPATCH_TEXT);

      await checkoutComplete.backToProductsButton.click();
      expect(page.url()).toBe(inventory.url);
    });
  });
});
