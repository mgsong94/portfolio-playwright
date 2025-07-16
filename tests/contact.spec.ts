import {test, expect} from "@playwright/test";
import ContactPage from '../pages/contact.page'
import { faker } from '@faker-js/faker';

test.describe('Contact', () => {
  let contactPage: ContactPage

  test('Fill contact form and verify successs message(Answer)', async ({ page }) => {
    contactPage = new ContactPage(page)

    // open url
    await contactPage.navigate()
    
    // fill out the input fields and submit
    await contactPage.submitForm(faker.person.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2))

    // verify success message
    await expect(await contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')

    await expect.soft(await contactPage.successTxt).toHaveText('fail test');
  })
})