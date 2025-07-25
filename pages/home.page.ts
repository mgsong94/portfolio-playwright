import { Page, Locator } from '@playwright/test' 

class HomePage {
  page: Page;
  getStartedBtn: Locator;
  headingText: Locator;
  homeLink: Locator;
  searchIcon: Locator;
  navLinks: Locator;
  
  constructor(page: Page) {
    this.page = page;
    // css selector
    this.getStartedBtn = page.locator('#get-started') 
    // text selector (""일 경우 대소문자 인식)
    this.headingText = page.locator('text=think different. Make different.') 
    // text and css selector
    this.homeLink = page.locator('#zak-primary-menu:has-text("Home")') // this.homeLink = page.locator('#zak-primary-menu >> text=Home') 
    // xpath selector
    this.searchIcon = page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]')
    // multiple elements
    this.navLinks = page.locator('#zak-primary-menu li[id*=menu]')
  }
  
  async navigate() {
     await this.page.goto('/')
  }
}

export default HomePage;