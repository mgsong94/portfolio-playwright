import { test, expect } from "@playwright/test";
import BlogPage from '../pages/blog.page';

test.describe('Blog', () => {
  let blogPage: BlogPage;

  test('Verify Recent Posts count and verify the length of each list item', async ({ page }) => {
    blogPage = new BlogPage(page);

    // open blog page
    await blogPage.navigate();

    // get the recent post list elements
    const recentPostsList = blogPage.recentPostsList;

    // assert the total length = 5
    expect(await recentPostsList.count()).toEqual(5);

    // loop through the list and assert the char length > 10
    for (const el of await recentPostsList.elementHandles()) {
      console.log((await el.textContent())!.trim()); // ! : non-null 단언 연산자(null, undefined가 아님을 명시)
      expect((await el.textContent())!.trim().length).toBeGreaterThan(10);
    }
  })
})