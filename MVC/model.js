class VendingMachineModel {
    constructor() {
        this.walletMoney = 0;
        this.investedMoney = 0;
        

        console.log("Success Exit - Model Constructor");
    }

    /*
        INPUT: NONE
        OUTPUT: currentMoney (현재 돈)
        DESCRIPTION: 현재 가지고 있는 돈을 반환하는 함수입니다
    */
    getWalletMoney() {
        return this.walletMoney;
    }

    /*
        INPUT: money (투입된 돈)
        OUTPUT: none
        DESCRIPTION: 현재 가지고 있는 돈을 증가시키는 함수입니다
    */
    increaseWalletMoney(money) {
        this.walletMoney += money;
    }

    decreaseWalletMoney(money) {
        this.walletMoney -= money;
    }

    getInvestedMoney() {
        return this.investedMoney;
    }

    increaseInvestedMoney(money) {
        this.investedMoney += money;
    }

}