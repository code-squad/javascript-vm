class WalletModel {
  constructor(money) {
    this.money = money;
  }
  getMoney() {
    return this.money;
  }
  insertMoney(money) {
    console.log(money);
  }
}
const money = { 10: 5, 50: 4, 100: 8, 500: 5, 1000: 5, 5000: 3, 10000: 1 };