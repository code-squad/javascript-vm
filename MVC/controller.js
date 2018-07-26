class VendingMachineController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initProcess();

        console.log("Success Exit - Controller Constructor");
    }

    initProcess() {
        this.view.insertMoneyToWallet(10000);
    }

    
}