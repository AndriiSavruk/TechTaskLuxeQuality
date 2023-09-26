import { $ } from '@wdio/globals'

class CompletePage {

    get thanksMessage () {
        return $('.complete-header');
    }

    get backHomeButton () {
        return $('#back-to-products');
    }

    async clickOnBackHomeButton() {
        await this.backHomeButton.click();
    }
}

export default new CompletePage();