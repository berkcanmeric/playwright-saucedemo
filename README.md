# Saucedemo E2E Testing with Playwright

This project contains end-to-end tests for the Saucedemo website using Playwright. The tests cover various functionalities such as adding items to the cart, removing items, and checking out.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/berkcanmeric/playwright-saucedemo.git
   cd playwright-saucedemo
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Usage

### Project Structure

- `tests/`: Contains the test files.
- `pages/`: Contains the page object models.
- `playwright.config.ts`: Playwright configuration file.

### Writing Tests

Create a new test file in the `tests/` directory. Use the page object models from the `pages/` directory to interact with the web pages.

Example test:

```typescript
import { test, expect } from "@playwright/test";
import { Cart } from "../pages/cart";

test("should add item to cart", async ({ page }) => {
  const cart = new Cart(page);
  await cart.goto();
  // Add your test steps here
});
```
