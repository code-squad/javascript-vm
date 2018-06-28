class Display {
  constructor(item) {
    this.item = item;
  }
  createItemListContainer() {
    const itemList = document.createElement('ul');
    itemList.className = 'itemListContainer';
    document.querySelector('.itemDisplay').appendChild(itemList);
  }
  createCoinButtontDiplay() {
    const coinButtonList = document.createElement('ul');
    coinButtonList.className = 'coinButtonListContainer';
    document.querySelector('.coinButtonContainer').appendChild(coinButtonList);
  }
  displayBeverage() {
    this.createItemListContainer();
    let beverageListHTML = '';
    this.item.forEach((ele, idx) => {
      beverageListHTML +=
        `<li class="item">
          <div class="itemContainer">
            <div class="itemName">${ele.name}</div>
            <div class="itemPrice">${idx+1}. ${ele.price}</div>
          </div>
        </li>`;
    })
    document.querySelector('.itemListContainer').innerHTML = beverageListHTML;
  }
  displayCoinButton() {
    this.createCoinButtontDiplay();
    let coinButtonHTML = '';
    for (let i = 1; i <= 10; i++) {
      coinButtonHTML +=
        `<li class="coinButtonItem">
          <div class="coinButton">${i === 10 ? 0 : i}</div>
        </li>
        `
    }
    document.querySelector('.coinButtonListContainer').innerHTML = coinButtonHTML;
  }
}

const vmDisplay = new Display(item);
vmDisplay.displayBeverage();
vmDisplay.displayCoinButton();