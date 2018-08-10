export default class MoneyView{
    constructor(){
        this.inputMoneyHandler = null;
        this.returnMoneyHandler = null;
        this.insertCoinHandler = null;    
        this.showNoMoneyHandler = null;
        this.delayReturnMoneyId = 0;
        this.clickCoinBtns();
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
    walletCoinView(){
        let insertCoinBtn = document.querySelectorAll(".insert-coin-button");
        insertCoinBtn = Array.from(insertCoinBtn);
        insertCoinBtn.forEach(v=>{
            v.nextElementSibling.innerHTML = this.coinCount[v.dataset.coin] + "개";
        })
    }
    moneyView(){
        this.walletView();
        this.inputMoneyView();
        this.walletCoinView();
    }
    clickCoinBtns(){
        const currentCoins = document.querySelector(".wallet > ul");
        currentCoins.addEventListener("click", ({target})=>{
            if(!target.getAttribute("data-coin"))return ;
            this.stopReturnMoney()        
            const coin = +target.getAttribute("data-coin");
            if(this.coinCount[coin] === 0){
                this.showNoMoneyHandler(coin);
                return ;
            }
            this.insertCoinHandler(coin);
            this.moneyView();
        })
    }
    returnMoney(){
        this.delayReturnMoneyId = setTimeout(()=>{
            this.returnMoneyHandler();
            this.moneyView();
        },'3000');
    }
    stopReturnMoney(){
        clearTimeout(this.delayReturnMoneyId);
    }
}