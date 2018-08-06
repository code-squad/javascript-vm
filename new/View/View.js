class VendingMachineView {
    constructor() {
        this.presenter;
        this.moneyView = new VendingMachineMoneyView(this);
        this.itemView = new VendingMachineItemView();
        this.refreshView = new VendingMachineRefreshView();
    }

    getMoneyView() {
        return this.moneyView;
    }

    getItemView() {
        return this.itemView;
    }

    getRefreshView() {
        return this.refreshView;
    }

    setPresenter(presenter) {
        this.presenter = presenter;
    }

    getPresenter(presenter) {
        return this.presenter;
    }



}