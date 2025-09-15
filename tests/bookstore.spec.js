import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage.js';
import { allure } from 'allure-playwright';
 
test.describe('Bookstore Tests', () => {
  test('Search for a specific book and verify results', async ({ page }) => {
    console.log('Starting test: Search for a specific book and verify results');
    allure.tag('smoke');
    
 
    const homePage = new HomePage(page);
 
    // Step 1: Navigate to the bookstore
    await homePage.navigate();
 
    // Step 2: Verify homepage loaded
    console.log('Verifying Book Store header is visible...');
    await expect(homePage.bookStoreHeader).toBeVisible();
 
    // Step 3: Search for the book
    await homePage.searchForBook('Understanding ECMAScript 6');
 
    // Step 4: Verify search result
    console.log('Checking if the first book title matches...');
    await expect(homePage.firstBookTitle).toHaveText('Understanding ECMAScript 6');
 
    // Step 5: Click on the book
    console.log('Clicking on the book title...');
    await homePage.firstBookTitle.click();
 
    // Step 6: Verify navigation to book detail
    console.log('Verifying URL contains book detail...');
    await expect(page).toHaveURL(/.*books\?book=.*/);
 
    // Step 7: Take screenshot
    console.log('Taking screenshot of book detail page...');
    await page.screenshot({ path: 'book-detail.png', fullPage: true });
 
    console.log('Test completed successfully.');
  });
});