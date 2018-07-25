class WalletModel {
  constructor(money) {
    this.money = money;
    this.fullAmount = this.getFullAmount(this.money);
    this.alertDecreasedMoney = null;
    this.alertError = null;
  }
  getMoneyList() {
    return this.money;
  }
  getFullAmount(money) {
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
      this.alertError(price);
      return;
    }
    this.money[price] -= 1;
    this.fullAmount -= Number(price);
    this.alertDecreasedMoney(price, this.fullAmount);
  }
}
const money = { 10: 5, 50: 4, 100: 8, 500: 5, 1000: 5, 5000: 3, 10000: 1 };