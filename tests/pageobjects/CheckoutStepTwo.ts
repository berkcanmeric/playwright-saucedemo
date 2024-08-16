import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepTwo extends BasePage {
  readonly url: string = "https://www.saucedemo.com/checkout-step-two.html";

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }
}
