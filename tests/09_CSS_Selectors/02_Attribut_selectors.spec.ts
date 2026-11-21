
import { test, expect } from "@playwright/test";

//Hook Methods
const URL = 'https://demowebshop.tricentis.com/'

test.describe('Attribute Selectors', () => {



    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })


    //---------------------------------------------------------------------------------------

    //  1. Has type attribute   input[id="newsletter-email"]
    test('Has type attribute', async ({ page }) => {
        const searchBox = page.locator('input[id="newsletter-email"]')
        await searchBox.fill('emp1@yahoo.com')
    })

})
