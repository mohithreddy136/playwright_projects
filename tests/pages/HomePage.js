// Import Playwright's expect function
import { expect } from '@playwright/test';
 
// Define the HomePage class
export class HomePage {
  constructor(page) {
    this.page = page;
 
    // Locator for the exact "Book Store" header text
    this.bookStoreHeader = page.getByText('Book Store', { exact: true });
 
    // Locator for the search input box
    this.searchBox = page.locator('input[placeholder="Type to search"]');
 
    // Locator for the login button
    this.loginButton = page.locator('#login');
 
    // Locator for the first book title link in the table
    this.firstBookTitle = page.locator('.action-buttons a').first();
  }
 
  // Method to navigate to the bookstore page
  async navigate() {
    await this.page.goto('https://demoqa.com/books');
  }
 
  // Method to search for a book by title
  async searchForBook(bookTitle) {
    await this.searchBox.fill(bookTitle);
    await this.searchBox.press('Enter');
  }
}