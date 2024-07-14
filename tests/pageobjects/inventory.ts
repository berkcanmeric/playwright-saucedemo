import { Locator, Page } from '@playwright/test';

export class Inventory {
  readonly page: Page;
  readonly url: string = 'https://www.saucedemo.com/inventory.html/';
  readonly itemNames: Locator;
  readonly itemDescriptions: Locator;
  readonly itemPrices: Locator;
  readonly itemAddToCartButtons: Locator;
  readonly itemRemoveFromCartButtons: Locator;
  readonly shoppingCartItemCount: Locator;
  readonly filter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemNames = page.locator('.inventory_item_name');
    this.itemDescriptions = page.locator('.inventory_item_desc');
    this.itemPrices = page.locator('.inventory_item_price');
    this.itemAddToCartButtons = page.getByRole('button', {
      name: 'Add to cart',
    });
    this.itemRemoveFromCartButtons = page.getByRole('button', {
      name: 'Remove',
    });
    this.shoppingCartItemCount = page.locator('.shopping_cart_badge');
    this.filter = page.locator('[data-test="product-sort-container"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  // Helper method to sanitize item name
  private sanitizeItemName(name: string): string {
    return name.replace(/\s+/g, '-').toLowerCase();
  }

  // Dynamic locator for buttons based on item name
  private getButtonLocatorByName(
    action: 'add-to-cart' | 'remove',
    name: string
  ): Locator {
    const sanitizedName = this.sanitizeItemName(name);
    return this.page.locator(`[data-test="${action}-${sanitizedName}"]`);
  }

  // Add item to cart by index
  async addItemToCartByIndex(index: number) {
    await this.itemAddToCartButtons.nth(index).click();
  }

  // Add item to cart by name
  async addItemToCartByName(name: string) {
    await this.getButtonLocatorByName('add-to-cart', name).click();
  }

  // Remove item from cart by index
  async removeItemFromCartByIndex(index: number) {
    await this.itemRemoveFromCartButtons.nth(index).click();
  }

  // Remove item from cart by name
  async removeItemFromCartByName(name: string) {
    await this.getButtonLocatorByName('remove', name).click();
  }

  // Additional dynamic locators for various elements
  itemImage(image: string): Locator {
    return this.page.getByAltText(image);
  }

  itemName(name: string): Locator {
    return this.page.getByText(name);
  }

  itemDescription(desc: string): Locator {
    return this.page.getByText(desc);
  }

  itemPrice(price: string): Locator {
    return this.page.getByText(price);
  }
}
