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
    const MAX_COUNT = 10;
    const completedCoinButton = Array.from(Array(MAX_COUNT).keys()).reduce((acc, ele, idx) => {
      acc +=
        `<li class="coinButtonItem">
          <div class="coinButton">${++ele === MAX_COUNT ? 0 : ele}</div>
        </li>
        `
      return acc;
    }, '');
    console.log(completedCoinButton);
    document.querySelector('.coinButtonListContainer').innerHTML = completedCoinButton;
  }
}