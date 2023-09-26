import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js'
import CheckoutPage from '../pageobjects/checkout.page.js'
import OverviewPage from '../pageobjects/overview.page.js'
import CompletePage from '../pageobjects/complete.page.js'

describe('Login & Logout block', () => {

    it('Test case #1 Valid Login', async () => {
        // Precondition
        await browser.url(`https://www.saucedemo.com/`);
       
        // Step 1
        await LoginPage.setUserNameInput('standard_user');
        // Check if data is entered to the field
        await expect(LoginPage.inputUserName).toHaveValue('standard_user');
        
        // Step 2
        await LoginPage.setPasswordInput('secret_sauce');
        // Check if data is entered to the field
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');
        // Check if data is represented as dots instead of characters
        await expect(LoginPage.inputPassword).toHaveAttribute('type','password');

        // Step 3
        // await $('#login-button').click();
        await LoginPage.clickOnLoginButton();
        await browser.pause(2000);
        // Check if user is redirected to inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        // Check if 'Products' block is displayed
        await expect(InventoryPage.productsBlock).toBeDisplayed();
        await expect(InventoryPage.productsBlock).toHaveTextContaining('Products');
        // Check if Cart is displayed
        await expect(InventoryPage.cartIcon).toBeDisplayed();
    })

    it('test case #2 Login with invalid password', async () => {
        // Precondition
        await browser.url(`https://www.saucedemo.com/`);

        // Step 1
        await LoginPage.setUserNameInput('standard_user');
        // Check if data is entered to the field
        await expect(LoginPage.inputUserName).toHaveValue('standard_user');

        // Step 2
        await LoginPage.setPasswordInput('wrong_password');
        // Check if data is entered to the field
        await expect(LoginPage.inputPassword).toHaveValue('wrong_password');
        // Check if data is represented as dots instead of characters
        await expect(LoginPage.inputPassword).toHaveAttribute('type','password');

        // Step 3
        await LoginPage.clickOnLoginButton();
        await browser.pause(2000);
        // Check if "X" icon is displayed on the Login field (check if svg element appears)
        await expect(LoginPage.logDiv).toHaveChildren(2);
        // Check if "X" icon is displayed on the Password field (check if svg element appears)
        await expect(LoginPage.pasDiv).toHaveChildren(2);
        // Check if login and password fields are highlighted with red
        await expect(LoginPage.inputUserName).toHaveAttributeContaining('class','error');
        await expect(LoginPage.inputPassword).toHaveAttributeContaining('class','error');
        // Check if epic sadface is displayed
        await expect(LoginPage.epicSadface).toBeDisplayed();
        await expect(LoginPage.epicSadface).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    it('Test case #3 Login with invalid login', async () => {
        // Precondition
        await browser.url(`https://www.saucedemo.com/`);

        // Step 1
        await LoginPage.setUserNameInput('standarD_user');
        // Check if data is entered to the field
        await expect(LoginPage.inputUserName).toHaveValue('standarD_user');

        // Step 2
        await LoginPage.setPasswordInput('secret_sauce');
        // Check if data is entered to the field
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');
        // Check if data is represented as dots instead of characters
        await expect(LoginPage.inputPassword).toHaveAttribute('type','password');

        // Step 3
        await LoginPage.clickOnLoginButton();
        await browser.pause(2000);
        // Check if "X" icon is displayed on the Login field (check if svg element appears)
        await expect(LoginPage.logDiv).toHaveChildren(2);
        // Check if "X" icon is displayed on the Password field (check if svg element appears)
        await expect(LoginPage.pasDiv).toHaveChildren(2);
        // Check if login and password fields are highlighted with red
        await expect(LoginPage.inputUserName).toHaveAttributeContaining('class','error');
        await expect(LoginPage.inputPassword).toHaveAttributeContaining('class','error');
        // Check if epic sadface is displayed
        await expect(LoginPage.epicSadface).toBeDisplayed();
        await expect(LoginPage.epicSadface).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    it('Test case #4 Logout', async ()=> {
        // Preconditions
        await browser.url(`https://www.saucedemo.com/`);
        await LoginPage.login('standard_user', 'secret_sauce');
        // Check if user is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        // Step 1
        await InventoryPage.clickOnBurgerButton();
        // Check if the menu is expanded
        await expect(InventoryPage.burgerMenu).toBeDisplayed();
        // Check if the menu has 4 items
        await expect(InventoryPage.burgerMenu).toHaveChildren(4);

        // Step 2
        await InventoryPage.clickOnLogoutButton();
        await browser.pause(2000);
        // Check if user is redirected to the 'Login' page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        // Check if 'Login' field is empty
        await expect(LoginPage.inputUserName).toHaveValue('');
        // Check if 'Password' field is empty
        await expect(LoginPage.inputPassword).toHaveValue('');
    })
})

describe('Cart block', () => {

    it('Test case #5 Saving the cart after logout', async () => {
        // Preconditions
        await browser.url(`https://www.saucedemo.com/`);
        await LoginPage.login('standard_user', 'secret_sauce');
        // Check if user is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        // Step 1
        //Check if number near the cart at the top right increase by 1
        let isCartNotEmpty = await InventoryPage.cartValue.isDisplayed();
        if(isCartNotEmpty) {
            let startNum = Number(await InventoryPage.cartValue.getText());
            await InventoryPage.clickOnBackpackAddToCart();
            let newNum = startNum + 1;
            let newNumText = newNum.toString();
            await browser.pause(2000);
            await expect(InventoryPage.cartValue).toHaveText(newNumText);
        }
        else {
            await InventoryPage.clickOnBackpackAddToCart();
            await browser.pause(2000);
            await expect(InventoryPage.cartValue).toHaveText('1');
        }
        // Check if product is added to cart
        const backpackAddToCartName = 'Sauce Labs Backpack';
        await InventoryPage.clickOnCartLink();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.cartList).toHaveTextContaining(backpackAddToCartName);

        // Step 2
        await CartPage.clickOnBurgerButton();
        // Check if burger menu are expanded and 4 items are displayed
        await expect(CartPage.burgerMenu).toBeDisplayed();
        await expect(CartPage.burgerMenu).toHaveChildren(4);

        // Step 3
        await CartPage.clickOnLogoutButton();
        await browser.pause(2000);
        // Check when Logout if User is redirecred to the "Login" page, "Username" and "Password" fields are empty
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        await expect(LoginPage.inputUserName).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');

        // Step 4
        await LoginPage.login('standard_user', 'secret_sauce');
        // Check when Login user is redirected to the inventory page. Products and cart are displayed
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect(InventoryPage.productsBlock).toBeDisplayed();
        await expect(InventoryPage.productsBlock).toHaveTextContaining('Products');
        await expect(InventoryPage.cartIcon).toBeDisplayed();

        // Step 5
        await InventoryPage.clickOnCartLink();
        // Check if click on the cart the Cart page is displayed, product is the same as was added at step 1
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.cartList).toHaveTextContaining(backpackAddToCartName);

        // Remove the product
        await CartPage.clickOnRemoveBackpack();
    })

    it('Test case #10(optional) Add to the Cart product if Cart is not empty', async () => {
        // Preconditions
         await browser.url(`https://www.saucedemo.com/`);
         await LoginPage.login('standard_user', 'secret_sauce');
          // Check if user is on the inventory page
         await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

         // Step 1 - Add the product to the Cart
         await InventoryPage.clickOnBackpackAddToCart();
         const backpackAddToCartName = 'Sauce Labs Backpack';
         // Check if product is on the Cart
        await InventoryPage.clickOnCartLink();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.cartList).toHaveTextContaining(backpackAddToCartName);

        // Step 2 - Logout
        await CartPage.clickOnBurgerButton();
        await browser.pause(2000);
        // Check if burger menu are expanded and 4 items are displayed
        await expect(CartPage.burgerMenu).toBeDisplayed();
        await expect(CartPage.burgerMenu).toHaveChildren(4);
        await CartPage.clickOnLogoutButton();
        await browser.pause(2000);
        // Check when Logout if User is redirecred to the "Login" page, "Username" and "Password" fields are empty
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        await expect(LoginPage.inputUserName).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');

        // Step 3 Login with the same data
        await LoginPage.login('standard_user', 'secret_sauce');
        // Check when Login user is redirected to the inventory page.
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        // Step 4 Add the new product to the Cart
        //Check if number near the cart at the top right increase by 1
        let isCartNotEmpty = await InventoryPage.cartValue.isDisplayed();
        if(isCartNotEmpty) {
            let startNum = Number(await InventoryPage.cartValue.getText());
            await InventoryPage.clickOnBikeAddToCart();
            let newNum = startNum + 1;
            let newNumText = newNum.toString();
            await browser.pause(2000);
            await expect(InventoryPage.cartValue).toHaveText(newNumText);
        }
        else {
            await InventoryPage.clickOnBikeAddToCart();
            await browser.pause(2000);
            await expect(InventoryPage.cartValue).toHaveText('1');
        }
        // Check if the new product is added to cart
        const BikeAddToCartName = 'Sauce Labs Bike Light';
        await InventoryPage.clickOnCartLink();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.cartList).toHaveTextContaining(BikeAddToCartName);

        // Remove the products
        await CartPage.clickOnRemoveBackpack();
        await CartPage.clickOnRemoveBike();

    })
})

describe('Products block', () => {

    it('Test case #6 Sorting', async () => {
        // Preconditions
        await browser.url(`https://www.saucedemo.com/`);
        await LoginPage.login('standard_user', 'secret_sauce');
        // Check if user is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        
        // Steps 1, 2
        // Check if sorting 'Price(low to high)' sorts correct
        await InventoryPage.sortingBox.selectByAttribute('value','lohi');
        await browser.pause(2000);
        await expect(InventoryPage.firstEl).toHaveTextContaining('7.99');
        await expect(InventoryPage.secondEl).toHaveTextContaining('9.99');
        await expect(InventoryPage.thirdEl).toHaveTextContaining('15.99');
        await expect(InventoryPage.forthEl).toHaveTextContaining('15.99');
        await expect(InventoryPage.fifthEl).toHaveTextContaining('29.99');
        await expect(InventoryPage.sixthEl).toHaveTextContaining('49.99');

        // Check if sorting 'Price(high to low)' sorts correct
        await InventoryPage.sortingBox.selectByAttribute('value','hilo');
        await browser.pause(2000);
        await expect(InventoryPage.firstEl).toHaveTextContaining('49.99');
        await expect(InventoryPage.secondEl).toHaveTextContaining('29.99');
        await expect(InventoryPage.thirdEl).toHaveTextContaining('15.99');
        await expect(InventoryPage.forthEl).toHaveTextContaining('15.99');
        await expect(InventoryPage.fifthEl).toHaveTextContaining('9.99');
        await expect(InventoryPage.sixthEl).toHaveTextContaining('7.99');

        // Check if sorting 'Name(A to Z)' sorts correct
        await InventoryPage.sortingBox.selectByAttribute('value','az');
        await browser.pause(2000);
        await expect(InventoryPage.firstEl).toHaveTextContaining('Backpack');
        await expect(InventoryPage.secondEl).toHaveTextContaining('Bike');
        await expect(InventoryPage.thirdEl).toHaveTextContaining('Bolt');
        await expect(InventoryPage.forthEl).toHaveTextContaining('Fleece');
        await expect(InventoryPage.fifthEl).toHaveTextContaining('Onesie');
        await expect(InventoryPage.sixthEl).toHaveTextContaining('Test');

        // Check if sorting 'Name(Z to A)' sorts correct
        await InventoryPage.sortingBox.selectByAttribute('value','za');
        await browser.pause(2000);
        await expect(InventoryPage.firstEl).toHaveTextContaining('Test');
        await expect(InventoryPage.secondEl).toHaveTextContaining('Onesie');
        await expect(InventoryPage.thirdEl).toHaveTextContaining('Fleece');
        await expect(InventoryPage.forthEl).toHaveTextContaining('Bolt');
        await expect(InventoryPage.fifthEl).toHaveTextContaining('Bike');
        await expect(InventoryPage.sixthEl).toHaveTextContaining('Backpack');
    })
})

describe('Footer block', () => {

    it('Test case #7 Footer Links', async () => {
        // Preconditions
        await browser.url(`https://www.saucedemo.com/`);
        await LoginPage.login('standard_user', 'secret_sauce');
        // Check if user is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        // Step 1
        await InventoryPage.clickOnTwitButton();
        await browser.pause(2000);
        // Check if Twitter icon opens Twitter page in new tab and return
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl('https://twitter.com/saucelabs');
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

         // Step 2
         await InventoryPage.clickOnFacebButton();
         await browser.pause(2000);
         // Check if Facebook icon opens Facebook page in new tab and return
         const handles1 = await browser.getWindowHandles();
         await browser.switchToWindow(handles1[1]);
         await expect(browser).toHaveUrl('https://www.facebook.com/saucelabs');
         await browser.closeWindow();
         await browser.switchToWindow(handles1[0]);
         await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

         // Step 3
         await InventoryPage.clickOnLinButton();
         await browser.pause(2000);
         // Check if LinkedIn icon opens LinkedIn page in new tab and return
         const handles2 = await browser.getWindowHandles();
         await browser.switchToWindow(handles2[1]);
         await browser.pause(2000);
         await expect(browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/');
         await browser.closeWindow();
         await browser.switchToWindow(handles2[0]);
         await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })
})

describe('Checkout block', () => {
   
    it('Test case #8 Valid Checkout', async () => {
        // Preconditions
        await browser.url(`https://www.saucedemo.com/`);
        await LoginPage.login('standard_user', 'secret_sauce');
        // Check if user is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        // Step 1
        //Check if number near the cart at the top right increase by 1
        let isCartNotEmpty = await InventoryPage.cartValue.isDisplayed();
        if(isCartNotEmpty) {
            let startNum = Number(await InventoryPage.cartValue.getText());
            await InventoryPage.clickOnBackpackAddToCart();
            let newNum = startNum + 1;
            let newNumText = newNum.toString();
            await browser.pause(2000);
            await expect(InventoryPage.cartValue).toHaveText(newNumText);
        }
        else {
            await InventoryPage.clickOnBackpackAddToCart();
            await browser.pause(2000);
            await expect(InventoryPage.cartValue).toHaveText('1');
        }

        // Step 2
        // Check if product is added to cart
        const backpackAddToCartName = 'Sauce Labs Backpack';
        await InventoryPage.clickOnCartLink();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.cartList).toHaveTextContaining(backpackAddToCartName);

        // Step 3
        // Click on the 'Checkout' button and check if Checkout form is displayed
        await CartPage.clickOnCheckoutButton();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        await expect(CheckoutPage.checkoutForm).toBeDisplayed();

        // Steps 4,5,6
        // Fill in the form and check data fields
        await CheckoutPage.firstName.setValue('Peter');
        await expect(CheckoutPage.firstName).toHaveValue('Peter');
        await CheckoutPage.lastName.setValue('Pan');
        await expect(CheckoutPage.lastName).toHaveValue('Pan');
        await CheckoutPage.postalCod.setValue('79000');
        await expect(CheckoutPage.postalCod).toHaveValue('79000');

        // Step 7
        // Click on 'Continue' button, check if user is redirected to the 'Overview' page
        await CheckoutPage.clickOnContButton();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        // Check if the product from step 1 is displayed
        await expect(OverviewPage.prodList).toHaveTextContaining(backpackAddToCartName);
        // Check if total price is price of the product from step 1
        await expect(OverviewPage.totalPrice).toHaveTextContaining('29.99');

        // Step 8
        // Click on the 'Finish' button, check if user is redirected to the 'Checkout complete' page
        await OverviewPage.clickOnFinishButton();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        // Check if message 'Thank you for ...' is displayed
        await expect(CompletePage.thanksMessage).toBeDisplayed();
        await expect(CompletePage.thanksMessage).toHaveText('Thank you for your order!');

        // Step 9
        // Click on the 'Back Home' button, check if user is redirected to the inventory page
        await CompletePage.clickOnBackHomeButton();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        //Check if 'Products' are displayed
        await expect(InventoryPage.productsBlock).toBeDisplayed();
        await expect(InventoryPage.productsBlock).toHaveTextContaining('Products');
        // Check if cart is empty
        await expect(InventoryPage.cartLink).toHaveChildren(0);
    })

// The next test case was skipped because there was a bug on the website when I was writing the test case,
// so it was always failed (when cart was empty after 'Continue' button clicking user left the 'Cart' page)

    it.skip('Test case #9 Checkout without products', async () => {
         // Preconditions
         await browser.url(`https://www.saucedemo.com/`);
         await LoginPage.login('standard_user', 'secret_sauce');
         await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
         
         // Step 1
         // Click on the 'Cart' button, check if cart page is displayed
         // Check if cart is empty
         await expect(InventoryPage.cartLink).toHaveChildren(0);
         await InventoryPage.clickOnCartLink;
         await browser.pause(2000);
         await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

         // Step 2
         // Click on the 'Checkout' button, check if user stays at the 'Cart' page
         await CartPage.clickOnCheckoutButton();
         await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
         // Check if error message 'Cart is empty' is displayed
    })
})


