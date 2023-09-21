const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals');
  
Given(/^I am on the login page$/, async () => {
	await browser.url('https://www.saucedemo.com/');
});

When(/^I click on 'Login' button$/,  async () => {
	(await $('#login-button')).click();
    await browser.pause(2000);
});

Then(/^I should see 'Epic sadface: Username is required' error message$/, async () => {
	const errorMessage = await $('//*[@id="login_button_container"]/div/form/div[3]/h3');
    await expect(errorMessage).toHaveTextContaining('Epic sadface: Username is required');
});
