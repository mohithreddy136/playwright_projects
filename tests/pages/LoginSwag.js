export class LoginSwag {
  // /**
  //  * @param {import('@playwright/test').Page} page - Playwright page object
  //  */
  constructor(page) {
    this.page = page;

    // Locator using an **ID selector** for username input
    this.usernameInput = page.locator('#user-name');

    // Locator using a **placeholder text selector** for password input
    this.passwordInput = page.getByPlaceholder('Password');

    // Locator using a **data-test attribute selector** for login button
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  // /**
  //  * Navigates to the login page.
  //  */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.waitForLoadState('load');
  }

  // /**
  //  * Logs in using provided credentials.
  //  * Includes basic error handling.
  //  * @param {string} username
  //  * @param {string} password
  //  */
  async login(username, password) {
    try {
      await this.usernameInput.fill(username.trim());
      await this.passwordInput.fill(password.trim());
      await this.loginButton.click();
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Unable to perform login.');
    }
  }

  // /**
  //  * Verifies if login was successful by checking URL or page element.
  //  * @returns {Promise<boolean>}
  //  */
  async isLoginSuccessful() {
    return await this.page.url().includes('inventory.html');
  }
}
