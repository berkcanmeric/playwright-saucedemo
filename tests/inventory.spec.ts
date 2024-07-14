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
  const details = [];
  for (let i = 0; i < count; i++) {
    details.push(await locator.nth(i).innerText());
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
  const totalItems = await locator.count();
  const items = await getItemDetails(locator, totalItems);
  const sortedItems = [...items].sort(comparator);
  expect(items).toEqual(sortedItems);
};

test.describe('Inventory Page Tests', () => {
  test.describe('General UI Tests', () => {
    test('should verify inventory item display', async () => {
      const totalItems = await inventory.itemNames.count();

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

    test('should verify "Add to Cart" and "Remove from Cart" functionalities', async () => {
      // Add single item to cart
      await inventory.addItemToCartByIndex(0);
      await expect(inventory.itemRemoveFromCartButtons).toHaveCount(1);
      await expect(inventory.shoppingCartItemCount).toHaveText('1');

      // Remove single item from cart
      await inventory.removeItemFromCartByIndex(0);
      await expect(inventory.itemAddToCartButtons).toHaveCount(6);
      await expect(inventory.shoppingCartItemCount).not.toBeVisible();

      // Add multiple items to cart
      await inventory.addItemToCartByName('Sauce Labs Bike Light');
      await inventory.addItemToCartByName('Sauce Labs Bolt T-Shirt');
      await inventory.addItemToCartByName('Sauce Labs Fleece Jacket');
      await expect(inventory.itemRemoveFromCartButtons).toHaveCount(3);
      await expect(inventory.shoppingCartItemCount).toHaveText('3');

      // Remove multiple items from cart
      await inventory.removeItemFromCartByName('Sauce Labs Bike Light');
      await inventory.removeItemFromCartByName('Sauce Labs Bolt T-Shirt');
      await inventory.removeItemFromCartByName('Sauce Labs Fleece Jacket');
      await expect(inventory.itemAddToCartButtons).toHaveCount(6);
      await expect(inventory.shoppingCartItemCount).not.toBeVisible();
    });
    test.describe('Edge Case Tests', () => {
      test('should verify "Add to Cart" and "Remove from Cart" functionalities for all items', async () => {
        const totalItems = await inventory.itemAddToCartButtons.count();

        for (let i = 0; i < totalItems; i++) {
          await inventory.itemAddToCartButtons.nth(0).click();
        }

        await expect(inventory.itemRemoveFromCartButtons).toHaveCount(
          totalItems
        );
        await expect(inventory.shoppingCartItemCount).toHaveText(
          totalItems.toString()
        );

        for (let i = 0; i < totalItems; i++) {
          await inventory.itemRemoveFromCartButtons.nth(0).click();
        }

        await expect(inventory.itemAddToCartButtons).toHaveCount(totalItems);
        await expect(inventory.shoppingCartItemCount).not.toBeVisible();
      });

      test('should verify Empty Cart functionality', async () => {
        // await expect(inventory.shoppingCartItemCount).not.toBeVisible();
      });
    });
  });
});
