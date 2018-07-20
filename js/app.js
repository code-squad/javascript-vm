class VendingMachine {
  constructor(machineModel, walletModel, machineView, walletView) {
    this.machineModel = machineModel;
    this.walletModel = walletModel;
    this.machineView = machineView;
    this.walletView = walletView;
    this.init();
  }
  init() {
    this.initWalletHandler(this.walletModel.wallet);
    this.initMachineHandler(this.machineModel.itemList);
  }
  initWalletHandler(wallet) {
    this.walletView.displayWalletHandler(wallet);
  }
  initMachineHandler(machineModel) {
    this.machineView.displayMachineHandler(machineModel);
  }
}

const walletView = new WalletView();
const machineView = new MachineView();
const walletModel = new WalletModel(myWallet);
const machineModel = new MachineModel(itemList);
const vendingMachine = new VendingMachine(machineModel, walletModel, machineView, walletView);