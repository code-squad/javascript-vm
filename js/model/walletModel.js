/*
지갑 부분
이벤트에 따라 wallet data의 변경을 담당한다
*/
import { Util } from '../util/util.js'
function WalletModel(money) {
  this.money = money;
  this.fullAmount = this.calculateFullAmount(money);
  this.notifyChangedMoney = null;
}

WalletModel.prototype = {
  getMoneyList() {
    return this.money;
  },

  getFullAmount() {
    return this.fullAmount;
  },

  calculateFullAmount(money) {
    const moneyUnit = Object.keys(money);
    const moneyNumber = Object.values(money);
    const fullAmount = moneyUnit.reduce((acc, ele, idx) => {
      acc += (ele * moneyNumber[idx]);
      return acc;
    }, 0);
    return fullAmount;
  },

  decreaseMoney(moneyUnit) {
    this.money[moneyUnit] -= 1;
    this.fullAmount -= Number(moneyUnit);
    this.notifyChangedMoney([moneyUnit]);
  },

  receiveChange(money) {
    this.fullAmount += money;
    const changeUnitObject = Util.changeAlgorithm(money);
    for (let unit in changeUnitObject) {
      this.money[unit] += changeUnitObject[unit];
    }
    const changedUnitList = Object.keys(changeUnitObject);
    this.notifyChangedMoney(changedUnitList);
  },

  hasMoney(moneyUnit) {
    return this.money[moneyUnit];
  }
}

export { WalletModel }