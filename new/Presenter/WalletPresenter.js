class VendingMachineWalletPresenter {
    constructor(model, view) {

        this.model = model;

        this.util = new Utility();

        this.itemView = view.getItemView();
        this.walletView = view.getWalletView();
        this.controlView = view.getControlView();

        this.walletView.registerClickEventToInsertMoneyBtn();

    }

    /**
     * 자판기에 돈을 투입합니다
     * @param {number} money - 금액 데이터
     */
    insertMoneyToVendingMachine(money) {
        this.model.decreaseWalletMoney(money);
        if (!this.isPossibleInvestMoney(money)) return false;
        this.model.increaseInvestedMoney(money);
        this.walletView.refreshWalletMoney(this.model.getWalletMoney());
        return true;
    }

    /**
     * 투입된 금액이 아이템 가격보다 높은지 확인합니다
     * @param {node} node 
     * @param {number} index
     * @returns true - 투입된 금액 > 아이템 가격 
     */
    isInvestedMoneyHigherThanItemPrice(node, index) {
        let itemPrice;
        const priceRegex = /.*\n+\d+.\s/;
        const investedMoney = this.model.getInvestedMoney();
        
        itemPrice = this.model.getItemPrice[index];
        if (itemPrice === undefined) {
            itemPrice = Number(node.innerText.replace(priceRegex, ''));
            this.model.addItemPrice(index, itemPrice);
        } else {
            itemPrice = this.model.getItemPrice(index);
        }

        return (investedMoney >= itemPrice) ? true : false;
    }

    /* ************ 원래 ViewUtil ************ */

    /** 
     * 지갑의 돈이 마이너스 되는지 검사합니다
     * @return {boolean}
    */
    isWalletMoneyMinus() {
        return this.model.getWalletMoney() < 0;
    }

    /* ************ 원래 Exception ************ */

    /**
     * 돈이 부족한지 확인합니다
     * @param {number} money
     */
    isPossibleInvestMoney(money) {
        if (this.isWalletMoneyMinus()) {
            this.model.increaseWalletMoney(money);
            // this.viewUpdate.showAlertMsg('walletMoneyShortage', 1500);
            alert('지갑에 돈이 부족'); // 일단 구현 (나중에 showAlertMsg 메서드로 대체할 것)
            return false; // 크롱 피드백 적용
        }
        return true;
    }



}