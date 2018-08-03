/*
  Machine 랜더링을 담당하는 파일
  초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
class MachineView {
  constructor(machineModel) {
    this.machineModel = machineModel;
    this.clickItemNumberButtonHandler = null;
    this.displayItem(this.machineModel.itemList);
    this.displayTotalInsertedMoney(this.machineModel.totalInsertedMoney);
    this.clickItemNumberButton();
    this.selectObj = { acc: null, number: [] };
  }
  initTimer() {
    this.selectObj.number = [];
  }
  selectItem(number) {
    const itemNumber = document.querySelector(`[data-number="${number}"]`);
    const itemName = document.querySelector(`[data-number="${number}"]`).previousElementSibling.innerHTML;
    if (itemNumber.classList.contains('available_item')) {
      this.displayLog('select', `${number}번 ${itemName}`);
    } else {
      alert(`금액이 모자랍니다`);
    }
  }
  displayItem(itemList) {
    this.renderItem(itemList);
  }
  clickItemNumberButton() {
    const itemNumberList = document.querySelectorAll('.coin_button_item');
    itemNumberList.forEach(v => {
      v.addEventListener('click', ({ target }) => {
        this.clickItemNumberButtonHandler(target, this.selectObj);
      })
    })
  }
  displayLog(action, target) {
    const obj = {
      insert: function (money) { return `${Util.numberWithCommas(money)}원이 투입됐습니다` },
      select: function (item) { return `${target}가 선택됨` }
    }
    const logList = document.querySelector('.log_list');
    const logItem = document.createElement('li');
    logItem.innerHTML =
      `<li class="log_item">
              <span>${obj[action](target)}</span>
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
  displayAvailableItem() {
    const itemList = document.querySelectorAll('.item_price');
    const totalInsertedMoney = this.machineModel.totalInsertedMoney;
    const availableItemClass = 'available_item';
    for (let ele of itemList) {
      if (ele.getAttribute('data-price') <= totalInsertedMoney) {
        if (!ele.classList.contains(availableItemClass)) ele.classList.add(availableItemClass);
      }
    }
  }
  rerender(totalInsertedMoney) {
    this.displayTotalInsertedMoney(totalInsertedMoney)
  }
}