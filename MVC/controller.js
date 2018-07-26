class VendingMachineController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.insertMoney(10000);
        console.log(model.getCurrentMoney());

        console.log("Success Exit - Controller Constructor");
    }

    
}