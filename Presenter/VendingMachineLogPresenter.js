class VendingMachineLogPresenter {
    constructor(model) {
        this.model = model;
    }

    sendLogDataToModel(logData) {
        this.model.insertLogData(logData);
    }

}

export { VendingMachineLogPresenter }