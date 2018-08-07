/*
  app을 초기화하고 실행하는 역할만 한다
*/

const machineModel = new MachineModel(itemList);
const walletModel = new WalletModel(money);
const machineView = new MachineView(itemList);
const walletView = new WalletView();
const vendingMachine = new VendingMachine(machineModel, walletModel, machineView, walletView);
// vendingMachine.initWallet();
// vendingMachine.initMachine();