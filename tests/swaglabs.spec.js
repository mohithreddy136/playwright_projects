import { test, expect } from '@playwright/test';
// Importing all Files to main .spec.js file
import { LoginSwag } from './pages/LoginSwag.js';
import { InventoryPage } from './pages/InventoryPage.js';
import { Cart } from './pages/Cart.js';
import { CheckoutPage } from './pages/CheckoutPage.js';

test('E2E - Login, Sort All Ways, Add to Cart, Checkout, and Verify Order', async ({ page }) => {
  // Set timeout for the whole test (15 seconds)
  test.setTimeout(120 * 1000);

  // Initialize page objects
  const loginPage = new LoginSwag(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new Cart(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate to Login Page
  await loginPage.goto();
  await expect(page).toHaveTitle('Swag Labs');

  // Step 2: Perform Login
  await loginPage.login('standard_user', 'secret_sauce');

  // Step 3: Verify login was successful
  const loginSuccess = await loginPage.isLoginSuccessful();
  expect(loginSuccess).toBeTruthy();

  // Step 4: Verify Inventory Page is loaded
  await inventoryPage.verifyOnInventoryPage();
  await expect(inventoryPage.pageTitle).toHaveText('Products', { timeout: 15000 });


  // ✅ Assert that at least one inventory item is visible
  await expect(inventoryPage.inventoryItems.first()).toBeVisible();

  // ✅ Assert that there are more than one inventory items
  const itemCount = await inventoryPage.inventoryItems.count();
  expect(itemCount).toBeGreaterThan(1);

  // Find and assert the product "Sauce Labs Backpack" is visible
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Find and assert the image with alt text "Sauce Labs Backpack" is visible
  await expect(page.getByAltText('Sauce Labs Backpack')).toBeVisible();

  // Find and click the "Add to cart" button for "Sauce Labs Backpack" using surrounding div
  //const addToCartButton = page.locator('.inventory_item:has-text("Sauce Labs Backpack") button');
  //await expect(inventoryPage.addToCartButton).toBeVisible();
  //await inventoryPage.addToCartButton.click();

  // Step 5: Sort by Price Low to High
  const lowToHigh = await inventoryPage.sortByPriceLowToHigh();
  expect(lowToHigh.isSorted).toBeTruthy();
  console.log('Sorted by Price Low to High:', lowToHigh.numericPrices);

  // Step 6: Sort by Price High to Low
  const highToLow = await inventoryPage.sortByPriceHighToLow();
  expect(highToLow.isSorted).toBeTruthy();
  console.log('Sorted by Price High to Low:', highToLow.numericPrices);

  // Step 7: Sort by Name A to Z
  const nameAToZ = await inventoryPage.sortByNameAToZ();
  expect(nameAToZ.isSorted).toBeTruthy();
  console.log('Sorted by Name A to Z:', nameAToZ.names);

  // Step 8: Sort by Name Z to A
  const nameZToA = await inventoryPage.sortByNameZToA();
  expect(nameZToA.isSorted).toBeTruthy();
  console.log('Sorted by Name Z to A:', nameZToA.names);

  // Step 9: Add items to cart
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.addItemToCart('Sauce Labs Bike Light');

  // Step 10: Navigate to Cart Page
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart.html/, { timeout: 15000 });

  // Step 11: Verify cart is not empty
  const isEmpty = await cartPage.isCartEmpty();
  expect(isEmpty).toBeFalsy();

  // Step 12: Verify number of items in cart
  const cartCount = await cartPage.getCartCount();
  expect(cartCount).toBe(2);

  // Step 13: Log item names for debugging
  const itemNames = await cartPage.getItemNames();
  console.log('Items in cart:', itemNames);

  // Step 14: Proceed to Checkout
  await cartPage.checkout();

  // Step 15: Fill in Checkout Information
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await checkoutPage.continue();

  // Step 16: Finish Checkout
  await checkoutPage.finish();

  // Step 17: Verify Order Confirmation
  const orderComplete = await checkoutPage.isOrderComplete();
  expect(orderComplete).toBeTruthy();
  console.log('Order confirmation verified successfully.');
});
