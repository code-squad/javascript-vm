const machineModel = new MachineModel(itemList);
const walletModel = new WalletModel(money);
const machineView = new MachineView(CommonView, machineModel);
const walletView = new WalletView(CommonView, walletModel);

const vendingMachine = new VendingMachine(machineModel, walletModel, machineView, walletView);
vendingMachine.initWallet();
vendingMachine.initMachine();