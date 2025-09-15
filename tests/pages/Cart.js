export class Cart {
  // @param {import('@playwright/test').Page} page - Playwright page object
  constructor(page) {
    this.page = page;

    // Locator using a **class selector** to target all cart items
    this.cartItems = page.locator('.cart_item');

    // Locator using a **data-test attribute selector** to target the checkout button
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }


  //  * Returns the number of items in the cart.
  //  * @returns {Promise<number>}

  async getCartCount() {
    return await this.cartItems.count();
  }

  //  * Clicks the checkout button to proceed.
  //  * Includes basic error handling.

  async checkout() {
    try {
      await this.checkoutButton.click();
    } catch (error) {
      console.error('Checkout failed:', error);
      throw new Error('Unable to proceed to checkout.');
    }
  }


  //  * Returns an array of item names in the cart.
  //  * Assumes each cart item has a `.inventory_item_name` element.
  //  * @returns {Promise<string[]>}

  async getItemNames() {
    const count = await this.cartItems.count();
    const names = [];

    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      names.push(name?.trim() || '');
    }

    return names;
  }


  //  * Checks if the cart is empty.
  //  * @returns {Promise<boolean>}

  async isCartEmpty() {
    const count = await this.getCartCount();
    return count === 0;
  }
}
