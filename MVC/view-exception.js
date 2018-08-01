class VendingMachineExceptionView {
    /** 
     * VIEW 에서 발생하는 Exception을 처리하는 Class 입니다
    */
    constructor(model, util, viewUpdate) {
        this.model = model;
        this.viewUtil = util;
        this.viewUpdate = viewUpdate;
    }

    /**
     * 돈을 추가하는 과정에서 예외처리를 처리합니다
     * @param {number} money
     */
    doInsertMoneyException(money) {
        if (this.viewUtil.checkWalletMoneyMinus()) {
            this.model.increaseWalletMoney(money);
            this.viewUpdate.showAlertMsg('walletMoneyShortage', 1500);
            return true;
        }
    }

    /**
     * 상품을 구입하는 과정에서 예외를 처리합니다
     * @param {number} id - 현재 선택된 ID
     * @param {price} price - 현재 선택된 상품의 가격
     */
    doProductPurchaseException(id, price) {
        if (! this.viewUtil.checkCorrectSelectedProductNum(id, 1, 32)) {
            this.viewUpdate.showAlertMsg('nonExistProduct', 1500);
            return true;
        }
        if (! this.viewUtil.checkPossiblePurchase(price)) {
            this.viewUpdate.showAlertMsg('investedMoneyShortage', 1500);
            return true;
        }
    }

    /** 
     * 반환하는 과정에서 예외사항을 처리합니다.
     */
    doRefundException(money) {
        if (money === 0) return true;
    }

}