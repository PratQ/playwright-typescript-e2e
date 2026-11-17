import{test, expect} from '@playwright/test'

test('Capturing element using getByTitle',async({page})=> {

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')

    const homeLinkTitle = page.getByTitle('Home page link')
    await expect(homeLinkTitle).toBeVisible()
    await homeLinkTitle.click()

    const htmlTitle = page.getByTitle('HyperText Markup Language')
    await expect(htmlTitle).toBeVisible()

    const testTitle = page.getByTitle('Tooltip text')
    await expect(testTitle).toBeVisible()

})