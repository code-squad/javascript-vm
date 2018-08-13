import {itemData} from './itemData.js'
import LogView from './LogView.js'
import MenuView from './MenuView.js'
import MoneyView from './MoneyView.js'
import SelectItemView from './SelectItemView.js'
import {templateItemList} from './Template.js'
import VmController from './VmController.js'
import VmModel from './VmModel.js'

const walletData = {
    total : 30000,
    10000 : 1,
    5000 : 2,
    1000 : 5,
    500 : 8,
    100 : 10
}
function init(){
    const logingBox = document.querySelector('.print-action');
    const itemList = templateItemList(itemData);
    const menuView = new MenuView(itemList);
    const vmModel = new VmModel(walletData);
    const moneyView = new MoneyView();
    const logView = new LogView(logingBox);
    const selectItemView = new SelectItemView();
    const vmController = new VmController(menuView ,vmModel, moneyView, logView, selectItemView);
    vmController.initializeConnection();
    vmController.initializeView();
}
document.addEventListener('DOMContentLoaded', init);
