export default class VmModel{
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
    getCoinCount(){
        return this.coinCount;
    }
    getMoneyData(){
        return {
            inputMoney : this.getInputMoney(),
            yourMoney : this.getYourMoney(),
            coinCount : this.getCoinCount()
        }
    }
    insertCoin(coin){
        this.yourMoney -= coin;
        this.inputMoney += coin;
        this.coinCount[coin]--;
    }
    selectItem(coin){
        this.inputMoney -= coin;
    }
    returnMoney(){
        this.yourMoney += this.inputMoney;
        this.returnCoinCount();        
        this.inputMoney = 0;
    }
    returnCoinCount(){
        let temp = this.inputMoney;
        const coinUnit = Object.keys(this.coinCount).sort((a,b) => b-a);
        coinUnit.forEach(v=>{
            this.coinCount[v] += Math.floor(temp/v);
            temp %= v;
        })
    }
}