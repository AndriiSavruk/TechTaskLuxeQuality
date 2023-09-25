import { $ } from '@wdio/globals'

class InventoryPage {

    get productsBlock () {
        return $('#header_container');
    }

    get cartIcon () {
        return $('#shopping_cart_container');
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

    get backpackAddToCart () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get bikeAddToCart () {
        return $('#add-to-cart-sauce-labs-bike-light');
    }

    get cartValue () {
        return $('.shopping_cart_badge');
    }

    get cartLink () {
        return $('.shopping_cart_link');
    }

    async clickOnBurgerButton() {
        await this.burgerButton.click();
    }

    async clickOnLogoutButton() {
        await this.logoutButton.click();
    }

    async clickOnBackpackAddToCart() {
        await this.backpackAddToCart.click();
    }

    async clickOnBikeAddToCart() {
        await this.bikeAddToCart.click();
    }

    async clickOnCartLink() {
        await this.cartLink.click();
    }
}

export default new InventoryPage();