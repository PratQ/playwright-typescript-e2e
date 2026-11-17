import {test,expect} from '@playwright/test'

test('Locating elements with getByPlaceholders',async({page})=> {

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')

    const namePlaceholder = page.getByPlaceholder('Enter your full name')
    await expect(namePlaceholder).toBeVisible()
    await namePlaceholder.fill('ABC POR XYZ')

    const phonePlaceholder = page.getByPlaceholder('Phone number (xxx-xxx-xxxx)')
    await expect(phonePlaceholder).toBeVisible()
    await phonePlaceholder.fill('2648632682')

    const messagePlaceholder = page.getByPlaceholder('Type your message here...')
    await expect(messagePlaceholder).toBeVisible()
    await messagePlaceholder.fill('Handling elements using getByPlaceholder')

    const searchPlaceholder = page.getByPlaceholder('Search products...')
    await expect(searchPlaceholder).toBeVisible()
    await searchPlaceholder.fill('Monitor')

    const searchButton = page.getByRole('button',{name:'Search'})
    await expect(searchButton).toBeVisible()
    await searchButton.click()

})