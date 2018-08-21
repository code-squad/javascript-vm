/*
    모든 동작을 logingBox에 메시지를 통해서 알려주는 view를 담당하고있습니다.
*/
export default class LogView {
  constructor(logingBox) {
    this.logingBox = logingBox;
    this.logCount = 0;
  }
  showInsertMoney(coin) {
    const logMessage = `<p>${coin}원이 투입됐음.</p>`;
    this.printLogMessage(logMessage);
  }
  showLackYourMoney(coin) {
    const logMessage = `<p>넣을 ${coin}원의 갯수가 부족합니다.</p>`;
    this.printLogMessage(logMessage);
  }
  showNoItem() {
    const logMessage = `<p>해당 번호의 물품이 존재하지 않습니다.</p>`
    this.printLogMessage(logMessage);
  }
  showSelectItem(itemId, itemName) {
    const logMessage = `<p>${itemId}번 ${itemName}가(이) 뽑혔습니다.</p>`
    this.printLogMessage(logMessage);
  }
  showLackInputMoney() {
    const logMessage = `<p>돈이 부족합니다. 자판기에 돈을 더 넣어주세요.</p>`
    this.printLogMessage(logMessage);
  }
  showReturnMoney(inputMoney) {
    const logMessage = `<p>${inputMoney}원이 반환되었습니다.</p>`
    this.printLogMessage(logMessage);
  }
  printLogMessage(logMessage) {
    if (this.logCount > 10) {
      this.logingBox.innerText = "";
      this.logCount = 0;
    }
    this.logingBox.insertAdjacentHTML("afterbegin", logMessage);
    this.logCount++;
  }
}