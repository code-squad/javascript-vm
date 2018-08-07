/*
지갑 부분
이벤트에 따라 wallet data의 변경을 담당한다
*/

class WalletModel {
  constructor(money) {
    this.money = money;
    this.fullAmount = this.calculateFullAmount(this.money);
    this.notifyDecreasedMoney = null;
    this.notifyNoUnit = null;
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

  decreaseMoney(price) {
    if (this.money[price] === 0) {
      this.notifyNoUnit(price);
      return;
    }
    this.money[price] -= 1;
    this.fullAmount -= Number(price);
    this.notifyDecreasedMoney();
  }
  hasMoney(moneyUnit) {
    return money[moneyUnit];
  }
}