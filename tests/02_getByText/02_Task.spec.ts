import {test,expect} from '@playwright/test'

test('Capturing elements by getByLocators',async({page}) =>{

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')

    const text_1 = page.getByText('This paragraph contains some important text that you might want to locate.',{exact:true})
    await expect(text_1).toBeVisible()

    const text_2 = page.getByText('Another paragraph with colored text for demonstration.',{exact:true})
    await expect(text_2).toBeVisible()

    const text_3 = page.getByText('Click the button above to submit your information.',{exact:true})
    await expect(text_3).toBeVisible()

} )