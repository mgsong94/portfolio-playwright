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
    await expect(page).not.toHaveURL(/.*#get-started/)

    // click the button
    await homePage.getStartedBtn.click()

    // verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/)
  })
  
  test('Verify heading text is visible using text selector', async ({ page }) => {
    // find the text locator
    const headingText = homePage.headingText

    // verify heading text is visible
    await expect(headingText).not.toBeHidden()
    await expect(headingText).toBeVisible()
  })


  test('Verify home link is enabled using text and css selector', async ({ page }) => {
    // find the home text
    const homeText = await homePage.homeLink
    
    // verify url has #get-started
    await expect(homeText).toBeEnabled()
  })

  test('Verify search icon is visible using xpath selector', async ({ page }) => {
    // find the search icon
    const searchIcon = homePage.searchIcon

    // verify url has #get-started
    await expect(searchIcon).toBeVisible()
  });

  test('Verify text of all nav links', async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account"
    ]
    // find the nav links
    const navLinks = homePage.navLinks

    // verify nav links text
    expect(await navLinks.allTextContents()).toEqual(expectedLinks)
  })

  test('Verify text of nav links', async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account"
    ]

    // find the nav links
    const navLink = homePage.navLinks.nth(3)

    // verify nav links text
    expect(await navLink.textContent()).toEqual(expectedLinks[3])
  })

  test('Print out all the links', async ({ page }) => {
    // find the nav links
    const navLinks = homePage.navLinks
    
    // print out all the links
    for (const el of await navLinks.elementHandles()) {
      console.log(await el.textContent())
    }
  })
})
