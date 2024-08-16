import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepOne extends BasePage {
  readonly url: string = "https://www.saucedemo.com/checkout-step-one.html";
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly zip: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstname = page.getByPlaceholder("First Name");
    this.lastname = page.getByPlaceholder("Last Name");
    this.zip = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillForm(firstname: string, lastname: string, zip: string) {
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.zip.fill(zip);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}
