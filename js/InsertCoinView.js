class CoinCountView{
    constructor(){
        this.insertCoinHandler = null;
        this.coinCount = null;
        this.stopReturnMoneyHandler = null;        
        this.showNoMoneyHandler = null;
        this.clickCoinBtns();
    }
    clickCoinBtns(){
        const currentCoins = document.querySelector(".wallet > ul");
        currentCoins.addEventListener("click", ({target})=>{
            if(!target.getAttribute("data-coin"))return ;
            this.stopReturnMoneyHandler()        
            const coin = +target.getAttribute("data-coin");
            if(this.coinCount[coin] === 0){
                this.showNoMoneyHandler(coin);
                return ;
            }
            this.insertCoinHandler(coin);
            this.walletCoinView();
        })
    }
    walletCoinView(){
        let insertCoinBtn = document.querySelectorAll(".insert-coin-button");
        insertCoinBtn = Array.from(insertCoinBtn);
        insertCoinBtn.forEach(v=>{
            v.nextElementSibling.innerHTML = this.coinCount[v.dataset.coin] + "개";
        })
    }
}

