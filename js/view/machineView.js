/*
  Machine 랜더링을 담당하는 파일
  초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
class MachineView {
  constructor(template) {
    this.clickItemNumberButton = null;
    this.TMP = template;
  }

  initializeView(itemList) {
    this.renderMachine(itemList);
    this.addEventClickedItemNumber();
  }

  renderMachine(itemList) {
    this.displayItem(itemList);
  }

  addEventClickedItemNumber() {
    const itemNumberList = document.querySelectorAll('.coin_button_item');
    itemNumberList.forEach(v => {
      v.addEventListener('click', ({ target }) => {
        this.clickItemNumberButton(target);
      })
    })
  }

  displayFromMoneyInserted(insertedMoney, totalInsertedMoney) {
    this.displayInsertLog(insertedMoney);
    this.updateRendering(totalInsertedMoney);
  }

  displayFromItemSelected(itemList, itemNumber, totalInsertedMoney) {
    this.displaySelectedItemImage(itemList, itemNumber);
    this.displaySelectedItemLog(itemNumber);
    this.updateRendering(totalInsertedMoney);
  }

  displayFromChangeReturned(change, totalInsertedMoney) {
    this.updateRendering(totalInsertedMoney);
    this.displayReturnLog(change);
  }

  displaySelectedItemImage(itemList, itemNumber) {
    const itemName = document.querySelector(`[data-number="${itemNumber}"]`).previousElementSibling.innerHTML;
    const item = itemList.filter(v => v.name === itemName)[0];
    const imageListNode = document.querySelector('.image_list');
    const imageItemString = this.TMP.itemImageTemp(item.imageName);
    imageListNode.insertAdjacentHTML('afterBegin', imageItemString);
  }

  displaySelectedItemLog(itemNumber) {
    const itemName = document.querySelector(`[data-number="${itemNumber}"]`).previousElementSibling.innerHTML;
    const logItemString = this.TMP.selectedItemLog(itemNumber, itemName);
    this.displayLog(logItemString);
  }

  displayInsertLog(money) {
    const logItemString = this.TMP.insertMoneyLog(money);
    this.displayLog(logItemString);
  }

  displayReturnLog(money) {
    const returnLogString = this.TMP.returnChangeLog(money);
    this.displayLog(returnLogString);
  }

  displayLog(message) {
    const logListNode = document.querySelector('.log_list');
    logListNode.insertAdjacentHTML('afterBegin', message);
  }

  displayItem(itemList) {
    const itemListString = this.TMP.itemListTemp(itemList);
    document.querySelector('.item_list_container').innerHTML = itemListString;
  }

  displayTotalInsertedMoney(totalInsertedMoney) {
    let currentCoin = document.querySelector('.current_coin');
    currentCoin.innerHTML = `${Util.numberWithCommas(totalInsertedMoney)}원`;
  }

  displayAvailableItem(totalInsertedMoney) {
    const itemList = document.querySelectorAll('.item_price');
    const availableItemClass = 'available_item';
    for (let ele of itemList) {
      if (ele.getAttribute('data-price') <= totalInsertedMoney) {
        ele.classList.toggle(availableItemClass, true);
      } else {
        ele.classList.toggle(availableItemClass, false);
      }
    }
  }

  updateRendering(totalInsertedMoney) {
    this.displayTotalInsertedMoney(totalInsertedMoney);
    this.displayAvailableItem(totalInsertedMoney);
  }

  alertShortOfMoney() {
    alert('돈이 부족합니다');
  }

  alertNotAvailableNumber() {
    alert('번호가 유효하지 않습니다')
  }
}