function getCurrentMoney(){
    const currentMoneyStr = document.querySelector('.your-money').innerText;
    const currentMoney = +currentMoneyStr.slice(0, currentMoneyStr.length-1);
    return currentMoney;
}

function addList(data){
    const itemListElement = document.querySelector(".beverage-menu > ul");
    itemListElement.insertAdjacentHTML("beforebegin",data)
}

const itemList = templateItemList(itemData);
addList(itemList);
const vmModel = new VmModel(getCurrentMoney());
const coinCountView = new CoinCountView();
const moneyView = new MoneyView();
const vmController = new VmController(vmModel, coinCountView, moneyView);