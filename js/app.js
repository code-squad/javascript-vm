/*
  model과 view를 controller로 묶고 model과 view를 초기화하는 역할을 담당
*/

const machineModel = new MachineModel(item);
const walletModel = new WalletModel(money);
const machineView = new MachineView();
const walletView = new WalletView();
const vendingMachine = new VendingMachine(machineModel, walletModel, machineView, walletView);

const moneyList = walletModel.getMoneyList();
const fullAmount = walletModel.getFullAmount();
const itemList = machineModel.getItemList();

walletView.initializeView(moneyList, fullAmount);
machineView.initializeView(itemList);
vendingMachine.initializeConnection();