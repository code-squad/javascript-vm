class VendingMachine {
  constructor(itemList, wallet, machineView, walletView) {
    this.itemList = itemList;
    this.wallet = wallet;
    this.machineView = machineView;
    this.walletView = walletView;
    this.init();
  }
  init() {
    this.initDisplayHandler(this.wallet, this.itemList);
  }
  initDisplayHandler(wallet, itemList) {
    this.machineView.init(itemList);
    this.walletView.init(wallet);
  }
}

const walletView = new WalletView();
const machineView = new MachineView();
const vendingMachine = new VendingMachine(item, wallet, machineView, walletView);