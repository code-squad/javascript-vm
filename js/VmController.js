class VmController{
    constructor(model, coinCountView, moneyView){
        this.model = model;
        this.coinCountView = coinCountView;
        this.moneyView = moneyView;
        this.coinCountView.insertCoinHandler = this.insertCoinHandler.bind(this);
    }
    insertCoinHandler(coin){
        this.model.insertCoin(coin);
        this.moneyView.yourMoney = this.model.getYourMoney();
        this.moneyView.inputMoney = this.model.getInputMoney();
        this.moneyView.walletView();
        this.moneyView.inputMoneyView();
    }
}

const vmModel = new VmModel();
const coinCountView = new CoinCountView();
const moneyView = new MoneyView();
const vmController = new VmController(vmModel, coinCountView, moneyView);