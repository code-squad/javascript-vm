class CoinCountView{
    constructor(){
        this.insertCoinHandler = null;
        this.coinCount = null;
        this.clickCoinBtns();
    }
    clickCoinBtns(){
        const currentCoins = document.querySelector(".wallet > ul");
        currentCoins.addEventListener("click", ({target})=>{
            if(target.className !== "basic-button insert-coin-button")return ;            
            const coin = +target.dataset.coin;
            if(this.coinCount[coin] === 0) return ;
            this.insertCoinHandler(coin);
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

