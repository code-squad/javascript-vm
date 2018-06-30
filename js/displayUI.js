class Display {
  constructor(item) {
    this.item = item;
    this.numberWithCommas = function (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
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

  createWallet() {
    const coinList = document.createElement('ul');
    coinList.className = 'coinList';
    document.querySelector('.coinUI').appendChild(coinList);
  }

  displayItem() {
    this.createItemListContainer();
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
  displayWallet(myWallet) {
    this.createWallet();
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

const vmDisplay = new Display(item);
vmDisplay.displayItem();
vmDisplay.displayCoinButton();
vmDisplay.displayWallet(wallet);