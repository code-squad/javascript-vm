class VendingMachine {
  constructor(machineModel, walletModel, machineView, walletView) {
    this.machineModel = machineModel;
    this.walletModel = walletModel;
    this.machineView = machineView;
    this.walletView = walletView;
    this.initWallet(this.walletModel.getMoney());
    this.initMachine(this.machineModel);
  }
  initWallet(money) {
    this.walletView.clickMoneyButtonHandler = this.clickMoneyButtonHandler.bind(this);
    this.walletView.displayMoney(money);
    this.walletView.clickMoneyButtons();
  }
  initMachine(machineModel) {
    this.machineView.displayMachineHandler(machineModel);
  }
  clickMoneyButtonHandler(button) {
    this.walletView.printClickedMoney(button);
    this.walletModel.insertMoney(button);
    this.machineModel.receiveMoney(button.getAttribute('data-price'));
    this.machineView.displayMachineHandler(this.machineModel);
  }
}
const vendingMachine = new VendingMachine(
  new MachineModel(itemList),
  new WalletModel(money),
  new MachineView(CommonView),
  new WalletView(CommonView)
);