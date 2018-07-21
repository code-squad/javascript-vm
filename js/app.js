class VendingMachine {
  constructor(machineModel, walletModel, machineView, walletView) {
    this.machineModel = machineModel;
    this.walletModel = walletModel;
    this.machineView = machineView;
    this.walletView = walletView;
    this.init();
  }
  init() {
    this.initWallet(this.walletModel.wallet);
    this.initMachineHandler(this.machineModel.itemList);
  }
  initWallet(wallet) {
    this.walletView.displayWalletHandler(wallet);
    this.walletView.clickCoinButtonHandler();
  }
  initMachineHandler(machineModel) {
    this.machineView.displayMachineHandler(machineModel);
  }
}

const vendingMachine = new VendingMachine(
  new MachineModel(itemList),
  new WalletModel(myWallet),
  new MachineView,
  new WalletView
);