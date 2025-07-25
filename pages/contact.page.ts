import { Page, Locator } from '@playwright/test' 

class ContactPage {
  page: Page;
  contactBtn: Locator;
  nameInput: Locator;
  emailInput: Locator;
  phoneInput: Locator;
  messageInput: Locator;
  submitBtn: Locator;
  successTxt: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.contactBtn = page.locator('#zak-primary-menu >> text=Contact')
    this.nameInput = page.locator('.contact-name input')
    this.emailInput = page.locator('.contact-email input')
    this.phoneInput = page.locator('.contact-phone input')
    this.messageInput = page.locator('.contact-message textarea')
    this.submitBtn = page.locator('button[type=submit]')
    this.successTxt = page.locator('div[role=alert]')
  }

  async navigate() {
    await this.page.goto('/contact')
  }

  async fillForm(name: string, email: string, phone: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.messageInput.fill(message);
  }
  
  async submitForm() {
    await this.submitBtn.click();
  }
}

export default ContactPage;