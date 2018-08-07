const walletData = {
    total : 30000,
    10000 : 1,
    5000 : 2,
    1000 : 5,
    500 : 8,
    100 : 10
}
const logingBox = document.querySelector('.print-action');

const menuView = new MenuView();
const vmModel = new VmModel(walletData);
const coinCountView = new CoinCountView();
const moneyView = new MoneyView();
const logView = new LogView(logingBox);
const selectItemView = new SelectItemView();
const vmController = new VmController(menuView ,vmModel, coinCountView, moneyView, logView, selectItemView);

document.addEventListener('DOMContentLoaded',()=>{displayItemList()});