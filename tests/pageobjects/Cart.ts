import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Cart extends BasePage {
  readonly url: string = "https://www.saucedemo.com/cart.html";
  readonly itemNames: Locator;
  readonly itemDescriptions: Locator;
  readonly itemPrices: Locator;
  readonly itemRemoveFromCartButtons: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.itemNames = page.locator(".inventory_item_name");
    this.itemDescriptions = page.locator(".inventory_item_desc");
    this.itemPrices = page.locator(".inventory_item_price");
    this.itemRemoveFromCartButtons = page.locator(".cart_button");
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }
  // Remove item from cart by name
  async removeItemFromCartByName(name: string) {
    await this.getButtonLocatorByName("remove", name).click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  // Helper method to sanitize item name
  private sanitizeItemName(name: string): string {
    return name.replace(/\s+/g, "-").toLowerCase();
  }
  // Dynamic locator for buttons based on item name
  private getButtonLocatorByName(
    action: "add-to-cart" | "remove",
    name: string
  ): Locator {
    const sanitizedName = this.sanitizeItemName(name);
    return this.page.locator(`[data-test="${action}-${sanitizedName}"]`);
  }

  itemName(name: string): Locator {
    return this.page.locator(".inventory_item_name").filter({ hasText: name });
  }

  itemDescription(desc: string): Locator {
    return this.page.locator(".inventory_item_desc").filter({ hasText: desc });
  }

  itemPrice(price: string): Locator {
    return this.page
      .locator(".inventory_item_price")
      .filter({ hasText: price });
  }
}
