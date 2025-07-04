import {test, expect} from "@playwright/test";
import HomePage from '../pages/home.page'

test.describe('Home', () => {
  let homePage: HomePage;

  // Before Hook - Page Initialization
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate()
  })

  test.beforeAll(async ({ browser }) => {
    
  })
  
  test('Open HomePage and verify title', async ({ page }) => {
    // verify title
    await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns')
  })

  test('Open About Page ant verify title', async ({ page }) => {
    // open url
    await page.goto('https://practice.sdetunicorns.com/about')

    // verify title
    await expect(page).toHaveTitle('About – Practice E-Commerce Site')
  })
  

  test('Click get started button using css selector', async ({ page }) => {
    // verify url does not have #get-started
    await expect(page).not.toHaveURL(/.*#get-started/)

    // click the button
    // await page.locator('#get-started').click()
    await homePage.getStartedBtn.click()

    // verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/)
  })
  
  test('Verify heading text is visible using text selector', async ({ page }) => {
    // find the text locator
    // const headingText = await page.locator('text=think different. Make different.')
    const headingText = await homePage.headingText

    // verify url has #get-started
    await expect(headingText).not.toBeHidden()
    await expect(headingText).toBeVisible()
  })


  test('Verify home link is enabled using text and css selector', async ({ page }) => {
    // find the home text
    // const headingText = await page.locator('#zak-primary-menu >> text=Home')
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
    // const navLinks = page.locator('#zak-primary-menu li[id*=menu]')
    const navLinks = await homePage.navLinks

    // verify nav links text
    await expect(await navLinks.allTextContents()).toEqual(expectedLinks)
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
    // const navLink = page.locator('#zak-primary-menu li[id*=menu]').nth(3)
    const navLink = await homePage.navLinks.nth(3)

    // verify nav links text
    await expect(await navLink.textContent()).toEqual(expectedLinks[3])
  })

  test('Print out all the links', async ({ page }) => {
    // find the nav links
    const navLinks = page.locator('#zak-primary-menu li[id*=menu]')

    // print out all the links
    for (const el of await navLinks.elementHandles()) {
      console.log(await el.textContent())
    }
  })
})
