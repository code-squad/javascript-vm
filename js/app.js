class VendingMachine {
  constructor(machineModel, walletModel, machineView, walletView) {
    this.machineModel = machineModel;
    this.walletModel = walletModel;
    this.machineView = machineView;
    this.walletView = walletView;
    this.initWallet(this.walletModel);
    this.initMachine(this.machineModel);
  }
  initWallet(walletModel) {
    this.walletView.clickMoneyButtonHandler = this.clickMoneyButtonHandler.bind(this);
    this.walletModel.alertDecreasedMoney = this.alertDecreasedMoney.bind(this);
    this.machineModel.alertReceiveMoney = this.alertReceiveMoney.bind(this);
    this.walletModel.alertError = this.alertError.bind(this);
    this.walletView.displayMoney(walletModel);
    this.walletView.clickMoneyButtons();
  }
  initMachine(machineModel) {
    this.machineView.displayMachineHandler(machineModel);
  }

  alertDecreasedMoney(price) {
    this.walletView.rerender(price, this.walletModel);
  }
  alertReceiveMoney(insertedMoney) {
    this.machineView.rerender(insertedMoney);
  }
  clickMoneyButtonHandler(button) {
    this.walletView.printClickedMoney(button);
    this.walletModel.decreaseMoney(button.getAttribute('data-price'))
    this.machineModel.receiveMoney(button.getAttribute('data-price'));
  }
  alertError(price) {
    alert(`지갑에 ${Util.numberWithCommas(price)}원이 부족합니다`);
  }
}
const vendingMachine = new VendingMachine(
  new MachineModel(itemList),
  new WalletModel(money),
  new MachineView(CommonView),
  new WalletView(CommonView)
);