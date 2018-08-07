class VendingMachineLogPresenter {
    constructor(model, view) {
        
        this.model = model;
        this.util = new Utility();

        this.logView = view.getLogView();

    }

    insertMoneyLog(money, mode) {
        let logData = this.createLogData(money, mode);
        this.logView.displayLog(logData, 'input');
    }

    createLogData(money, mode) {
        let logData = this.util.addLogSentenceText(money, mode);
        this.model.insertLogData(logData);
        return logData;
    }




    
}