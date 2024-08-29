import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutComplete extends BasePage {
  readonly url: string = "https://www.saucedemo.com/checkout-complete.html";
  readonly checkMark: Locator;
  readonly header: Locator;
  readonly text: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkMark = page.locator('[data-test="pony-express"]');
    this.header = page.locator('[data-test="complete-header"]');
    this.text = page.locator('[data-test="complete-text"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }
}
