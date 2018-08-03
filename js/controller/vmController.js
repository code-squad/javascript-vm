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
    this.machineView.displayAvailableItem();
  }

  notifyDecreasedMoney(price) {
    this.walletView.rerender(price, this.walletModel);
  }
  clickItemNumberButtonHandler(target, selectObj) {
    this.calculateSelectionNumber(target, selectObj);
  }
  calculateSelectionNumber(target, selectObj) {
    if (selectObj.acc) clearTimeout(selectObj.acc);
    selectObj.number.push(target.dataset['select']);
    selectObj.acc = setTimeout(() => {
      let number = selectObj.number.join('');
      this.machineView.selectItem(number);
      this.machineView.initTimer()
    }, 3000);
  }
  notifyReceiveMoney(insertedMoney, totalInsertedMoney) {
    this.machineView.displayLog('insert', insertedMoney);
    this.machineView.rerender(totalInsertedMoney);
  }

  notifyNoUnit(price) {
    this.walletView.noMoneyUnit(price);
  }

}