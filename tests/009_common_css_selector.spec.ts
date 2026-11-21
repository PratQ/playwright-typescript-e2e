/* 

Common CSS Selector Patterns

1. tag with id
    tag#id  or  #id

2. tag with Class
    tag.class  or  .class

3. tag with Attribute
    tag[attribute=value]  or   [attribute=value]

4. tag with Class + Attribute
    tag.class[attribute=value]  or   .class[attribute=value]

In Playwright syntax:
page.locator("css_selector")
=======================================================================================
*/


import { test, expect } from '@playwright/test'
import { beforeEach } from 'node:test'

test.describe('CSS Selctor Demo', () => {

    //Hook Methods

    const URL = 'https://demowebshop.tricentis.com/'    //Gloabal variable
    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })
    //--------------------------------------------------------------------------------------



    test('CSS with ID', async ({ page }) => {

        //const searchBox1 = page.locator('input#small-searchterms')
        const searchBoxId = page.locator('#small-searchterms')
        await searchBoxId.fill('14.1-inch Laptop')

        const searchButton = page.locator('[value="Search"]')
        await searchButton.click()

        await page.waitForTimeout(3000)

        const productDetails = page.locator('h2[class="product-title"]>a')
        await expect(productDetails).toHaveText('14.1-inch Laptop')
    })

    //----------------------------------------------------------------------------------------


    test('CSS with Class', async ({ page }) => {

        const searchBoxClass = page.locator('.search-box-text')  //'.' represents the class also the orignal value was "search-box-text ui-autocomplete-input" with lengthy space so remove it 
        await searchBoxClass.fill('$25 Virtual Gift Card')

        const searchButton1 = page.locator('.button-1.search-box-button')  //
        await searchButton1.click()

        await page.waitForTimeout(3000)


        const productDetails1 = page.locator('h2[class="product-title"]>a')
        await expect(productDetails1).toHaveText('$25 Virtual Gift Card')

    })

    //-------------------------------------------------------------------------------------------

    test('CSS with Attribute', async ({ page }) => {

        //const searchBox1 = page.locator('input#small-searchterms')
        const searchBoxAttribute = page.locator('[value="Search store"]')
        await searchBoxAttribute.fill('14.1-inch Laptop')

        const searchButtonAttribute = page.locator('[value="Search"]')
        await searchButtonAttribute.click()

        await page.waitForTimeout(3000)

        const productDetailsAttribute = page.locator('h2[class="product-title"]>a')
        await expect(productDetailsAttribute).toHaveText('14.1-inch Laptop')
    })

    //-------------------------------------------------------------------------------------------

    test('CSS with Class + Attribute', async ({ page }) => {

        //const searchBox1 = page.locator('input#small-searchterms')
        const searchBoxClass_Attribute = page.locator('[value="Search store"]')
        await searchBoxClass_Attribute.fill('14.1-inch Laptop')

        const searchButtonClass_Attribute = page.locator('[value="Search"]')
        await searchButtonClass_Attribute.click()

        await page.waitForTimeout(3000)

        const productDetailsClass_Attribute = page.locator('h2[class="product-title"]>a')
        await expect(productDetailsClass_Attribute).toHaveText('14.1-inch Laptop')
    })

})
