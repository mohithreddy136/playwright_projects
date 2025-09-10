export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }
 
  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.waitFor({state:'visible'});
    
    await this.postalCodeInput.fill(postalCode);
  }
 
  async continue() {
    await this.continueButton.waitFor({state:'visible'});
    await this.continueButton.click();
  }
 
  async finish() {
    await this.page.waitForSelector('[data-test="finish"]');
    await this.finishButton.click();
  }
}