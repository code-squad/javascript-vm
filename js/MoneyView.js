export default class MoneyView{
    constructor(){
        this.inputMoneyHandler = null;
        this.returnMoneyHandler = null;
        this.delayReturnMoneyId = 0;
    }
    setMoneyData({inputMoney, yourMoney, coinCount}){
        this.inputMoney = inputMoney;
        this.yourMoney = yourMoney;
        this.coinCount = coinCount;
    }
    walletView(){
        document.querySelector(".your-money").innerText = this.yourMoney + "원";
    }
    inputMoneyView(){
        document.querySelector(".input-money").innerText = this.inputMoney + "원";
        this.inputMoneyHandler();
    }
    returnMoney(){
        if( this.inputMoney <= 0)return ;
        const moneyUnit = Object.keys(this.coinCount).sort((a,b) => b-a);
        let temp = this.inputMoney;
        this.delayReturnMoneyId = this.delayReturnMoney(moneyUnit,temp);
    }
    delayReturnMoney(moneyUnit,temp){
        return setTimeout(()=>{
            moneyUnit.forEach(v=>{
                this.coinCount[v] += Math.floor(temp/v);
                temp %= v;
            })
            this.returnMoneyHandler(this.inputMoney, this.coinCount);
            this.walletView();
            this.inputMoneyView();
        },'3000');
    }
    stopReturnMoney(){
        clearTimeout(this.delayReturnMoneyId);
    }
}