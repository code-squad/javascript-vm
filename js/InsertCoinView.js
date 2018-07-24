class InsertCoinView{
    constructor(){
        this.insertCoinHandler = null;
        this.coinCount = {
            100 : 0,
            500 : 0,
            1000 : 0,
            5000 : 0,
            10000 : 0
        }
        this.clickBtn();
    }
    clickBtn(){
        const btns = document.querySelector(".wallet > ul");
        btns.addEventListener("click", e=>{
            const target = e.target;
            if(target.className === "basic-button insert-coin-button"){
                const coin = +target.dataset.coin;
                console.log("넣은 동전 : " + coin);
                this.plusCoinCount(coin);
                target.nextElementSibling.innerText = this.coinCount[coin] + "개";
                this.insertCoinHandler(coin);
            }
        })
    }
    plusCoinCount(coin){
        this.coinCount[coin]++;
    }
}

