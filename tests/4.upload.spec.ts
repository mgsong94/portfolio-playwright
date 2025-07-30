import { test, expect } from '@playwright/test'
import CartPage from '../pages/cart.page'
const path = require('path')

test.describe('Upload file', () => {
  let cartPage: CartPage

  const fileName = ['logotitle.png', '3mb-file.pdf']

  // Regular Upload
  for (const name of fileName) {
    test(`should upload a ${name} file`, async ({ page }) => {
      cartPage = new CartPage(page)
  
      // open url
      await page.goto('/cart/')
  
      // provide test file path
      const filePath = path.join(__dirname, `../data/${name}`)
      
      // upload test file
      cartPage.uploadComponent().uploadFile(filePath)
  
      // hardcoded sleep = WRONG WAY(Hardcoded wait)
      // await page.waitForTimeout(5000)
  
      // wait for condition(Conditional wait)
      // await cartPage.uploadComponent().successTxt.waitFor({ state: 'visible', timeout: 10000})
      
      // Assertion wait
      // assertion
      await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded successfully', {timeout: 10000})
    })
  }

  // Upload with DOM manipulation(input field가 숨겨져 접근할 수 없을 때 DOM을 수정하여 업로드)
  test('should upload a test file on a hidden input field', async ({ page }) => {
    cartPage = new CartPage(page);

    // open url
    await page.goto('/cart/');

    // provide test file path
    const filePath = path.join(__dirname, `../data/logotitle.png`);

    // DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector('input#upfile_1');
      if (selector) {
        selector.className = '';
      }
    });

    // upload test file
    cartPage.uploadComponent().uploadFile(filePath);

    /*****************/
    /* wait commands */
    /*****************/
    // Hardcoded wait - WRONG WAY
    // 무조건 해당 타임아웃 시간이 끝날 때까지 기다림
    // await page.waitForTimeout(5000);

    // Conditional wait
    // 요소가 조건을 만족시키면 타임아웃 시간과 상관없이 요소 반환. 최대 대기 시간의 개념
    await page.locator('#wfu_messageblock_header_1_1').waitFor({state: 'visible', timeout: 10000});

    // Assertion wait
    // expect의 기본적인 타임아웃은 5초(설정에 있음)
    // expect의 모든 함수는 기본적으로 timeout 매개변수를 가지고 있으므로 이를 추가하여 사용 가능
    await expect(cartPage.uploadComponent().successTxt)
      .toContainText('uploaded successfully', {timeout: 10000});
  })
})


