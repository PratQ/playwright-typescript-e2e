
import { test, expect } from "@playwright/test";
import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        viewport: { width: 1280, height: 720 },
    },
});

//Hook Methods
const URL = 'https://demowebshop.tricentis.com/'

test.describe('Attribute Selectors', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL,{ waitUntil: 'networkidle' })
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

    //---------------------------------------------------------------------------------------

    //  2. Has href attribute   a[href]	=> All links with an href
    test('Has href attribute',async ({page})=>{
        const hrefAttribute = page.locator('a[href]')
        console.log('Total links on the DOM are: ', await hrefAttribute.count())
    })

    //---------------------------------------------------------------------------------------

    //  3. Text input	input[type="text"] => Text inputs
    test('Text input', async ({page})=>{
        const textInputTag = page.locator('input[type = "text"]')
        console.log('Total count for textInputTag : ', await textInputTag.count())
        await expect (textInputTag.first()).toBeVisible()

    })

    //---------------------------------------------------------------------------------------

    //  4. Search button	input[value="Search"] => Search button
    test('Search button', async({page})=>{
        const searchButton = page.locator('input[value = "Search"]')
        await expect(searchButton).toBeVisible()
        await searchButton.click()
    })

    //---------------------------------------------------------------------------------------

    //  5.Register link	a[href="/register"]  => Register link
    test('Register link',async ({page})=>{
        const regeisterLink = page.locator('a[href="/register"]')
        await expect(regeisterLink).toHaveText('Register')
        await regeisterLink.click()

    })

//---------------------------------------------------------------------------------------


    //  6.Contains "cart"	a[href*="cart"] => Cart link
    test('Contains "cart"',async({page})=> {
        const linkWithCart = page.locator('a[href*="cart"]')
        console.log('Total links which has "cart" keyword: ',await linkWithCart.count())
        console.log('First link is: ',await (linkWithCart.first().innerText()))
        console.log('Last link is: ',await (linkWithCart.last().innerText()))

    })

    //---------------------------------------------------------------------------------------


    //  7.Product class	div[class*="product"] => Product elements
    test('Product class',async({page})=>{
        const productClass = page.locator('div[class*="product"]')
        console.log('Total count of element with class like product:', await productClass.count())
    })

    //---------------------------------------------------------------------------------------


    //  8. Books category	a[href^="/books"] => Books menu link
    test('Book category',async ({page})=> {
        const bookCategory = page.locator('a[href^="/books"]').filter({hasText: 'Book'})
        console.log('Total count for Book category: ', await bookCategory.count())
        
    })

    //---------------------------------------------------------------------------------------

    
    //  9. Poll IDs	input[id^="pollanswers"] => Poll radio options
    test("Poll ID's",async ({page})=>{
        const pollIds = page.locator('input[id^="pollanswers"]')
        await expect(pollIds).toHaveCount(4)
    })

    //---------------------------------------------------------------------------------------


    //  10. Login link	a[href$="login"] => Login link
    test('Login link',async({page}) =>{
        const loginLink = page.locator('a[href$=login]')
        await loginLink.click()
    } )

    //---------------------------------------------------------------------------------------


    //  11. Wishlist link	a[href$="wishlist"]	=> Wishlist link
    test('Whishlist link',async({page})=>{
        const wishlistLink = page.locator('a[href$="wishlist"]')
        await expect (wishlistLink.filter({hasText: /^Wishlist$/})).toBeVisible()
        console.log('Total "Wishlist" items on the DOM are: ',await wishlistLink.count())

    })

    //---------------------------------------------------------------------------------------

    
    //  12. Product images	img[src$=".jpg"] => Product .jpg images
    test('Product images', async ({page})=>{
        const productImages = page.locator('img[src$=".png"]')   //img[src$=".jpg"] not working
        console.log('Total images with png format are: ', await productImages.count())
    })


})
