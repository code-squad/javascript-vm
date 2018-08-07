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
    this.initWallet();
    this.initMachine();
  }

  initWallet() {
    this.walletView.renderWallet(this.walletModel.getMoneyList(), this.walletModel.getFullAmount());
    this.walletView.addEventClickedMoney();
    this.walletView.clickMoneyButtonHandler = this.clickMoneyButtonHandler.bind(this);
    this.walletModel.notifyDecreasedMoney = this.notifyDecreasedMoney.bind(this);
  }

  initMachine() {
    this.machineView.renderMachine(this.machineModel.getItemList());
    this.machineView.addEventClickedItemNumber();
    this.machineView.clickItemNumberButton = this.clickItemNumberButton.bind(this);
    this.machineModel.notifyReceiveMoney = this.notifyReceiveMoney.bind(this);
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
    this.checkSetTimeout = this.checkSetTimeout || { current: null, number: '' };
    this.startItemNumberCounting(target); // 완료되면 confirmItemNumber 함수 실행
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
  }

  startItemNumberCounting(target) {
    let checker = this.checkSetTimeout;
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

  notifyDecreasedMoney() {
    this.walletView.rerender(this.walletModel.getMoneyList(), this.walletModel.getFullAmount());
  }

  notifyReceiveMoney(insertedMoney, totalInsertedMoney) {
    this.machineView.displayInsertLog(insertedMoney);
    this.machineView.rerender(totalInsertedMoney);
  }

  resetItemNumberCounting() {
    this.checkSetTimeout = { current: null, number: '' };
  }
}