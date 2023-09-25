import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUserName () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    get logDiv () {
        return $('//*[@id="login_button_container"]/div/form/div[1]');
    }

    get epicSadface () {
        return $('//*[@id="login_button_container"]/div/form/div[3]/h3');
    }

    get pasDiv () {
        return $('//*[@id="login_button_container"]/div/form/div[2]');
    }

    async setUserNameInput(value) {
        await this.inputUserName.setValue(value)
    }

    async setPasswordInput(value) {
        await this.inputPassword.setValue(value)
    }

    async clickOnLoginButton() {
        await this.btnSubmit.click()
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUserName.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open();
    }
}

export default new LoginPage();

