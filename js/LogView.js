/*
    모든 동작을 logingBox에 메시지를 통해서 알려주는 view를 담당하고있습니다.
*/
export default class LogView {
  constructor(logingBox) {
    this.logingBox = logingBox;
    this.logCount = 0;
  }
  showMessage(msgName, firstResource, secondResource) {
    const MSG = {
      INSERT_MONEY: `<p>${firstResource}원이 투입됐음.</p>`,
      LACK_MONEY: `<p>넣을 ${firstResource}원의 갯수가 부족합니다.</p>`,
      LACK_ITEM: `<p>해당 번호의 물품이 존재하지 않습니다.</p>`,
      SELECT_ITEM: `<p>${firstResource}번 ${secondResource}가(이) 뽑혔습니다.</p>`,
      LACK_INPUTMONEY: `<p>돈이 부족합니다. 자판기에 돈을 더 넣어주세요.</p>`,
      RETURN_MONEY: `<p>${firstResource}원이 반환되었습니다.</p>`,
    }
    if (this.logCount > 10) {
      this.logCount = 0;
      this.resetLogBox();
    }
    this.logingBox.insertAdjacentHTML("afterbegin", MSG[msgName]);
    this.logCount++;
  }
  resetLogBox() {
    this.logingBox.innerText = "";
  }
}