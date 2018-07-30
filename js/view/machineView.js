/*
  Machine 랜더링을 담당하는 파일
  초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
class MachineView {
  constructor(commonView, machineModel) {
    this.commonView = commonView;
    this.machineModel = machineModel;
    this.displayItem(machineModel.itemList);
    this.displayInsertedMoney(machineModel.insertedMoney);
  }

  displayItem(itemList) {
    this.commonView.createListByClassName('item_display', 'item_list_container');
    this.renderItem(itemList);
  }
  displayInsertLog(insertedMoney) {
    const logList = document.querySelector('.log_list');
    logList.innerHTML +=
      `<li class="log_item">
    <span>${Util.numberWithCommas(insertedMoney)}원이 투입됐습니다</span>
    </li>`
  }
  renderItem(itemList) {
    let processedItemList = itemList.reduce((acc, ele, idx) => {
      acc +=
        `<li class="item">
      <div class="item_container">
      <div class="item_name">${ele.name}</div>
      <div class="item_price">${idx + 1}. ${ele.price}</div>
      </div>
      </li>`;
      return acc;
    }, '');
    document.querySelector('.item_list_container').innerHTML = processedItemList;
  }
  displayInsertedMoney(insertedMoney) {
    let currentCoin = document.querySelector('.current_coin');
    currentCoin.innerHTML = `${Util.numberWithCommas(insertedMoney)}원`;
  }
  rerender(insertedMoney) {
    this.displayInsertedMoney(insertedMoney)
  }
}