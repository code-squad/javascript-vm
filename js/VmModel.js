class VmModel{
    constructor(currentMoney){
        this.yourMoney = currentMoney
        this.inputMoney = 0;
    }
    getYourMoney(){
        return this.yourMoney;
    }
    getInputMoney(){
        return this.inputMoney;
    }
    insertCoin(coin){
        this.yourMoney -= coin;
        this.inputMoney += coin;
    }
}