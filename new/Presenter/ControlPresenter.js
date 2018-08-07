class VendingMachineControlPresenter {
    constructor(model, view) {

        this.model = model;
        this.controlView = view.getControlView();
        this.util = new Utility();

    }

    refreshInvestedMoney(money) {
        let currentInvestedMoney = this.model.getInvestedMoney();
        this.controlView.refreshInvestedMoneyInVendingMachine(currentInvestedMoney);
    }

    



}