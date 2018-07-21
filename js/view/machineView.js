class MachineView extends CommonFunction {
  constructor() {
    super();
  }

  displayMachineHandler(itemList) {
    this.displayCoinButton();
    this.displayItem(itemList);
  }

  displayItem(itemList) {
    this.createListByClassName('itemDisplay', 'itemListContainer');
    let processedItemList = itemList.reduce((acc, ele, idx) => {
      acc +=
        `<li class="item">
          <div class="itemContainer">
            <div class="itemName">${ele.name}</div>
            <div class="itemPrice">${idx+1}. ${ele.price}</div>
          </div>
        </li>`;
      return acc;
    }, '');
    document.querySelector('.itemListContainer').innerHTML = processedItemList;
  }

  displayCoinButton() {
    this.createListByClassName('coinButtonContainer', 'coinButtonListContainer');
    let coinButtonHTML = '';
    const MAX_COUNT = 10;
    for (let i = 1; i <= MAX_COUNT; i++) {
      coinButtonHTML +=
        `<li class="coinButtonItem">
          <div class="coinButton">${i === MAX_COUNT ? 0 : i}</div>
        </li>
        `
    }
    document.querySelector('.coinButtonListContainer').innerHTML = coinButtonHTML;
  }
}