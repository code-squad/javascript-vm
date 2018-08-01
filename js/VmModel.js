class VmModel{
    constructor(walletData){
        this.yourMoney = walletData.total;
        this.coinCount = walletData;
        delete walletData.total;
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
        this.coinCount[coin]--;
    }
    selectItem(coin){
        this.inputMoney -= coin;
    }
    getCoinCount(){
        return this.coinCount;
    }
}