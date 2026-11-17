import {test,expect} from '@playwright/test'

test( 'locate elements by labels',async({page}) => {

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')

    const emailAdd = page.getByLabel('Email Address:')
    await expect(emailAdd).toBeVisible()
    await emailAdd.fill('dummy@gamil.com')

    const passLabel = page.getByLabel('Password:')
    await expect(passLabel).toBeVisible()
    await passLabel.fill('Pass123')

    const ageLabel = page.getByLabel('Your Age:')
    await expect(ageLabel).toBeVisible()
    await ageLabel.fill('29')

    const stdRadioButton = page.getByLabel(' Standard',{exact:true})
    await expect(stdRadioButton).toBeVisible()
    await stdRadioButton.click()

    const expressRadioButton = page.getByLabel(' Express',{exact:true})
    await expect(expressRadioButton).toBeVisible()
    await expressRadioButton.click()
    
})