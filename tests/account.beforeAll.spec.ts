import {test, expect, Page} from "@playwright/test";

// beforeAll의 경우에는 parallel 테스트가 아닌 serial로 해야한다.
test.describe.serial('My Account', () => {
  // page 객체를 공유
  let page: Page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/my-account')
    await page.locator('#username').fill('practiceuser1')
    await page.locator('#password').fill('PracticePass1!')
    await page.locator('[value="Log in"]').click()
    await expect(page.locator('a:has-text("Log out")').first()).toBeVisible()
  })

  // ()안의 page를 삭제하고 위에 선언한 page를 사용
  test('Access Orders', async () => {
    // await page.goto('/my-account')
    await page.locator(`li a[href*='orders']`).click()
    await expect(page).toHaveURL(/.*orders/)
  });

  // ()안의 page를 삭제하고 위에 선언한 page를 사용
  test('Access Downloadsd', async () => {
    // await page.goto('/my-account')
    await page.locator(`li a[href*='downloads']`).click()
    await expect(page).toHaveURL(/.*downloads/)
  });
})