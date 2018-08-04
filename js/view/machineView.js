/*
  Machine 랜더링을 담당하는 파일
  초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
class MachineView {
  constructor(itemList) {
    this.itemList = itemList;
    this.clickItemNumberButton = null;
    this.displayItem(itemList);
    this.addEventItemNumberClicked();
  }

  displayItem(itemList) {
    this.renderItem(itemList);
  }
  addEventItemNumberClicked() {
    const itemNumberList = document.querySelectorAll('.coin_button_item');
    itemNumberList.forEach(v => {
      v.addEventListener('click', ({ target }) => {
        this.clickItemNumberButton(target);
      })
    })
  }
  displaySelectedItemImage(number) {
    const itemName = document.querySelector(`[data-number="${number}"]`).previousElementSibling.innerHTML;
    const item = this.itemList.filter(v => v.name === itemName)[0];
    const imageList = document.querySelector('.image_list');
    const imageItem = document.createElement('li');
    imageItem.innerHTML =
      `<li>
        <img class = "item_image" alt="No Image" src="js/model/images/${item.imageName}">
      </li>`;
    imageList.insertAdjacentHTML('afterBegin', imageItem.innerHTML);

  }
  displaySelectedItemLog(number) {
    const itemName = document.querySelector(`[data-number="${number}"]`).previousElementSibling.innerHTML;
    const logList = document.querySelector('.log_list');
    const logItem = document.createElement('li');
    logItem.innerHTML =
      `<li class="log_item">
              <span>${number}번 ${itemName}가 선택됨</span>
            </li>`
    logList.insertAdjacentHTML('afterBegin', logItem.innerHTML);
  }

  displayInsertLog(target) {
    const logList = document.querySelector('.log_list');
    const logItem = document.createElement('li');
    logItem.innerHTML =
      `<li class="log_item">
              <span>${Util.numberWithCommas(target)}원이 투입됐습니다</span>
            </li>`
    logList.insertAdjacentHTML('afterBegin', logItem.innerHTML);
  }
  renderItem(itemList) {
    let processedItemList = itemList.reduce((acc, ele, idx) => {
      acc +=
        `<li class="item">
      <div class="item_container">
      <div class="item_name">${ele.name}</div>
      <div data-price=${ele.price} data-number=${idx + 1} class="item_price">${idx + 1}. ${ele.price}</div>
      </div>
      </li>`;
      return acc;
    }, '');
    document.querySelector('.item_list_container').innerHTML = processedItemList;
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
        if (!ele.classList.contains(availableItemClass)) ele.classList.add(availableItemClass);
      } else {
        if (ele.classList.contains(availableItemClass)) ele.classList.remove(availableItemClass);
      }
    }
  }
  rerender(totalInsertedMoney) {
    this.displayTotalInsertedMoney(totalInsertedMoney)
  }
  alertShortOfMoney() {
    alert('돈이 부족합니다');
  }
  alertNotAvailableNumber() {
    alert('번호가 유효하지 않습니다')
  }
}