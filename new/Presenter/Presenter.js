class VendingMachinePresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.itemPresenter = new this.itemPresenter(model, view);
        this.moneyPresenter = new this.moneyPresenter(model, view);
        this.refreshPresenter = new this.refreshPresenter(model, view);
    }

    initProcess() {
        
    }



}