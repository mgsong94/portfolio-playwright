import {test, expect, APIRequestContext, APIResponse} from "@playwright/test";
import ContactPage from '../pages/contact.page'
// import { faker } from '@faker-js/faker';

test.describe('Contact', () => {
  let contactPage: ContactPage;
  let fakerApi: APIRequestContext;
  let randomPerson: APIResponse;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });

    const response = await fakerApi.get('users');
    const responseBody = await response.json();
    randomPerson = responseBody[0];
  })

  test('Fill contact form and verify successs message(Answer)', async ({ page }) => {
    contactPage = new ContactPage(page)

    // open url
    await contactPage.navigate()
    
    // fill out the input fields and submit
    await contactPage.submitForm(
      randomPerson.name,
      randomPerson.email,
      randomPerson.phone,
      randomPerson.website
      // faker.person.fullName(),
      // faker.internet.email(), 
      // faker.phone.number(), 
      // faker.lorem.paragraphs(2)
    );

    // verify success message
    await expect(await contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
  })
})