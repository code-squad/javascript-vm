class VmController{
    constructor(model, insertCoinView, moneyView){
        this.model = model;
        this.insertCoinView = insertCoinView;
        this.moneyView = moneyView;
        this.insertCoinView.insertCoinHandler = this.insertCoinHandler.bind(this);
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
const insertCoinView = new InsertCoinView();
const moneyView = new MoneyView();
const vmController = new VmController(vmModel, insertCoinView, moneyView);