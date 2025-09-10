export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.getByRole('combobox');   // sorting dropdown
    this.itemPrices = page.locator('.inventory_item_price'); // product prices
    this.itemNames = page.locator('.inventory_item_name');   // product names
  }
 
  // ✅ Verify inventory page is loaded
  async verifyOnInventoryPage() {
    await this.page.waitForURL(/inventory.html/);
    await this.pageTitle.waitFor();
  }
 
  // ✅ Add specific item to cart by name
  async addItemToCart(itemName) {
    await this.page.waitForSelector(`.inventory_item:has-text("${itemName}") button`);
    await this.page.locator(`.inventory_item:has-text("${itemName}") button`).click();
  }
 
  // ✅ Navigate to cart page
  async goToCart() {
    await this.cartLink.waitFor({state:'visible'});
    await this.cartLink.click();
  }
 
  // ✅ Sort by Price Low → High
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
 
  // ✅ Sort by Price High → Low
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
 
  // ✅ Sort by Name A → Z
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
 
  // ✅ Sort by Name Z → A
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
 
