class VendingMachineMoneyPresenter {
    constructor(model, view) {

        this.model = model;

        this.util = new Utility();

        this.itemView = view.getItemView();
        this.moneyView = view.getMoneyView();

        this.moneyView.registerClickEventToInsertMoneyBtn();

    }



    /**
     * 자판기에 돈을 투입합니다
     * @param {number} money - 금액 데이터
     */
    insertMoneyToVendingMachine(money) {
        this.model.decreaseWalletMoney(money);
        if (this.exceptionView.doInsertMoneyException(money)) return;
        this.model.increaseInvestedMoney(money);
        this.viewUpdate.refreshInvestedMoneyInVendingMachine();
        
        this.viewUpdate.refreshWalletMoney();
        this.displayLog(money, 'input');
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



}