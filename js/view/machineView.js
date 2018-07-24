class MachineView {
  constructor(commonView) {
    this.commonView = commonView;
  }

  displayMachineHandler(itemList) {
    this.displayItem(itemList);
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
}