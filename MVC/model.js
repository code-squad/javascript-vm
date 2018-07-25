class VendingMachineModel {
    constructor() {
        this.currentMoney = 0;

        console.log("Success Exit - Model Constructor");
    }

    getCurrentMoney() {
        return this.currentMoney;
    }

    increaseCurrentMoney(money) {
        this.currentMoney += money;
    }

}