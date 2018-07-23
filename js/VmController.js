class VmController{
    constructor(model, insertCoinView, moneyView){
        this.model = model;
        this.insertCoinView = insertCoinView;
        this.moneyView = moneyView;
        this.insertCoinView.insertCoinHandler = this.insertCoinHandler.bind(this);
    }
    insertCoinHandler(coin){
        this.model.insertCoin(coin);
        this.moneyView.yourMoney = this.yourMoney.bind(this)();
        this.moneyView.inputMoney = this.inputMoney.bind(this)();
        this.moneyView.walletView();
        this.moneyView.inputMoneyView();
    }
    yourMoney(){
        return this.model.getYourMoney();
    }
    inputMoney(){
        return this.model.getInputMoney();
    }
}

const vmModel = new VmModel();
const insertCoinView = new InsertCoinView();
const moneyView = new MoneyView();
const vmController = new VmController(vmModel, insertCoinView, moneyView);