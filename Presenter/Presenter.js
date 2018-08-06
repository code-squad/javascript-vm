class VendingMachinePresenter {

    constructor() {

    }

    /* Item Presenter */

    /* Function Presenter */

    /* Wallet Presenter */

    /* ETC */

    /** 
     * 상품을 구매하는 타이머를 시작합니다
     * @param {number} time
     */
    startProductPurchaseTimer(time) {
        let productPurchaseTimerID = setTimeout(() => {
            let currentEnteredProductID = this.model.getCurrentSelectedNumTxt();
            let selectedProductPrice = this.model.getItemPrice(Number(currentEnteredProductID));

            if (this.exceptionView.doProductPurchaseException(currentEnteredProductID, selectedProductPrice)) return;
            this.excuteProductPurchaseHandler(currentEnteredProductID, selectedProductPrice);
        }, time);
        this.model.setProductVerificationTimerID(productPurchaseTimerID);
    }

    /**
     * 투입된 금액을 반환하는 타이머를 시작합니다
     * @param {number} time
     */
    startRefundInvestedMoneyTimer(time) {
        let refundTimerID = setTimeout(() => {
            const currentInvestedMoney = this.model.getInvestedMoney();
            this.excuteRefundMoneyProcess(currentInvestedMoney);
            if (this.exceptionView.doRefundException(currentInvestedMoney)) return;
            this.displayLog(currentInvestedMoney, 'refund');
            this.refreshView();
        }, time);
        this.model.setRefundTimerID(refundTimerID);
    }

    /** 
     * 돈을 반환하는 과정을 실행합니다
     * @param {number} money - 현재 투입된 금액
    */
    excuteRefundMoneyProcess(money) {
        this.model.decreaseInvestedMoney(money);
        this.model.increaseWalletMoney(money);
    }


}