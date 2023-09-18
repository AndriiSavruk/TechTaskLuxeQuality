import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Test cases', () => {
    it('Test case #1 Valid Login', async () => {
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
        let isDisplayedProducts = await $('#header_container').isDisplayed();
        console.log('Products block is displayed: '+isDisplayedProducts);
        // Check if Cart is displayed
        let isDisplayedCart = await $('#shopping_cart_container').isDisplayed();
        console.log('Cart is displayed: '+isDisplayedCart);
        // await LoginPage.login('standard_user', 'secret_sauce');
        // await expect(SecurePage.flashAlert).toBeExisting()
        // await expect(SecurePage.flashAlert).toHaveTextContaining(
        //     'You logged into a secure area!')
    })
})

