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
        await expect(productsBlock).toHaveTextContaining('Products');
        // Check if Cart is displayed
        const cartIcon = await $('#shopping_cart_container');
        await expect(cartIcon).toBeDisplayed();
        
        // await expect(SecurePage.flashAlert).toBeExisting()
        // await expect(SecurePage.flashAlert).toHaveTextContaining(
        //     'You logged into a secure area!')
    })

    it.skip('test case #2 Login with invalid password', async () => {
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

    it.skip('Test case #3 Login with invalid login', async () => {
        await browser.url(`https://www.saucedemo.com/`);

        const userNameField = await $('#user-name');
        await userNameField.setValue('standarD_user');
        // Check if data is entered to the field
        await expect(userNameField).toHaveValue('standarD_user');
        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');
        // Check if data is entered to the field
        await expect(passwordField).toHaveValue('secret_sauce');
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

    it.skip('Test case#4 Logout', async ()=> {
        await browser.url(`https://www.saucedemo.com/`);
        await LoginPage.login('standard_user', 'secret_sauce');

        await browser.pause(2000);
        // Check if user is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        const burgerButton = await $('#react-burger-menu-btn');
        await burgerButton.click();
        await browser.pause(2000);
        const burgerMenu = await $('//*[@id="menu_button_container"]/div/div[2]/div[1]/nav');
        // Check if the menu is expanded
        await expect(burgerMenu).toBeDisplayed();
        // Check if the menu has 4 items
        await expect(burgerMenu).toHaveChildren(4);

        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();
        await browser.pause(2000);
        // Check if user is redirected to the 'Login' page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        // Check if 'Login' field is empty
        const userNameField = await $('#user-name');
        await expect(userNameField).toHaveValue('');
        // Check if 'Password' field is empty
        const passwordField = await $('#password');
        await expect(passwordField).toHaveValue('');
    })

    it.skip('Test case #5 Saving the cart after logout', async () => {
        await browser.url(`https://www.saucedemo.com/`);
        await LoginPage.login('standard_user', 'secret_sauce');

        await browser.pause(2000);
        // Check if user is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        const productAddToCart = await $('#add-to-cart-sauce-labs-backpack');
        const cartValue = await $('.shopping_cart_badge');
        //Check if number near the cart at the top right increase by 1
        let isCartNotEmpty = await cartValue.isDisplayed();
        if(isCartNotEmpty) {
            let startNum = Number(await cartValue.getText());
            await productAddToCart.click();
            let newNum = startNum + 1;
            let newNumText = newNum.toString();
            await browser.pause(2000);
            await expect(cartValue).toHaveText(newNumText);
        }
        else {
            await productAddToCart.click();
            await browser.pause(2000);
            await expect(cartValue).toHaveText('1');
        }
        // Check if product is added to cart
        const productAddToCartName = 'Sauce Labs Backpack';
        await $('.shopping_cart_link').click();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        const cartList = await $('.cart_list');
        await expect(cartList).toHaveTextContaining(productAddToCartName);

        // Check if burger menu are expanded and 4 items are displayed
        const burgerButton = await $('#react-burger-menu-btn');
        await burgerButton.click();
        await browser.pause(2000);
        const burgerMenu = await $('//*[@id="menu_button_container"]/div/div[2]/div[1]/nav');
        await expect(burgerMenu).toBeDisplayed();
        await expect(burgerMenu).toHaveChildren(4);

        // Check when Logout if User is redirecred to the "Login" page, "Username" and "Password" fields are empty
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        await browser.pause(2000);
        const userNameField = await $('#user-name');
        await expect(userNameField).toHaveValue('');
        const passwordField = await $('#password');
        await expect(passwordField).toHaveValue('');

        // Check when Login user is redirected to the inventory page. Products and cart are displayed
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        const productsBlock = await $('#header_container');
        await expect(productsBlock).toBeDisplayed();
        await expect(productsBlock).toHaveTextContaining('Products');
        const cartIcon = await $('#shopping_cart_container');
        await expect(cartIcon).toBeDisplayed();

        // Check if click on the cart the Cart page is displayed, product is the same as was added at step 1
        await $('.shopping_cart_link').click();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(cartList).toHaveTextContaining(productAddToCartName);
    })

    it('Test case #6 Sorting', async () => {
        await browser.url(`https://www.saucedemo.com/`);
        await LoginPage.login('standard_user', 'secret_sauce');

        await browser.pause(2000);
        // Check if user is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        const sortingBox = await $('.product_sort_container');
        await sortingBox.selectByAttribute('value','lohi');
        await browser.pause(2000);
        const inventoryList = await $('.inventory_list');
        const firstElLoHi = await inventoryList.$$('.inventory_item')[0].$('.inventory_item_description').$('.inventory_item_price').getText();
        await expect(firstElLoHi).toHaveText('$7.99');
    })
})

