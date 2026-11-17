import {test, expect} from '@playwright/test'

test('Capturing elements by Test id',async({page}) => {

    await page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')

    const productB = page.getByTestId('product-card-2')
    const productBName = productB.getByTestId('product-name')
    const productBPrice = productB.getByTestId('product-price') // we have first capture the parent element product-card-2 since there are multiple element which has same test id 'product-price'
    
    await expect(productBName).toBeVisible()
    await expect(productBName).toHaveText('Product B')
    await expect(productBPrice).toBeVisible()
    await expect(productBPrice).toHaveText('$29.99')
})