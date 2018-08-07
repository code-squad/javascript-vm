class VendingMachineControlPresenter {
    constructor(model, view) {

        this.model = model;
        this.controlView = view.getControlView();
        this.util = new Utility();

    }

    refreshInvestedMoney(result, money, mode) {
        if (!result) return;
        let currentInvestedMoney = this.model.getInvestedMoney();
        this.controlView.refreshInvestedMoneyInVendingMachine(currentInvestedMoney);
        this.insertLog(money, mode);
    }

    insertLog(money, mode) {
        let logData = this.createLogData(money, mode);
        this.controlView.displayLog(logData, 'input');
    }

    createLogData(money, mode) {
        let logData = this.util.addLogSentenceText(money, mode);
        this.model.insertLogData(logData);
        return logData;
    }

    



}