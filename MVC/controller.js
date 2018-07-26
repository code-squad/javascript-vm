class VendingMachineController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.insertMoneyToWallet(10000);

        console.log("Success Exit - Controller Constructor");
    }

    
}