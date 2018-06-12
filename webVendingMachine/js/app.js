// testCode
import {gs,gsA,ut,acL,rcL,ct} from'../js/utils.js'
import {VendingMachineModel } from'./VendingMachineModel.js'
import { WalletModel } from'./WalletModel.js'
import {VmController} from'./VMController.js'
import { VendingMachineView } from'./VendingMachineView.js'
import {WalletView} from './WalletView.js'
import {snackList, buttonTextList, myMoney} from'./assets.js'
// template



const vendingMachine = new VendingMachineModel(snackList);
const wallet = new WalletModel(myMoney);
const vendingMachineView = new VendingMachineView();
const walletView = new WalletView();

const model = {
  wallet,
  vendingMachine,
}
const view = {
  vendingMachineView,
  walletView
}
const vendingMachineController = new VmController(model, view);

// bind Controller 

/// domLoad

// module.exports = {
//   vendingMachineView,
// }

document.addEventListener("DOMContentLoaded", (e)=> {
  console.log("DOM fully loaded and parsed");
  // rendering 

  vendingMachineController.init();
});











