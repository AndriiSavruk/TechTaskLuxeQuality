import { $ } from '@wdio/globals'

class CartPage {

    get cartList () {
        return $('.cart_list');
    }

    get burgerButton () {
        return $('#react-burger-menu-btn');
    }

    get burgerMenu () {
        return $('//*[@id="menu_button_container"]/div/div[2]/div[1]/nav');
    }

    get logoutButton () {
        return $('#logout_sidebar_link');
    }

    get removeBackpack () {
        return $('#remove-sauce-labs-backpack');
    }

    async clickOnBurgerButton() {
        await this.burgerButton.click();
    }

    async clickOnLogoutButton() {
        await this.logoutButton.click();
    }

    async clickOnRemoveBackpack() {
        await this.removeBackpack.click();
    }
}

export default new CartPage();