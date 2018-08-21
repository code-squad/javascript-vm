/*
    웹자판기프로젝트에 필요한 데이터를 담당합니다.
    - 자판기에 넣은 금액, 지갑에 있는 돈의 데이터를 가지고있습니다.
    - 데이터의 변화는 이 클래스에서 수행합니다.
    - 다른클래스에서 여기 클래스의 메소드를 통해 데이터를 넣어주거나, 데이터가 필요할 때 가져갈 수 있습니다.
*/
export default class VmModel {
  constructor(walletData) {
    this.yourMoney = walletData.total;
    this.coinCount = walletData;
    delete walletData.total;
    this.inputMoney = 0;
  }
  getYourMoney() {
    return this.yourMoney;
  }
  getInputMoney() {
    return this.inputMoney;
  }
  getCoinCount() {
    return this.coinCount;
  }
  getMoneyData() {
    return {
      inputMoney: this.getInputMoney(),
      yourMoney: this.getYourMoney(),
      coinCount: this.getCoinCount()
    }
  }
  insertCoin(coin) {
    this.yourMoney -= coin;
    this.inputMoney += coin;
    this.coinCount[coin]--;
  }
  selectItem(coin) {
    this.inputMoney -= coin;
  }
  returnMoney() {
    this.yourMoney += this.inputMoney;
    this.returnCoinCount();
    this.inputMoney = 0;
  }
  returnCoinCount() {
    let temp = this.inputMoney;
    const coinUnit = Object.keys(this.coinCount).sort((a, b) => b - a);
    coinUnit.forEach(v => {
      this.coinCount[v] += Math.floor(temp / v);
      temp %= v;
    })
  }
}