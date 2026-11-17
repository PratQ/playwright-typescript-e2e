import {test,expect} from '@playwright/test'


//Hooks Methods: Runs before and after methods

//Open the practice page before each tests
test.beforeEach(async ({page})=>{
    await page.goto('https://sdetqa.vercel.app/filters_practice')
})

//Closed the browser after execution of test
test.afterAll(async ({page})=>{
    await page.close()
})


test('Verify for "add to cart" for Product 2',async({page})=>{


    const product2 = page
        .getByRole('listitem')
        .filter({hasText : 'Product 2'})
        .getByRole('button',{name:'Add to cart'})

    //Verify button is visible or not     
    await expect (product2).toBeVisible()

    //click operation
    await product2.click()

})

//Filter using hasText - filter using the text

test('2. Count items not having ""Out of stock"',async({page})=>{

    const inStockItems = page
        .locator('.card').nth(1)      //This is css locator. here '.' represents the class. nth(1) will capture 2nd card
        .getByRole('listitem')
        .filter({hasNotText: 'Out of stock'})

    
    /* //Capturing elements In postive way
    const inStockItems = page
        .getByRole('listitem')
        .filter({hasNotText: 'In stock'}) */
   

    //Verify count 
    await expect(inStockItems).toHaveCount(3)
    
})

//Verify using getByTestId

test('4.Verify using getByTestId', async({page}) =>{

//Locate element by text id
    const apple = page.getByTestId('apple')
    const banana = page.getByTestId('banana')
    const orange = page.getByTestId('orange')
    const kiwi = page.getByTestId('kiwi')
    const mango = page.getByTestId('mango')

//Check visiblity
    await expect (apple).toBeVisible()
    await expect (banana).toBeVisible()
    await expect (orange).toBeVisible()
    await expect (kiwi).toBeVisible()
    await expect (mango).toBeVisible()

//Verify text contain
    await expect (apple).toContainText('apple')   //toContainText searchs for the partial values  since the orignal value for apple is '🍏 apple' which inclueds the icon

})
//first, last and nth element

test('5. count all the elements with the "data-testid"',async ({page}) =>{

    //Get all the elements with data-testid
    const testIdElement =  page.locator('[data-testid]')

    //Access all the element 
    const firstElement = testIdElement.first()
    const lastElement = testIdElement.last()
    const secElement = testIdElement.nth(3)         //Since the index starts from 0

    console.log('fruits available are: ', await firstElement.innerText(),await lastElement.innerText(),await secElement.innerText())

    //verify the count 
    await expect(testIdElement).toHaveCount(5)
})

///Chaining filters

test('6. find say "good bye" button',async ({page}) =>{

    const johnSayHello =   page.getByRole('listitem')
        .filter({hasText: '👤 John'})
        .getByRole('button',{name:'Say goodbye'})

    await expect(johnSayHello).toBeVisible()
    await expect(johnSayHello).toHaveText('Say goodbye')
})

///find Mary Say hello
test('7. Mary "Say hello" button', async({page})=>{

    const marySayHello = page.getByRole('listitem')
    .filter({hasText: 'Mary'})
    .getByRole('button',{name:'Say hello'})

    await expect(marySayHello).toBeVisible()
    await expect(marySayHello).toHaveText('Say hello')

    console.log('Inner text of button for Mary is: ', await marySayHello.innerText())

})

///Matching multiple locators using and()

test('8. find the subscirbe button with multiple condition',async({page})=>{

   const subscribeButton =  page
    .getByRole('button')                                //condition1
    .and(page.getByTitle('Subscribe',{exact: true}))    //condition2

    console.log('Total number of "Subscribe" buttons are: ',await subscribeButton.count())

    await expect(subscribeButton).toHaveCount(2)
    await expect(subscribeButton.first()).toBeVisible()
    await expect(subscribeButton.last()).toBeVisible()

})

//Find the button for the Task which is done

test('9. Find the button for the Task which is done', async({page})=>{

    const doneTasks = page
    .getByRole('listitem')
    .filter({hasText: 'done'})
    .getByRole('button',{name: 'details'})

    console.log('Total done tasks are: ',await doneTasks.count())

    await expect(doneTasks).toHaveCount(2)
    await expect(doneTasks.first()).toBeVisible()
    await expect(doneTasks.last()).toBeVisible()
})


//Verify stock status account

test('10. Verify stock status account', async({page}) =>{

    const inStock = page
    .getByRole('listitem')
    .filter({hasText: 'In stock'})

    const outStock = page
    .getByRole('listitem')
    .filter({hasText: 'Out of stock'})

    console.log('number of "In stock" items are: ', await inStock.count())
    console.log('number of "Out of stock" items are: ', await outStock.count())

    await expect(inStock).toHaveCount(3)
    await expect(outStock).toHaveCount(2)


})