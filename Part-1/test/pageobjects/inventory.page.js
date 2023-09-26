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

    get sortingBox () {
        return $('.product_sort_container');
    }

    get firstEl () {
        return $('.inventory_list').$$('.inventory_item')[0];
    }

    get secondEl () {
        return $('.inventory_list').$$('.inventory_item')[1];
    }

    get thirdEl () {
        return $('.inventory_list').$$('.inventory_item')[2];
    }

    get forthEl () {
        return $('.inventory_list').$$('.inventory_item')[3];
    }

    get fifthEl () {
        return $('.inventory_list').$$('.inventory_item')[4];
    }

    get sixthEl () {
        return $('.inventory_list').$$('.inventory_item')[5];
    }

    get twitButton () {
        return $('//*[@id="page_wrapper"]/footer/ul/li[1]/a');
    }

    get facebButton () {
        return $('//*[@id="page_wrapper"]/footer/ul/li[2]/a');
    }

    get linButton () {
        return $('//*[@id="page_wrapper"]/footer/ul/li[3]/a');
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

    async clickOnTwitButton() {
        await this.twitButton.click();
    }

    async clickOnFacebButton() {
        await this.facebButton.click();
    }

    async clickOnLinButton() {
        await this.linButton.click();
    }
}

export default new InventoryPage();