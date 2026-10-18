import {test,expect} from '@playwright/test'

test('test', async({page}) =>{

    await page.goto('https://sdetqa.vercel.app/pw-locators-demo-app')


    /* 1. Locate by Role
        The page.getByRole() locator reflects how users and assistive technology perceive the page, for example whether some element is a button or a checkbox. 
        When locating by role, you should usually pass the accessible name as well, so that the locator pinpoints the exact element.    
    */

    const projectLinks = page.getByRole('link',{name: 'Projects'})
    await expect (projectLinks).toBeVisible

    const signUpButton = page.getByRole('button',{name:'Sign In'})
    await expect (signUpButton).toBeVisible
    signUpButton.click


    /* 
    2. Locate by text:
     a.   Find an element by the text it contains. You can match by a substring, exact string, or 
          a regular expression when using page.getByText().
     b.   Use this locator to find non-interactive elements div, span, p etc.     
    */

     const welcomeText = page.getByText('Welcome, John! 👋')
     await expect (welcomeText).toBeVisible



     /* 
     3. Locate by label
        a. Most form controls usually have dedicated labels that could be conveniently used to interact 
           with the form. In this case, you can locate the control by its associated label using page.getByLabel().
        b.
     */

    const emailField = page.getByLabel('Email Address')
    await expect (emailField).toBeVisible

    await emailField.fill('testqa@gmail.com')


    /* 
    4. Locate by placeholder
       a. Inputs may have a placeholder attribute to hint to the user what value should be entered. You can locate
          such an input using page.getByPlaceholder().

    */

    const cityPlaceholder = page.getByPlaceholder('Search tests...')
    await expect (cityPlaceholder).toBeVisible

    await cityPlaceholder.fill('Functional Test')


    /* 
    5. Locate by alt text
       All images should have an alt attribute that describes the image. You can locate an image based on the text 
       alternative using page.getByAltText().
    
    */


    await expect (page.getByAltText('Playwright logo')).toBeVisible   //we are adding this without constant since we dont have further operation on this beacuse its image

    /* 
    6. Locate by title
       a. Locate an element with a matching title attribute using page.getByTitle().
    */

    const totalRunsTitle = page.getByTitle('Total test runs')
    await expect (totalRunsTitle).toBeVisible
    await expect(totalRunsTitle).toHaveText('4,821Total Runs') //have to provide all the exact values under that lable i.e 4821 and Total Rund
    await expect(totalRunsTitle).toContainText('4,821')  //accepts the one of the multiple values under that title

    /* 
    7. Locate by test id
       a. Testing by test ids is the most resilient way of testing as even if your text or role of the attribute changes, 
          the test will still pass. QA's and developers should define explicit test ids and query them with 
          page.getByTestId(). However testing by test ids is not user facing. If the role or text value is important 
          to you then consider using user facing locators such as role and text locators.  
    
    */

    const procductCard = page.getByTestId('product-card-pro')
    await expect (procductCard).toBeVisible
    procductCard.click


})