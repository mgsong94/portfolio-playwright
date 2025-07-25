import {test, expect} from "@playwright/test";
import HomePage from '../pages/home.page'

test.describe('Home', () => {
  let homePage: HomePage

  // Before Hook - Page Initialization
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.navigate()
  })
  
  test('Open HomePage and verify title', async ({ page }) => {
    // verify title
    await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns')
  })

  test('Open About Page and verify title', async ({ page }) => {
    // open url
    await page.goto('/about')

    // verify title
    await expect(page).toHaveTitle('About – Practice E-Commerce Site')
  })
  
  test('Click get started button using css selector', async ({ page }) => {
    // verify url does not have #get-started
    await expect(page).not.toHaveURL(/.*#get-started/) //regex

    // click the button
    await homePage.getStartedBtn.click()

    // verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/) //regex
  })
  
  test('Verify heading text is visible using text selector', async ({ page }) => {
    // find the heading text
    const headingText = homePage.headingText;

    // verify heading text is visible
    await expect(headingText).not.toBeHidden();
    await expect(headingText).toBeVisible();
  })

  test('Verify home link is enabled using text and css selector', async ({ page }) => {
    // find the home link
    const homeLink = homePage.homeLink;
    
    // verify home link is enabled
    await expect(homeLink).toBeEnabled();
  })

  test('Verify search icon is visible using xpath selector', async ({ page }) => {
    // find the search icon
    const searchIcon = homePage.searchIcon;

    // verify search icon is visible
    await expect(searchIcon).toBeVisible();
  });

  test('Verify all texts of nav links', async ({ page }) => {
    // find the nav links
    const navLinks = homePage.navLinks;

    // expected nav links
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account"
    ]

    // verify nav links text
    expect(await navLinks.allTextContents()).toEqual(expectedLinks);
  })

  test('Verify nth text of nav links', async ({ page }) => {
    // find the nav links
    const navLink = homePage.navLinks.nth(3);
    
    // expected nav links
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account"
    ]

    // verify nav links text
    expect(await navLink.textContent()).toEqual(expectedLinks[3]);
  })

  test('Print out all the links', async ({ page }) => {
    // find the nav links
    const navLinks = homePage.navLinks;
    
    // print out all the links
    for (const el of await navLinks.elementHandles()) {
      console.log(await el.textContent());
    }
  })
})
