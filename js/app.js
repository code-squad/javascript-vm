/*
  app을 초기화하고 실행하는 역할만 한다
*/

const machineModel = new MachineModel(item);
const walletModel = new WalletModel(money);
const machineView = new MachineView(item);
const walletView = new WalletView();
const vendingMachine = new VendingMachine(machineModel, walletModel, machineView, walletView);

const moneyList = walletModel.getMoneyList();
const fullAmount = walletModel.getFullAmount();
walletView.renderWallet(moneyList, fullAmount);
walletView.addEventClickedMoney();
walletView.clickMoneyButtonHandler = vendingMachine.clickMoneyButtonHandler.bind(vendingMachine);
walletModel.notifyChangedMoney = vendingMachine.notifyChangedMoney.bind(vendingMachine);

const itemList = machineModel.getItemList();
machineView.renderMachine(itemList);
machineView.addEventClickedItemNumber();
machineView.clickItemNumberButton = vendingMachine.clickItemNumberButton.bind(vendingMachine);
machineModel.notifyReceiveMoney = vendingMachine.notifyReceiveMoney.bind(vendingMachine);