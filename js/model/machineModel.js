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
  receiveMoney(money) {
    this.totalInsertedMoney += Number(money);
    this.notifyReceiveMoney(money, this.totalInsertedMoney);
  }
  isEnoughMoney(itemNumber) {
    const itemPrice = document.querySelector(`[data-number="${itemNumber}"]`).dataset["price"];
    console.log(itemPrice, this.totalInsertedMoney);
    return itemPrice < this.totalInsertedMoney ? true : false;
  }
  decreaseTotalInsertedMoney(itemNumber) {
    const itemPrice = document.querySelector(`[data-number="${itemNumber}"]`).dataset["price"];
    this.totalInsertedMoney -= itemPrice;
  }
  decreaseItemStock(itemNumber) {
    let item = document.querySelector(`[data-number="${itemNumber}"]`).previousElementSibling.innerHTML;
    for (let value of this.itemList) {
      if (value.name === item) {
        value.stock -= 1;
      }
    }
  }
}
