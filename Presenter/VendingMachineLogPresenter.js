class VendingMachineLogPresenter {
    constructor(model, view) {
        this.model = model;
    }

    sendLogDataToModel(logData) {
        this.model.insertLogData(logData);
    }

}

export { VendingMachineLogPresenter }