import { test, expect } from '@playwright/test';
import { Inventory } from './pageobjects/inventory';

let inventory: Inventory;

test.beforeEach(async ({ page }) => {
  inventory = new Inventory(page);
  await inventory.goto();
  expect(page.url()).toBe(inventory.url);
});

test.describe.configure({ mode: 'parallel' });

test.describe('Inventory Page Tests', () => {
  test('should verify inventory item display', async () => {
    let totalItems: number = await inventory.itemNames.count();
    expect(totalItems).toBeGreaterThan(0);

    await expect(inventory.itemNames).toHaveCount(totalItems);
    await expect(inventory.itemDescriptions).toHaveCount(totalItems);
    await expect(inventory.itemPrices).toHaveCount(totalItems);
    await expect(inventory.itemAddToCartButtons).toHaveCount(totalItems);

    await expect(inventory.itemNames).toBeVisible();
    await expect(inventory.itemDescriptions).toBeVisible();
    await expect(inventory.itemPrices).toBeVisible();
    await expect(inventory.itemAddToCartButtons).toBeVisible();

    const arrayOfLocators = inventory.itemNames;
    const elementsCount = await arrayOfLocators.count();

    for (var index = 0; index < elementsCount; index++) {
      const element = arrayOfLocators.nth(index);
      const innerText = await element.innerText();
      await expect(inventory.itemImage(innerText)).toBeVisible();
    }
  });
});
