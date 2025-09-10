import { test, expect } from '@playwright/test';
import { LoginSwag } from './pages/LoginSwag.js';
import { InventoryPage } from './pages/InventoryPage.js';
import { Cart } from './pages/Cart.js';
import{ CheckoutPage } from'./pages/CheckoutPage.js';
 
test('E2E - Login, Add to Cart, Checkout, and Verify Order', async ({ page }) => {
  // Set timeout for the whole test (15 seconds)
  test.setTimeout(15 * 1000);
 
  // Create page objects
  const loginPage = new LoginSwag(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new Cart(page);
  const checkoutPage = new CheckoutPage(page);
 
  // Step 1: Open Login Page
  await loginPage.goto();
 
  // Step 2: Login with credentials
  await loginPage.login('standard_user', 'secret_sauce');
 
  // Step 3: Verify on Inventory Page
  await inventoryPage.verifyOnInventoryPage();
  await expect(inventoryPage.pageTitle).toHaveText('Products', { timeout: 15000 });
 
  // Step 4: Add Items to Cart
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.addItemToCart('Sauce Labs Bike Light');
 
  // Step 5: Go to Cart Page
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart.html/, { timeout: 15000 });
 
  // Step 6: Verify items count in cart
  const cartCount = await cartPage.getCartCount();
  expect(cartCount).toBe(2);
 
  // Step 7: Checkout
  await cartPage.checkout();
 
  // Step 8: Fill Checkout Info
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await checkoutPage.continue();
 
  // Step 9: Finish Checkout
  await checkoutPage.finish();
 
  // Step 10: Verify Order Confirmation
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!', { timeout: 15000 });
});
 