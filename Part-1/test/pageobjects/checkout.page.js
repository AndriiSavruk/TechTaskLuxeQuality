import { $ } from '@wdio/globals'

class CheckoutPage {

    get checkoutForm () {
        return $('//*[@id="checkout_info_container"]/div/form');
    }

    get firstName () {
        return $('#first-name');
    }

    get lastName () {
        return $('#last-name');
    }

    get postalCod () {
        return $('#postal-code');
    }

    get contButton () {
        return $('#continue');
    }

    async clickOnContButton() {
        await this.contButton.click();
    }
}

export default new CheckoutPage();