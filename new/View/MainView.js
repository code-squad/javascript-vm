class VendingMachineMainView {
    constructor() {
        this.presenter;
        this.controlView = new VendingMachineControlView(this);
        this.itemView = new VendingMachineItemView(this);
        this.walletView = new VendingMachineWalletView(this);
        this.logView = new VendingMachineLogView(this);
    }

    getControlView() {
        return this.controlView;
    }

    getItemView() {
        return this.itemView;
    }

    getWalletView() {
        return this.walletView;
    }

    getLogView() {
        return this.logView;
    }

    setPresenter(presenter) {
        this.presenter = presenter;
    }

    getPresenter(presenter) {
        return this.presenter;
    }



}