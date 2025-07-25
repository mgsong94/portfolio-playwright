import {test, expect} from "@playwright/test";
import ContactPage from '../pages/contact.page';
import { faker } from '@faker-js/faker';

test.describe('Contact', () => {
  let contactPage: ContactPage;

  test('Fill contact form and verify successs message', async ({ page }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate();
    
    // fill out the input fields
    await contactPage.fillForm(
      faker.person.fullName(), 
      faker.internet.email(), 
      faker.phone.number(), 
      faker.lorem.paragraphs(2)
    )

    // add a soft assertion
    await expect.soft(contactPage.messageInput).toHaveText("Fail test message")

    // click submit
    await contactPage.submitForm();

    // expect(test.info().errors.length).toBeLessThan(1);

    // verify success message
    await expect(contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
  })
})