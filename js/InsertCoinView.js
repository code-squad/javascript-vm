class CoinCountView{
    constructor(){
        this.insertCoinHandler = null;
        this.coinCount = null;
        this.clickCoinBtns();
    }
    clickCoinBtns(){
        const selectCoinBtns = document.querySelector(".wallet > ul");
        selectCoinBtns.addEventListener("click", ({target})=>{
            if(target.className !== "basic-button insert-coin-button")return ;            
            const coin = +target.dataset.coin;
            if(this.coinCount[coin] === 0) return ;
            this.insertCoinHandler(coin);
        })
    }
    walletCoinView(){
        let coin = document.querySelectorAll(".insert-coin-button");
        coin = Array.from(coin);
        coin.forEach(v=>{
            v.nextElementSibling.innerHTML = this.coinCount[v.dataset.coin] + "개";
        })
    }
}

