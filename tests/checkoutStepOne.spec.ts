import { test, expect } from "@playwright/test";
import { Cart } from "./pageobjects/Cart";
import { CheckoutStepOne } from "./pageobjects/CheckoutStepOne";
import { CheckoutStepTwo } from "./pageobjects/CheckoutStepTwo";

let cart: Cart;
let checkoutStepOne: CheckoutStepOne;
let checkoutStepTwo: CheckoutStepTwo;

test.beforeEach(async ({ page }) => {
  cart = new Cart(page);
  checkoutStepOne = new CheckoutStepOne(page);
  checkoutStepTwo = new CheckoutStepTwo(page);
  await checkoutStepOne.goto();
  expect(page.url()).toBe(checkoutStepOne.url);
});

test.describe("CheckoutStepOne Page Tests", () => {
  test.describe("Functionality Tests", () => {
    test("should fill out form and navigate to checkout step two", async ({
      page,
    }) => {
      await checkoutStepOne.fillForm("John", "Doe", "12345");
      await checkoutStepOne.clickContinue();
      expect(page.url()).toContain(checkoutStepTwo.url);
    });

    const errorMessages = {
      firstName: "Error: First Name is required",
      lastName: "Error: Last Name is required",
      postalCode: "Error: Postal Code is required",
    };

    async function checkErrorMessage(
      checkoutStepOne: CheckoutStepOne,
      expectedMessage: string
    ) {
      await expect(checkoutStepOne.errorMessage).toBeVisible();
      await expect(checkoutStepOne.errorMessage).toHaveText(expectedMessage);
    }

    test("should show error messages for missing form fields", async ({}) => {
      await checkoutStepOne.clickContinue();
      await checkErrorMessage(checkoutStepOne, errorMessages.firstName);

      await checkoutStepOne.firstname.fill("John");
      await checkoutStepOne.clickContinue();
      await checkErrorMessage(checkoutStepOne, errorMessages.lastName);

      await checkoutStepOne.lastname.fill("Doe");
      await checkoutStepOne.clickContinue();
      await checkErrorMessage(checkoutStepOne, errorMessages.postalCode);
    });
    test("should cancel and navigate to cart page", async ({ page }) => {
      await checkoutStepOne.clickCancel();
      expect(page.url()).toBe(cart.url);
    });
  });
});
