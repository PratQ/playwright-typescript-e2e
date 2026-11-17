import {test, expect} from '@playwright/test'

test('Alt text',async({page})=>{

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')

    const altImage = page.getByAltText('logo image')
    await expect(altImage).toBeVisible()

})
