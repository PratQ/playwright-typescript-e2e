        import {test,expect} from '@playwright/test'

        test ('Capturing elements using getByRole',async({page}) => {

            page.goto('https://sdetqa.vercel.app/pw-locators-practice-app')

            const checkBox = page.getByRole('checkbox',{name:'checkbox'})
            await expect (checkBox).toBeVisible
            await checkBox.click


        })