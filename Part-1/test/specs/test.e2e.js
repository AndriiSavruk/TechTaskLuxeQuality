import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Test cases', () => {
    it.skip('Test case #1 Valid Login', async () => {
        await browser.url(`https://www.saucedemo.com/`);

        const userNameField = await $('#user-name');
        await userNameField.setValue('standard_user');
        // Check if data is entered to the field
        await expect(userNameField).toHaveValue('standard_user'); 
        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');
        // Check if data is entered to the field
        await expect(passwordField).toHaveValue('secret_sauce');
        // Check if data is represented as dots instead of characters
        await expect(passwordField).toHaveAttribute('type', 'password'); 
        await $('#login-button').click();
        await browser.pause(2000);
        // Check if user is redirected to inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        // Check if 'Products' block is displayed
        const productsBlock = await $('#header_container');
        await expect(productsBlock).toBeDisplayed();
        // Check if Cart is displayed
        const cartIcon = await $('#shopping_cart_container');
        await expect(cartIcon).toBeDisplayed();
        // await LoginPage.login('standard_user', 'secret_sauce');
        // await expect(SecurePage.flashAlert).toBeExisting()
        // await expect(SecurePage.flashAlert).toHaveTextContaining(
        //     'You logged into a secure area!')
    })

    it('test case #2 Login with invalid password', async () => {
        await browser.url(`https://www.saucedemo.com/`);

        const userNameField = await $('#user-name');
        await userNameField.setValue('standard_user');
        // Check if data is entered to the field
        await expect(userNameField).toHaveValue('standard_user'); 
        const passwordField = await $('#password');
        await passwordField.setValue('wrong_password');
        // Check if data is entered to the field
        await expect(passwordField).toHaveValue('wrong_password');
        // Check if data is represented as dots instead of characters
        await expect(passwordField).toHaveAttribute('type', 'password'); 
        await $('#login-button').click();
        await browser.pause(2000);
        // Check if "X" icon is displayed on the Login field (check if svg element appears)
        const logDiv = await $('//*[@id="login_button_container"]/div/form/div[1]');
        await expect(logDiv).toHaveChildren(2);
        // Check if "X" icon is displayed on the Password field (check if svg element appears)
        const pasDiv = await $('//*[@id="login_button_container"]/div/form/div[2]');
        await expect(pasDiv).toHaveChildren(2);
        // Check if login and password fields are highlighted with red
        await expect(userNameField).toHaveAttributeContaining('class','error');
        await expect(passwordField).toHaveAttributeContaining('class','error');
        // Check if epic sadface is displayed
        const epicSadface = await $('//*[@id="login_button_container"]/div/form/div[3]/h3');
        await expect(epicSadface).toBeDisplayed();
        await expect(epicSadface).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
})

