class MachineView {
  constructor(commonView) {
    this.commonView = commonView;
  }

  displayMachineHandler(machineModel) {
    this.displayItem(machineModel.itemList);
    this.displayInsertedMoney(machineModel.insertedMoney);
  }

  displayItem(itemList) {
    this.commonView.createListByClassName('item_display', 'item_list_container');
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
}