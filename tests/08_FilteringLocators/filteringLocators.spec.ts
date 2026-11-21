import {test,expect} from '@playwright/test'
import { afterEach } from 'node:test'

//Hook methods
test.beforeEach(async ({page})=>{
    await page.goto('https://sdetqa.vercel.app/filters_practice')
})

test.afterEach(async ({page}) => {
    await page.close()
})

//===================================================================================//


//9. Count "Say hello" buttons for John

test('Count "Say hello" buttons for John',async({page})=>{

    const helloForJohn = page
        .getByRole('listitem')
        .filter({hasText:'John'})
        .getByRole('button' ,{name: 'Say hello'})

    console.log('Total number of "Say hello" buttons for John: ',await helloForJohn.count())
})


//10. Count "Say goodbye" buttons for Mary

test('Count "Say goodbye" buttons for Mary', async({page})=>{
    const goodbyeForMary = page
        .getByRole('listitem')
        .filter({hasText: 'Mary'})
        .getByRole('button', {name: 'Say goodbye'})

        console.log('Count "Say goodbye" buttons for Mary', await goodbyeForMary.count())
 })

 //11. Count all buttons for John

 test('Count all buttons for John', async({page})=>{
    const allButtonsForJohn = page
        .getByRole('listitem')
        .filter({hasText: 'John'})
        .getByRole('button')

        console.log('Count all buttons for John: ', await allButtonsForJohn.count())
 })


//12. Count all buttons for John  

test('Find "Subscribe" buttons using multiple conditions',async({page})=>{
    const subsccirbeButton = page

/*         .getByRole('button',{name: 'Subscribe'}) 
        
           // Playwright does a case-insensitive substring match by default—not an exact match. 
           // Hence it will capture all the element 2 Subscribe as well as 1 Unsubscribe button as well
           
          console.log(await subsccirbeButton.first().innerText()) //0th ele
          console.log(await subsccirbeButton.nth(1).innerText())  //1st ele
          console.log(await subsccirbeButton.last().innerText())  //2nd ele
 */
        

     .getByRole('button')
    .and(page. getByTitle('Subscribe' ,{exact : true}))
    .filter({hasNotText: 'alt'})
    await expect(subsccirbeButton).toBeVisible()
    console.log('"Subscribe" button count: ', await subsccirbeButton.count()) 

})


//13. Find "Unsubscribe" button

test('Find "Unsubscribe" button',async({page})=>{
    const unscribeButton = page
    .getByRole('button',{name :'Unsubscribe'})

    await expect(unscribeButton).toBeVisible()
    console.log('Unsubscribe button count : ',await unscribeButton.count())
})

//14. Find "details" buttons for done tasks

test('Find "details" buttons for done tasks',async ({page})=>{

    const detailButtonsForDone = page
        .getByRole('listitem')
        .filter({hasText:'done'})
        .getByRole('button',{name: 'details'})

    console.log('Total number of "details" buttons for "done" tasks: ', await detailButtonsForDone.count())
})


// 15. Find "details" button for pending tasks
test('Find "details" button for pending tasks',async({page})=>{
    const detailsButtonForPending = page
        .getByRole('listitem')
        .filter({hasText: 'pending'})
        .getByRole('button',{name: 'details'})

    console.log('Total number of "details" button for pending tasks: ', await detailsButtonForPending.count())
})

// 16. Count tasks with "done" status
test('Count tasks with "done" status',async({page})=>{
    const taskWithDoneStatus = page
        .getByRole('listitem')
        .filter({hasText: 'done'})

    console.log('Count of tasks with "done" status: ', await taskWithDoneStatus.count())
})

//17. Find tasks not marked "done"
test('Find tasks not marked "done"',async({page})=>{
    

       /*const taskNotMarkedDone = page 
        .getByRole('listitem')
        .filter({hasText: 'pending'})
        .or(page.getByRole('listitem') .filter({hasText: 'waiting'}))
        //If a new status badge (like 'in-progress') is ever added later, .or(...) with only 'pending' and 'waiting' wouldn't catch it unless updated
 */

        // Step 1: Pick ONLY the card that has "Task A" inside it
        const myTaskCard = page
        .locator('.card')
        .filter({hasText:'Task A'})

        // Step 2: Now look inside ONLY that card for items without "done"
        const taskNotMarkedDone = myTaskCard //Will search the elemet within it and not in whole page
        .getByRole('listitem')
        .filter({hasNotText: 'done'})

    console.log('total task not marked as done task: ',await taskNotMarkedDone.count())
    console.log(await taskNotMarkedDone.first().innerText())  //1st element
    console.log(await taskNotMarkedDone.last().innerText())     //last element
})


//18. Verify Product 2 button
test('Verify Product 2 button',async({page})=>{
    const verifyProduct2Button = page
    .getByRole('listitem')
    .filter({hasText:'Product 2'})
    .getByRole('button')

    await expect(verifyProduct2Button).toBeVisible()
    await expect(verifyProduct2Button).toHaveText('Add to cart')
})


//19. Verify stock status counts
test('Verify stock status counts',async({page})=>{

    const inStock = page
    .getByRole('listitem')
    .filter({hasText: 'In stock'})

    console.log('"In stock" items in count is: ', await inStock.count())

     const outOfStock = page
    .getByRole('listitem')
    .filter({hasText: 'Out of stock'})
    
    console.log('"Out of stock" items in count is: ', await outOfStock.count())




})