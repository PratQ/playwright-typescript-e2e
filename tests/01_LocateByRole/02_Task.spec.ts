import {test, expect} from '@playwright/test'

test ('test',async ({page}) => {

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')


    const locatorType = page.getByRole('heading',{name: 'getByRole()'});
    await expect (locatorType).toBeVisible

    const heading2 = page.getByRole('heading',{name:'Locate elements by their explicit or implicit ARIA roles.'})
    await expect (heading2).toBeVisible

    const homeLink = page.getByRole('link',{name:'Home'})
    await expect (homeLink).toBeVisible
})