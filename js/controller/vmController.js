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
  }

  clickMoneyButtonHandler(button) {
    this.walletView.printClickedMoney(button);
    this.walletModel.decreaseMoney(button.getAttribute('data-price'))
    this.machineModel.receiveMoney(button.getAttribute('data-price'));
  }

  notifyDecreasedMoney(price) {
    this.walletView.rerender(price, this.walletModel);
  }

  notifyReceiveMoney(insertedMoney) {
<<<<<<< HEAD
=======
    this.machineView.displayInsertLog(insertedMoney);
>>>>>>> test6
    this.machineView.rerender(insertedMoney);
  }

  notifyNoUnit(price) {
    this.walletView.noMoneyUnit(price);
  }

}