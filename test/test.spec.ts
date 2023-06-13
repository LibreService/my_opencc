import { test, expect, Page, Locator } from '@playwright/test'

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

test('Convert', async ({ page }) => {
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

async function upload (page: Page, locator: Locator, files: string[]) {
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    locator.click()
  ])
  return fileChooser.setFiles(files.map(file => 'OpenCC/data/dictionary/' + file))
}

async function download (page: Page, locator: Locator) {
  const downloadPromise = page.waitForEvent('download')
  await locator.click()
  const download = await downloadPromise
  const readable = (await download.createReadStream())!
  return new Promise<Uint8Array>(resolve => readable!.on('data', (content: Uint8Array) => {
    resolve(content)
  }))
}

test('TXT to OCD2', async ({ page }) => {
  await page.goto(baseURL)

  await page.getByText('生成ocd2字典').click()
  await upload(page, page.getByText('Click, or drag txt files to this area'), ['HKVariants.txt'])
  await page.getByText('Convert').click()
  await expect(page.getByText('HKVariants.ocd2 ✅')).toBeVisible({ timeout: 10000 })
  expect(await download(page, page.getByText('Download All'))).toHaveLength(4893)
})
