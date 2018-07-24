function getCurrentMoney(){
    const currentMoneyStr = document.querySelector('.your-money').innerText;
    const currentMoney = +currentMoneyStr.slice(0, currentMoneyStr.length-1);
    return currentMoney;
}

const vmModel = new VmModel(getCurrentMoney());
const coinCountView = new CoinCountView();
const moneyView = new MoneyView();
const vmController = new VmController(vmModel, coinCountView, moneyView);