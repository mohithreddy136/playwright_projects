export class Cart {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }
 
  async getCartCount() {
    return await this.cartItems.count();
  }
 
  async checkout() {
    await this.checkoutButton.click();
  }
}
