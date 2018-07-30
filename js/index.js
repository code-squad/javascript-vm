const walletData = {
    total : 30000,
    10000 : 1,
    5000 : 2,
    1000 : 5,
    500 : 8,
    100 : 10
}

const itemList = templateItemList(itemData);
const menuView = new MenuView(itemList);
const vmModel = new VmModel(walletData);
const coinCountView = new CoinCountView();
const moneyView = new MoneyView();
const vmController = new VmController(menuView ,vmModel, coinCountView, moneyView);