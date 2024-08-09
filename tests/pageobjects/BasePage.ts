import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.shoppingCartItemCount = page.locator(".shopping_cart_badge");
  }
  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
