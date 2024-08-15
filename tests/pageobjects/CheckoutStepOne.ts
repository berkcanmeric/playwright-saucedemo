import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepOne extends BasePage {
  readonly url: string = "https://www.saucedemo.com/";
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly login: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstname = page.locator('[data-test="firstname"]');
    this.lastname = page.locator('[data-test="lastname"]');
    this.login = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async signIn(firstname: string, lastname: string) {
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.login.click();
  }
}
