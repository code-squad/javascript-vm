/*
  Machine 랜더링을 담당하는 파일
  초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
class MachineView {
  constructor(machineModel) {
    this.machineModel = machineModel;
    this.displayItem(machineModel.itemList);
    this.displayTotalInsertedMoney(machineModel.totalInsertedMoney);
  }

  displayItem(itemList) {
    this.renderItem(itemList);
  }
  displayInsertLog(insertedMoney) {
    const logList = document.querySelector('.log_list');
    const logItem = document.createElement('li');
    logItem.innerHTML =
      `<li class="log_item">
              <span>${Util.numberWithCommas(insertedMoney)}원이 투입됐습니다</span>
            </li>`
    logList.insertAdjacentHTML('afterBegin', logItem.innerHTML);
  }
  renderItem(itemList) {
    let processedItemList = itemList.reduce((acc, ele, idx) => {
      acc +=
        `<li class="item">
      <div class="item_container">
      <div class="item_name">${ele.name}</div>
      <div data-price=${ele.price} class="item_price">${idx + 1}. ${ele.price}</div>
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