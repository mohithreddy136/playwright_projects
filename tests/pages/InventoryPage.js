export class InventoryPage {
  // /**
  //  * @param {import('@playwright/test').Page} page - Playwright page object
  //  */
  constructor(page) {
    this.page = page;

    // Locator using a **class selector** for the page title
    this.pageTitle = page.locator('.title');

    // Locator using a **class selector** for all inventory items
    this.inventoryItems = page.locator('.inventory_item');

    // Locator using an **ID selector** for the cart icon/link
    this.cartLink = page.locator('#shopping_cart_container');

    // Locator using a **role selector** for the sorting dropdown
    this.sortDropdown = page.getByRole('combobox');

    // Locator using a **CSS attribute selector** for item prices
    this.itemPrices = page.locator('div.inventory_item_price');

    // Locator using a **class selector** for item names
    this.itemNames = page.locator('.inventory_item_name');
  }

  // /**
  //  * Verifies that the inventory page is loaded.
  //  */
  async verifyOnInventoryPage() {
    await this.page.waitForURL(/inventory.html/, { timeout: 5000 });
    await this.pageTitle.waitFor({ timeout: 5000 });
  }

  // /**
  //  * Adds a specific item to the cart by its name.
  //  * @param {string} itemName
  //  */
  async addItemToCart(itemName) {
    const itemLocator = this.page.locator(`.inventory_item:has-text("${itemName}") button`);
    await itemLocator.waitFor({ timeout: 5000 });
    await itemLocator.click();
  }

  // /**
  //  * Navigates to the cart page.
  //  */
  async goToCart() {
    await this.cartLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.cartLink.click();
  }

  // /**
  //  * Sorts items by price (Low to High) and verifies sorting.
  //  * @returns {{ numericPrices: number[], isSorted: boolean }}
  //  */
  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
    await this.page.waitForTimeout(1000);

    const prices = await this.itemPrices.allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    return {
      numericPrices,
      isSorted: JSON.stringify(numericPrices) === JSON.stringify(sortedPrices)
    };
  }

  // /**
  //  * Sorts items by price (High to Low) and verifies sorting.
  //  * @returns {{ numericPrices: number[], isSorted: boolean }}
  //  */
  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption('hilo');
    await this.page.waitForTimeout(1000);

    const prices = await this.itemPrices.allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);

    return {
      numericPrices,
      isSorted: JSON.stringify(numericPrices) === JSON.stringify(sortedPrices)
    };
  }

  // /**
  //  * Sorts items by name (A to Z) and verifies sorting.
  //  * @returns {{ names: string[], isSorted: boolean }}
  //  */
  async sortByNameAToZ() {
    await this.sortDropdown.selectOption('az');
    await this.page.waitForTimeout(1000);

    const names = await this.itemNames.allTextContents();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    return {
      names,
      isSorted: JSON.stringify(names) === JSON.stringify(sortedNames)
    };
  }

  // /**
  //  * Sorts items by name (Z to A) and verifies sorting.
  //  * @returns {{ names: string[], isSorted: boolean }}
  //  */
  async sortByNameZToA() {
    await this.sortDropdown.selectOption('za');
    await this.page.waitForTimeout(1000);

    const names = await this.itemNames.allTextContents();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

    return {
      names,
      isSorted: JSON.stringify(names) === JSON.stringify(sortedNames)
    };
  }
}
