/*
밴딩머신 기계 부분
이벤트에 따라 item data의 변경을 담당한다
*/

class MachineModel {
  constructor(itemList) {
    this.itemList = itemList;
    this.totalInsertedMoney = 0;
    this.notifyReceiveMoney = null;
  }

  getItemList() {
    return this.itemList;
  }

  getTotalInsertedMoney() {
    return this.totalInsertedMoney;
  }

  returnChange() {
    const change = this.totalInsertedMoney;
    this.totalInsertedMoney = 0;
    return change;
  }

  receiveMoney(money) {
    this.totalInsertedMoney += Number(money);
    this.notifyReceiveMoney(money, this.totalInsertedMoney);
  }

  isEnoughMoney(itemNumber) {
    const itemPrice = document.querySelector(`[data-number="${itemNumber}"]`).dataset["price"];
    return !!(itemPrice <= this.totalInsertedMoney)
  }

  decreaseTotalInsertedMoney(itemNumber) {
    const itemPrice = document.querySelector(`[data-number="${itemNumber}"]`).dataset["price"];
    this.totalInsertedMoney -= itemPrice;
  }

  decreaseItemStock(itemNumber) {
    this.itemList[itemNumber - 1].stock -= 1;
  }
}
