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
    this.renderItem(itemList);
  }

  addEventClickedItemNumber() {
    const itemNumberList = document.querySelectorAll('.coin_button_item');
    itemNumberList.forEach(v => {
      v.addEventListener('click', ({ target }) => {
        this.clickItemNumberButton(target);
      })
    })
  }

  renderFromMoneyInserted(insertedMoney, totalInsertedMoney) {
    this.renderInsertLog(insertedMoney);
    this.updateRendering(totalInsertedMoney);
  }

  renderFromItemSelected(itemList, itemNumber, totalInsertedMoney) {
    this.renderSelectedItemImage(itemList, itemNumber);
    this.renderSelectedItemLog(itemNumber);
    this.updateRendering(totalInsertedMoney);
  }

  renderFromChangeReturned(change, totalInsertedMoney) {
    this.updateRendering(totalInsertedMoney);
    this.renderReturnLog(change);
  }

  renderSelectedItemImage(itemList, itemNumber) {
    const itemName = document.querySelector(`[data-number="${itemNumber}"]`).previousElementSibling.innerHTML;
    const item = itemList.filter(v => v.name === itemName)[0];
    const imageListNode = document.querySelector('.image_list');
    const imageItemString = this.TMP.itemImageTemp(item.imageName);
    imageListNode.insertAdjacentHTML('afterBegin', imageItemString);
  }

  renderSelectedItemLog(itemNumber) {
    const itemName = document.querySelector(`[data-number="${itemNumber}"]`).previousElementSibling.innerHTML;
    const logItemString = this.TMP.selectedItemLog(itemNumber, itemName);
    this.renderLog(logItemString);
  }

  renderInsertLog(money) {
    const logItemString = this.TMP.insertMoneyLog(money);
    this.renderLog(logItemString);
  }

  renderReturnLog(money) {
    const returnLogString = this.TMP.returnChangeLog(money);
    this.renderLog(returnLogString);
  }

  renderLog(message) {
    const logListNode = document.querySelector('.log_list');
    logListNode.insertAdjacentHTML('afterBegin', message);
  }

  renderItem(itemList) {
    const itemListString = this.TMP.itemListTemp(itemList);
    document.querySelector('.item_list_container').innerHTML = itemListString;
  }

  renderTotalInsertedMoney(totalInsertedMoney) {
    let currentCoin = document.querySelector('.current_coin');
    currentCoin.innerHTML = `${Util.numberWithCommas(totalInsertedMoney)}원`;
  }

  renderAvailableItem(totalInsertedMoney) {
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
    this.renderTotalInsertedMoney(totalInsertedMoney);
    this.renderAvailableItem(totalInsertedMoney);
  }

  alertShortOfMoney() {
    alert('돈이 부족합니다');
  }

  alertNotAvailableNumber() {
    alert('번호가 유효하지 않습니다')
  }
}