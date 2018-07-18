class VendingMachine {
  constructor(item) {
    this.item = item;
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  createListByClassName(parentClass, childClass) {
    const list = document.createElement('ul');
    list.className = childClass;
    document.querySelector(`.${parentClass}`).appendChild(list);
  }

  displayItem() {
    this.createListByClassName('itemDisplay', 'itemListContainer');
    let itemListHTML = '';
    this.item.forEach((ele, idx) => {
      itemListHTML +=
        `<li class="item">
          <div class="itemContainer">
            <div class="itemName">${ele.name}</div>
            <div class="itemPrice">${idx+1}. ${ele.price}</div>
          </div>
        </li>`;
    })
    document.querySelector('.itemListContainer').innerHTML = itemListHTML;
  }
  displayCoinButton() {
    this.createListByClassName('coinButtonContainer', 'coinButtonListContainer');
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
  displayWallet(myWallet) {
    this.createListByClassName('coinUI', 'coinList');
    let coinList = '';
    myWallet.forEach((ele, idx) => {
      coinList +=
        `<li class= "coinItem">
        <div class="coinContainer">
          <span class="coin">${this.numberWithCommas(ele.unit)}원</span>
          <span class="numberOfCoin">${ele.number}개</span>
        </div>
      </li>
      `
    })
    document.querySelector('.coinList').innerHTML = coinList;
  }
}

const vendingMachine = new VendingMachine(item);
vendingMachine.displayItem();
vendingMachine.displayCoinButton();
vendingMachine.displayWallet(wallet);