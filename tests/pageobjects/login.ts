import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Login extends BasePage {
  readonly url: string = "https://www.saucedemo.com/";
  readonly username: Locator;
  readonly password: Locator;
  readonly login: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.login = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async signIn(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }
}
