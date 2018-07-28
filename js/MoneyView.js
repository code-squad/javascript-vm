class MoneyView{
    constructor(){
        this.yourMoney = null;
        this.inputMoney = null;
        this.inputMoneyHandler = null;
    }
    walletView(){
        document.querySelector(".your-money").innerText = this.yourMoney + "원";
    }
    inputMoneyView(){
        document.querySelector(".input-money").innerText = this.inputMoney + "원";
        this.inputMoneyHandler();
    }
}