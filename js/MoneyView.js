class MoneyView{
    constructor(){
        this.yourMoney = null;
        this.inputMoney = null;
    }
    walletView(){
        console.log("현재 돈 : "+this.yourMoney);
        document.querySelector(".your-money").innerText = this.yourMoney + "원";
    }
    inputMoneyView(){
        console.log("자판기에 넣은 돈 : "+this.inputMoney);
        document.querySelector(".input-money").innerText = this.inputMoney + "원";
    }
}