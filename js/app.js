class VendingMachine {
  constructor(machineModel, walletModel, machineView, walletView) {
    this.machineModel = machineModel;
    this.walletModel = walletModel;
    this.machineView = machineView;
    this.walletView = walletView;
    this.init();
  }
  init() {
    this.walletView.displayWallet(this.walletModel.wallet);
    this.walletView.clickCoinButtonHandler();
    this.machineView.displayMachineHandler(this.machineModel.itemList);
  }
}

const vendingMachine = new VendingMachine(
  new MachineModel(itemList),
  new WalletModel(myWallet),
  new MachineView,
  new WalletView
);