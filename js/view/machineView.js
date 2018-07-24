class MachineView {
  constructor(commonView) {
    this.commonView = commonView;
  }

  displayMachineHandler(itemList) {
    this.displayItem(itemList);
  }

  displayItem(itemList) {
    this.commonView.createListByClassName('itemDisplay', 'itemListContainer');
    let processedItemList = itemList.reduce((acc, ele, idx) => {
      acc +=
        `<li class="item">
          <div class="itemContainer">
            <div class="itemName">${ele.name}</div>
            <div class="itemPrice">${idx + 1}. ${ele.price}</div>
          </div>
        </li>`;
      return acc;
    }, '');
    document.querySelector('.itemListContainer').innerHTML = processedItemList;
  }
}