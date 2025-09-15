export class CheckoutPage {
  // /**
  //  * @param {import('@playwright/test').Page} page - Playwright page object
  //  */
  constructor(page) {
    this.page = page;

    // Locator using a **placeholder text selector** for first name input
    this.firstNameInput = page.getByPlaceholder('First Name')

    // Locator using a **data-test attribute selector** for last name input
    this.lastNameInput = page.locator('[data-test="lastName"]');

    // Locator using an **ID selector** for postal code input
    this.postalCodeInput = page.locator('#postal-code');

    // Locator using a **role selector** for continue button
    this.continueButton = page.getByRole('button', { name: 'Continue' });

    // Locator using a **text selector** for finish button
    this.finishButton = page.getByText('Finish');

    // Locator using an **XPath selector** for order confirmation header
    this.completeHeader = page.locator('//h2[contains(@class, "complete-header")]');
  }

  // /**
  //  * Fills in the checkout information form.
  //  * @param {string} firstName
  //  * @param {string} lastName
  //  * @param {string} postalCode
  //  */
  async fillCheckoutInfo(firstName, lastName, postalCode) {
    try {
      await this.firstNameInput.fill(firstName.trim());
      await this.lastNameInput.fill(lastName.trim());
      await this.postalCodeInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.postalCodeInput.fill(postalCode.trim());
    } catch (error) {
      console.error('Error filling checkout info:', error);
      throw new Error('Failed to fill checkout form.');
    }
  }

  // /**
  //  * Clicks the continue button to proceed to the next step.
  //  */
  async continue() {
    try {
      await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.continueButton.click();
    } catch (error) {
      console.error('Error clicking continue:', error);
      throw new Error('Failed to proceed to checkout overview.');
    }
  }

  // /**
  //  * Clicks the finish button to complete the order.
  //  */
  async finish() {
    try {
      await this.finishButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.finishButton.click();
    } catch (error) {
      console.error('Error finishing checkout:', error);
      throw new Error('Failed to complete the order.');
    }
  }

  // /**
  //  * Verifies if the order was completed successfully.
  //  * @returns {Promise<boolean>}
  //  */
  async isOrderComplete() {
    try {
      await this.completeHeader.waitFor({ timeout: 5000 });
      const text = await this.completeHeader.textContent();
      return text?.trim() === 'Thank you for your order!';
    } catch {
      return false;
    }
  }
}
