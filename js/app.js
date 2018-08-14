/*
  model과 view를 controller로 묶고 model과 view를 초기화하는 역할을 담당
*/
import WalletView from './view/walletView.js'
import MachineView from './view/machineView.js'
import { WalletModel } from './model/walletModel.js'
import MachineModel from './model/machineModel.js'
import { money } from './model/money.js'
import { item } from './model/item.js'
import { Temp } from './view/template.js'
import VendingMachine from './controller/vmController.js'


const machineModel = new MachineModel(item);
const walletModel = new WalletModel(money);
const machineView = new MachineView(Temp);
const walletView = new WalletView(Temp);
const vendingMachine = new VendingMachine(machineModel, walletModel, machineView, walletView);

const moneyList = walletModel.getMoneyList();
console.log(moneyList);
const fullAmount = walletModel.getFullAmount();
const itemList = machineModel.getItemList();

walletView.initializeView(moneyList, fullAmount);
machineView.initializeView(itemList);
vendingMachine.initializeConnection();