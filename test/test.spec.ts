import { test, expect, Page } from '@playwright/test'

const baseURL = 'http://localhost:4173/'

function source (page: Page) {
  return page.locator('.n-select:nth-child(1)')
}

function swap (page: Page) {
  return page.locator('.n-select:nth-child(1) + button')
}

function target (page: Page) {
  return page.locator('.n-select:nth-child(3)')
}

function input (page: Page) {
  return page.locator('.n-grid > div:nth-child(1) textarea')
}

function output (page: Page) {
  return page.locator('.n-grid > div:nth-child(2) textarea')
}

function phrase (page: Page) {
  return page.getByText('转换地域用词')
}

test('test', async ({ page }) => {
  await page.goto(baseURL)
  await expect(source(page)).toHaveText('简体')
  await expect(target(page)).toHaveText('繁体')
  await expect(phrase(page)).toHaveCSS('cursor', 'not-allowed')
  await input(page).fill('鼠标')
  await expect(output(page)).toHaveValue('鼠標')

  await target(page).click()
  await page.getByText('繁体（台湾）').click()
  await expect(phrase(page)).toHaveCSS('cursor', 'pointer')
  await expect(target(page)).toHaveText('繁体（台湾）')
  await phrase(page).click()
  await expect(output(page)).toHaveValue('滑鼠')

  await swap(page).click()
  await expect(source(page)).toHaveText('繁体（台湾）')
  await expect(target(page)).toHaveText('简体')
  await expect(input(page)).toHaveValue('滑鼠')
  await expect(output(page)).toHaveValue('鼠标')
})
