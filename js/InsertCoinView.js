class CoinCountView{
    constructor(){
        this.insertCoinHandler = null;
        this.coinCount = {
            100 : 0,
            500 : 0,
            1000 : 0,
            5000 : 0,
            10000 : 0
        }
        this.clickCoinBtns();
    }
    clickCoinBtns(){
        const selectCoinBtns = document.querySelector(".wallet > ul");
        selectCoinBtns.addEventListener("click", ({target})=>{
            if(target.className !== "basic-button insert-coin-button")return ;            
            const coin = +target.dataset.coin;
            this.plusCoinCount(coin);
            target.nextElementSibling.innerText = this.coinCount[coin] + "개";
            this.insertCoinHandler(coin);
        })
    }
    plusCoinCount(coin){
        this.coinCount[coin]++;
    }
}

