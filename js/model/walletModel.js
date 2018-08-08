/*
지갑 부분
이벤트에 따라 wallet data의 변경을 담당한다
*/

class WalletModel {
  constructor(money) {
    this.money = money;
    this.fullAmount = this.calculateFullAmount(this.money);
    this.notifyDecreasedMoney = null;
  }

  getMoneyList() {
    return this.money;
  }

  getFullAmount() {
    return this.fullAmount;
  }

  calculateFullAmount(money) {
    const moneyUnit = Object.keys(money);
    const moneyNumber = Object.values(money);
    const fullAmount = moneyUnit.reduce((acc, ele, idx) => {
      acc += (ele * moneyNumber[idx]);
      return acc;
    }, 0);
    return fullAmount;
  }

  decreaseMoney(moneyUnit) {
    if (this.money[moneyUnit] === 0) {
      this.notifyNoUnit(moneyUnit);
      return;
    }
    this.money[moneyUnit] -= 1;
    this.fullAmount -= Number(moneyUnit);
    this.notifyChangedMoney([moneyUnit]);
  }

  receiveChange(money) {
    this.fullAmount += money;
    const changeUnitObject = Util.changeAlgorithm(money);
    for (let unit in changeUnitObject) {
      this.money[unit] += changeUnitObject[unit];
    }
    const changedUnitList = Object.keys(changeUnitObject);
    this.notifyChangedMoney(changedUnitList);
  }

  hasMoney(moneyUnit) {
    return money[moneyUnit];
  }
}