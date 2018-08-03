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
}
