import { test, expect } from "@playwright/test";
/* 
Type       Description          CSS Selector        What it Targets 
----------------------------------------------------------------------------
Tag        All input fields     input               All textboxes, buttons 
Tag        All links            a                   All navigation links 
Tag        All buttons          button              Button elements 
ID         Search textbox       #small-searchterms  Search input box 
ID         Newsletter email     #newsletter-email   Footer email field 
ID         Poll option          #pollanswers-1      Community poll radio 
Class      Header links         .header-links       Login/Register area 
Class      Product grid         .product-grid       Featured products 
Class      Search box           .search-box-text    Search field 
Universal  All elements         *                   Entire DOM 

*/

test.describe('Basic locators', () => {
    //Hook Method

    const URL = 'https://demowebshop.tricentis.com/'

    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })

//-----------------------------------------------------------------------------------

    //  1. Tag => input => All input fileds
    test('Input tag', async ({ page }) => {
        const tagInput = page.locator('input')
        expect(await tagInput.count()).toBeGreaterThan(0)
        console.log('Total input tags in the DOM are: ', await tagInput.count())
    })

//-----------------------------------------------------------------------------------

    //  2. Tag => a => All links
    test('link (a) tags',async ({page})=>{
        const tagLinks = page.locator('a')
        expect(await tagLinks.count()).toBeGreaterThan(0)
        console.log('All links with "a" tag in the DOM: ', await tagLinks.count())
    })

//-----------------------------------------------------------------------------------

    //  3. Tag => a => All links
    test('Button tags',async({page})=>{
        const tagButton = page.locator('button')
        console.log('all elements which has button tag: ',await tagButton.count())
    })

//-----------------------------------------------------------------------------------

    // 4. Id => Search boxes
    test('Id tag', async({page})=>{
        const tagIdSearchbox = page.locator('#newsletter-email')
        await tagIdSearchbox.fill('dummy@gmail.com')
        await page.waitForTimeout(2000)
    })

//-----------------------------------------------------------------------------------

    //  5. Id => Poll
    test('Id tag for poll',async({page})=>{
        const idTagForPoll = page.locator('#pollanswers-1')
        await idTagForPoll.click()
    })

//-----------------------------------------------------------------------------------

    //  6. Class => header links
    test('Header links with class',async({page})=>{
        const classForHeaderLinks = page.locator('.header-links-wrapper')
        await expect(classForHeaderLinks).toBeVisible()
    })

//-----------------------------------------------------------------------------------

    //  7. Class => for Product grid
    test('Class for product grid',async({page})=>{
        const classForProductGrid = page.locator('.product-grid')
        await expect(classForProductGrid).toBeVisible()
    })

//-----------------------------------------------------------------------------------

    //  8. Class => Search box text
    test('Class for text search box',async({page})=>{
        const classForSearchBox = page.locator('.search-box-text')
        await expect(classForSearchBox).toBeVisible()
        await classForSearchBox.fill('Build your own cheap computer')
        await page.waitForTimeout(2000)
    })

})



