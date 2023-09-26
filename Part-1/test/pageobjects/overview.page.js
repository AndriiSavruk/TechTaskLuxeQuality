import { $ } from '@wdio/globals'

class OverviewPage {

    get prodList () {
        return $('.cart_list');
    }

    get totalPrice () {
        return $('.summary_subtotal_label');
    }

    get finishButton () {
        return $('#finish');
    }

    async clickOnFinishButton() {
        await this.finishButton.click();
    }
}

export default new OverviewPage();