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
    this.checkSetTimeout = { current: null, number: '' };
  }

  initWallet() {
    this.walletView.clickMoneyButtonHandler = this.clickMoneyButtonHandler.bind(this);
    this.walletModel.notifyDecreasedMoney = this.notifyDecreasedMoney.bind(this);
    this.walletModel.notifyNoUnit = this.notifyNoUnit.bind(this);
  }

  initMachine() {
    this.machineModel.notifyReceiveMoney = this.notifyReceiveMoney.bind(this);
    this.machineView.clickItemNumberButtonHandler = this.clickItemNumberButtonHandler.bind(this);
  }

  clickMoneyButtonHandler(button) {
    const moneyUnit = button.getAttribute('data-money');
    if (!this.walletModel.hasMoney(moneyUnit)) {
      this.notifyNoUnit(moneyUnit)
      return;
    }
    this.walletView.printClickedMoney(button);
    this.walletModel.decreaseMoney(moneyUnit);
    this.machineModel.receiveMoney(moneyUnit);
    this.machineView.displayAvailableItem(this.machineModel.totalInsertedMoney);
  }

  clickItemNumberButtonHandler(target) {
    this.calculateSelectionNumber(target);
  }

  selectItemHandler(number) {
    if (!this.machineModel.isEnoughMoney(number)) {
      this.machineView.alertShortOfMoney();
      return;
    }
    this.machineView.displaySelectedItemLog(number);
    this.machineModel.decreaseItemStock(number);
    this.machineModel.decreaseTotalInsertedMoney(number);
    this.machineView.displayTotalInsertedMoney(this.machineModel.totalInsertedMoney);
    this.machineView.displayAvailableItem(this.machineModel.totalInsertedMoney);
  }

  notifyDecreasedMoney(price) {
    this.walletView.rerender(price, this.walletModel);
  }

  calculateSelectionNumber(target) {
    let checker = this.checkSetTimeout;
    if (!!checker.current) clearTimeout(checker.current);
    checker.number += target.dataset['select'];
    checker.current = setTimeout(() => {
      this.selectItemHandler(checker.number);
      this.initChecker();
    }, 3000);
  }

  notifyReceiveMoney(insertedMoney, totalInsertedMoney) {
    this.machineView.displayInsertLog(insertedMoney);
    this.machineView.rerender(totalInsertedMoney);
  }

  notifyNoUnit(price) {
    this.walletView.noMoneyUnit(price);
  }

  initChecker() {
    this.checkSetTimeout = { current: null, number: '' };
  }
}