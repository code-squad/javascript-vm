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

  clickMoneyButtonHandler(moneyUnit) {
    if (!this.walletModel.hasMoney(moneyUnit)) {
      this.walletView.noMoneyUnit(moneyUnit);
      return;
    }
    this.walletView.printClickedMoney(moneyUnit);
    this.walletModel.decreaseMoney(moneyUnit);
    this.machineModel.receiveMoney(moneyUnit);
    this.machineView.displayAvailableItem(this.machineModel.totalInsertedMoney);
  }

  clickItemNumberButton(target) {
    this.setTimeoutItemNumber = this.setTimeoutItemNumber || { current: null, number: '' };
    this.monitorItemNumber(target); // 완료되면 confirmItemNumber 함수 실행
  }

  monitorItemNumber(target) {
    let checker = this.setTimeoutItemNumber;
    if (!!checker.current) clearTimeout(checker.current);
    checker.number += target.dataset['select'];
    checker.current = setTimeout(() => {
      if (checker.number > this.machineModel.getItemList().length) {
        this.machineView.alertNotAvailableNumber();
      } else {
        this.confirmItemNumber(checker.number);
      }
      this.resetItemNumberCounting();
    }, 3000);
  }

  confirmItemNumber(itemNumber) {
    this.selectItemHandler(itemNumber);
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
    this.machineView.displayTotalInsertedMoney(this.machineModel.getTotalInsertedMoney());
    this.machineView.displayAvailableItem(this.machineModel.getTotalInsertedMoney());
    this.startReturnTimeCounting();
  }

  startReturnTimeCounting() {
    this.setTimeoutChange = this.setTimeoutChange || { current: null };
    if (this.setTimeoutChange.current) clearTimeout(this.setTimeoutChange.current);
    this.setTimeoutChange.current = setTimeout(() => {
      // returnChangeHandler();
      console.log('hello');
    }, 3000);
  }

  notifyDecreasedMoney(moneyUnit) {
    const moneyList = this.walletModel.getMoneyList();
    const fullAmount = this.walletModel.getFullAmount();
    this.walletView.updateRendering(moneyUnit, moneyList, fullAmount);
  }

  notifyReceiveMoney(insertedMoney, totalInsertedMoney) {
    this.machineView.displayInsertLog(insertedMoney);
    this.machineView.rerender(totalInsertedMoney);
  }

  resetItemNumberCounting() {
    this.setTimeoutItemNumber = { current: null, number: '' };
  }
  resetChangeTimeCounting() {
    this.setTimeoutItemNumber = { current: null };
  }
}