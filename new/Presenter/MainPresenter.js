class VendingMachineMainPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.itemView = view.getItemView();
        this.walletView = view.getWalletView();
        this.controlView = view.getControlView();
        this.logView = view.getLogView();

        this.itemPresenter = new VendingMachineItemPrsenter(model, view);
        this.walletPresenter = new VendingMachineWalletPresenter(model, view);
        this.controlPresenter = new VendingMachineControlPresenter(model, view);
        this.logPresenter = new VendingMachineLogPresenter(model, view);
    }

    initProcess() {
        this.model.increaseWalletMoney(10000);
        let walletMoney = this.model.getWalletMoney();
        this.walletView.refreshWalletMoney(walletMoney);
    }

    getItemPresenter() {
        return this.itemPresenter;
    }

    getWalletPresenter() {
        return this.walletPresenter;
    }

    getControlPresenter() {
        return this.controlPresenter;
    }

    getLogPresenter() {
        return this.logPresenter;
    }



}