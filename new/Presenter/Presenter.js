class VendingMachinePresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.itemView = view.getItemView();
        this.moneyView = view.getMoneyView();
        this.refreshView = view.getRefreshView();

        this.itemPresenter = new VendingMachineItemPrsenter(model, view);
        this.moneyPresenter = new VendingMachineMoneyPresenter(model, view);
        this.refreshPresenter = new VendingMachineRefreshPresenter(model, view);
    }

    initProcess() {
        this.model.increaseWalletMoney(10000);
        let walletMoney = this.model.getWalletMoney();
        this.refreshView.refreshWalletMoney(walletMoney);
    }



}