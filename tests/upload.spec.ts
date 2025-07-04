import { test, expect } from '@playwright/test'
import CartPage from '../pages/cart.page'
const path = require('path')

test.describe('Upload file', () => {
  let cartPage: CartPage

  test('should upload a test file', async ({ page }) => {
    cartPage = new CartPage(page)

    // open url
    await page.goto('https://practice.sdetunicorns.com/cart/')

    // provide test file path
    const filePath = path.join(__dirname, '../data/logotitle.png')
    
    // upload test file
   cartPage.uploadComponent().uploadFile(filePath)

    // hardcoded sleep = WRONG WAY(Hardcoded wait)
    //  await page.waitForTimeout(5000)

    // wait for condition(Conditional wait)
    // await cartPage.uploadComponent().successTxt.waitFor({ state: 'visible', timeout: 10000})
    
    // Assertion wait
    // assertion
    await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded successfully', {timeout: 10000})
  })
  
})


