import { test, expect, Locator } from '@playwright/test';
import { Inventory } from './pageobjects/inventory';

let inventory: Inventory;

test.beforeEach(async ({ page }) => {
  inventory = new Inventory(page);
  await inventory.goto();
  expect(page.url()).toBe(inventory.url);
});

const checkVisibility = async (locator: Locator, count: number) => {
  for (let i = 0; i < count; i++) {
    await expect(locator.nth(i)).toBeVisible();
  }
};

const getItemDetails = async (locator: Locator, count: number) => {
  let details = [];
  for (let i = 0; i < count; i++) {
    const detail = await locator.nth(i).innerText();
    details.push(detail);
  }
  return details;
};

const sortAndVerify = async (
  inventory: Inventory,
  sortOption: string,
  locator: Locator,
  comparator: (a: string, b: string) => number
) => {
  await inventory.filter.selectOption(sortOption);

  const totalItems: number = await locator.count();
  const items = await getItemDetails(locator, totalItems);

  const sortedItems = [...items].sort(comparator);
  expect(items).toEqual(sortedItems);
};

test.describe('Inventory Page Tests', () => {
  test.describe('General UI Tests', () => {
    test('should verify inventory item display', async () => {
      const totalItems: number = await inventory.itemNames.count();

      await expect(inventory.itemNames).toHaveCount(totalItems);
      await expect(inventory.itemDescriptions).toHaveCount(totalItems);
      await expect(inventory.itemPrices).toHaveCount(totalItems);
      await expect(inventory.itemAddToCartButtons).toHaveCount(totalItems);

      await checkVisibility(inventory.itemNames, totalItems);
      await checkVisibility(inventory.itemDescriptions, totalItems);
      await checkVisibility(inventory.itemPrices, totalItems);
      await checkVisibility(inventory.itemAddToCartButtons, totalItems);

      for (let i = 0; i < totalItems; i++) {
        const name = await inventory.itemNames.nth(i).innerText();
        await expect(inventory.itemImage(name)).toBeVisible();
      }
    });
  });
  test.describe('Functionality Tests', () => {
    test('should verify inventory item sorting by name', async () => {
      await sortAndVerify(inventory, 'az', inventory.itemNames, (a, b) =>
        a.localeCompare(b)
      );
      await sortAndVerify(inventory, 'za', inventory.itemNames, (a, b) =>
        b.localeCompare(a)
      );
    });

    test('should verify inventory item sorting by price', async () => {
      await sortAndVerify(
        inventory,
        'lohi',
        inventory.itemPrices,
        (a, b) => parseFloat(a) - parseFloat(b)
      );
      await sortAndVerify(
        inventory,
        'hilo',
        inventory.itemPrices,
        (a, b) => parseFloat(b) - parseFloat(a)
      );
    });

    test('should verify "Add to Cart" functionality', async () => {
      //add single item to cart
      await inventory.addItemToCartByIndex(0);
      await expect(inventory.itemRemoveFromCartButtons).toHaveCount(1);
      await expect(inventory.shoppingCartItemCount).toHaveText('1');

      //remove single item from cart
      await inventory.removeItemFromCartByIndex(0);
      await expect(inventory.itemAddToCartButtons).toHaveCount(6);
      await expect(inventory.shoppingCartItemCount).not.toBeVisible();
    });
  });
});
