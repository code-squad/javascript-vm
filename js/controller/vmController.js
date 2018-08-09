/*
VendingMachine의 Controller 역할
1. VendingMachine 초기화
2. 동작별로 data변경과 rendering의 역할을 여기에서 명시적으로 나타냄
*/

class VendingMachine {
  constructor(machineModel, walletModel, machineView, walletView) {
    this.machineModel = machineModel;
    this.walletModel = walletModel;
    this.machineView = machineView;
    this.walletView = walletView;
  }

  initializeConnection() {
    walletView.clickMoneyButtonHandler = this.clickMoneyButtonHandler.bind(this);
    walletModel.notifyChangedMoney = this.notifyChangedMoney.bind(this);
    machineView.clickItemNumberButton = this.clickItemNumberButton.bind(this);
    machineModel.notifyReceiveMoney = this.notifyReceiveMoney.bind(this);
  }

  clickMoneyButtonHandler(moneyUnit) {
    this.clearChangeTimeCounting();
    if (!this.walletModel.hasMoney(moneyUnit)) {
      this.walletView.noMoneyUnit(moneyUnit);
      return;
    }
    this.walletView.printClickedMoney(moneyUnit);
    this.walletModel.decreaseMoney(moneyUnit);
    this.machineModel.receiveMoney(moneyUnit);
    const totalInsertedMoney = this.machineModel.getTotalInsertedMoney();
    this.machineView.displayAvailableItem(totalInsertedMoney);
  }

  clickItemNumberButton(target) {
    this.setTimeoutItemNumber = this.setTimeoutItemNumber || { current: null, number: '' };
    this.monitorItemNumber(target); // 완료되면 confirmItemNumber 함수 실행
  }

  monitorItemNumber(target) {
    this.clearChangeTimeCounting();
    let checker = this.setTimeoutItemNumber;
    if (!!checker.current) clearTimeout(checker.current);
    checker.number += target.dataset['select'];
    checker.current = setTimeout(() => {
      if (checker.number > this.machineModel.getItemList().length) {
        this.machineView.alertNotAvailableNumber();
      } else {
        this.selectItemHandler(checker.number);
      }
      this.initItemNumberCounting();
    }, 3000);
  }

  selectItemHandler(itemNumber) {
    if (!this.machineModel.isEnoughMoney(itemNumber)) {
      this.machineView.alertShortOfMoney();
      return;
    }
    this.machineView.displaySelectedItemImage(this.machineModel.getItemList(), itemNumber);
    this.machineView.displaySelectedItemLog(itemNumber);
    this.machineModel.decreaseItemStock(itemNumber);
    this.machineModel.decreaseTotalInsertedMoney(itemNumber);
    const totalInsertedMoney = this.machineModel.getTotalInsertedMoney();
    this.machineView.updateRendering(totalInsertedMoney);
    this.startReturnTimeCounting();
  }

  startReturnTimeCounting() {
    this.setTimeoutChange = this.setTimeoutChange || null;
    if (this.setTimeoutChange) clearTimeout(this.setTimeoutChange);
    this.setTimeoutChange = setTimeout(() => {
      this.returnChangeHandler();
    }, 3000);
  }

  returnChangeHandler() {
    const change = this.machineModel.returnChange();
    const totalInsertedMoney = this.machineModel.getTotalInsertedMoney();
    this.machineView.updateRendering(totalInsertedMoney);
    this.machineView.displayReturnLog(change);
    this.walletModel.receiveChange(change);
  }

  notifyChangedMoney(moneyUnit) {
    const moneyList = this.walletModel.getMoneyList();
    const fullAmount = this.walletModel.getFullAmount();
    this.walletView.updateRendering(moneyUnit, moneyList, fullAmount);
  }

  notifyReceiveMoney(insertedMoney) {
    this.machineView.displayInsertLog(insertedMoney);
    const totalInsertedMoney = this.machineModel.getTotalInsertedMoney();
    this.machineView.updateRendering(totalInsertedMoney);
  }

  initItemNumberCounting() {
    this.setTimeoutItemNumber = { current: null, number: '' };
  }

  clearChangeTimeCounting() {
    clearTimeout(this.setTimeoutChange);
  }
}