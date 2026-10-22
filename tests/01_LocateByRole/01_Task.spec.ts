/* 
    url: https://sdetqa.vercel.app/pw-locators-practice-app
*/


import{test,expect} from '@playwright/test';

test('test',async ({page}) => {

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')
    
    
    // Primary Action
    const primaryAction = page.getByRole('link',{name:'Primary Action'})
    await expect (primaryAction).toBeVisible
    primaryAction.click


    const buttonAction = page.getByRole('button',{name:'Toggle Button'})
    await expect (buttonAction).toBeVisible
    buttonAction.click


    const inputUserName = page.getByRole('textbox',{name:'Username'})
    await expect (inputUserName).toBeInViewport
    await inputUserName.fill('User Input')

})