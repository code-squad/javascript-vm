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
    this.machineView.clickItemNumberButton = this.clickItemNumberButton.bind(this);
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

  clickItemNumberButton(target) {
    this.checkSetTimeout = this.checkSetTimeout || { current: null, number: '' };
    this.checkUsersSelection(target);
  }

  checkUsersSelection(target) {
    let checker = this.checkSetTimeout;
    if (!!checker.current) clearTimeout(checker.current);
    checker.number += target.dataset['select'];
    checker.current = setTimeout(() => {
      if (checker.number > this.machineModel.getItemList().length) {
        this.machineView.alertNotAvailableNumber();
      } else {
        this.selectItemHandler(checker.number);
      }
      this.initChecker();
    }, 3000);
  }

  selectItemHandler(itemNumber) {
    if (!this.machineModel.isEnoughMoney(itemNumber)) {
      this.machineView.alertShortOfMoney();
      return;
    }
    this.machineView.displaySelectedItemImage(itemNumber);
    this.machineView.displaySelectedItemLog(itemNumber);
    this.machineModel.decreaseItemStock(itemNumber);
    this.machineModel.decreaseTotalInsertedMoney(itemNumber);
    this.machineView.displayTotalInsertedMoney(this.machineModel.totalInsertedMoney);
    this.machineView.displayAvailableItem(this.machineModel.totalInsertedMoney);
  }

  notifyDecreasedMoney(price) {
    this.walletView.rerender(price, this.walletModel);
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