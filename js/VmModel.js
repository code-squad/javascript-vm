class VmModel{
    constructor(){
        this.yourMoney = this.currentMoney();
        this.inputMoney = 0;
    }
    currentMoney(){
        const str = document.querySelector(".your-money").innerText;
        const currentMoney = str.slice(0, str.length-1);
        return +currentMoney;
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