import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepTwo extends BasePage {
  readonly url: string = "https://www.saucedemo.com/checkout-step-two.html";
  readonly title: Locator;
  readonly quantityLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly paymentInfoLabel: Locator;
  readonly paymentValueLabel: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingValueLabel: Locator;
  readonly priceTotalLabel: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.quantityLabel = page.locator('[data-test="cart-quantity-label"]');
    this.descriptionLabel = page.locator('[data-test="cart-desc-label"]');
    this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
    this.paymentValueLabel = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
    this.shippingValueLabel = page.locator('[data-test="shipping-info-value"]');
    this.priceTotalLabel = page.locator('[data-test="total-info-label"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }
}
