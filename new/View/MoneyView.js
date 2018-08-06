class VendingMachineMoneyView {
    constructor(view) {
        this.mainView = view;

        this.itemView;

        this.util = new Utility();
    }

    /** 
     * 동전을 투입하는 버튼에 이벤트를 등록합니다
     */
    registerClickEventToInsertMoneyBtn() {
        const moneyInputBtnList = this.util.getNodeData('.ui-item-base', 'all');
        // const investedMoney = this.model.getInvestedMoney();

        for (let node of moneyInputBtnList) {
            if (node.nodeName !== "BUTTON") continue;
            node.addEventListener("click", () => {
                const selectionMoneyNumberData = this.util.sortOutNumber(node.innerText);
                console.log(selectionMoneyNumberData);
                // this.model.decreaseWalletMoney(selectionMoneyNumberData);
                // this.insertMoneyToVendingMachine(selectionMoneyNumberData);
                // this.itemView.showSelctableNodes();
                // this.model.clearTimer(this.model.getRefundTimerID());
            });
        } // for
    } // function

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


    
}