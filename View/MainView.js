class VendingMachineMainView {
    constructor() {
        this.presenter;
        this.controlView = new VendingMachineControlView(this);
        this.itemView = new VendingMachineItemView(this);
        this.walletView = new VendingMachineWalletView(this);
        this.logView = new VendingMachineLogView(this);
    }

    /** 
     * @returns Control View 를 반환합니다
    */
    getControlView() {
        return this.controlView;
    }

    /** 
     * @returns Item View 를 반환합니다
     */
    getItemView() {
        return this.itemView;
    }

    /**
     * @returns Wallet View 를 반환합니다
     */
    getWalletView() {
        return this.walletView;
    }

    /**
     * @returns Log View 를 반환합니다
     */
    getLogView() {
        return this.logView;
    }

    /**
     * Presenter 를 지정합니다
     * @param {class} presenter - MainPresenter class
     */
    setPresenter(presenter) {
        this.presenter = presenter;
    }

    /**
     * Presenter 을 반환합니다
     * @returns MainPresenter Class
     */
    getPresenter() {
        return this.presenter;
    }



}