import{test,expect} from '@playwright/test'

test('Capture elements using text',async({page}) => {

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')

    const verifyText = page.getByText('Locate elements by their text content.')
    await expect (verifyText).toBeVisible

    const item1 = page.getByText('List item 1')
    await expect  (item1).toBeVisible

    const linkItem = page.getByText('link', {exact: true})
    await expect (linkItem).toBeVisible()
    await linkItem.click()

    const submitButton = page.getByText('Submit Form', {exact: true})
    await expect (submitButton).toBeVisible
    await submitButton.click

    const textIdentifier = page.getByText('Special: Unique text identifier', {exact: true})
    await expect(textIdentifier).toBeVisible

        
})