class WalletView {
  constructor() {}
  init(wallet) {
    this.displayWalletHandler(wallet);
  }

  displayWalletHandler(wallet) {
    this.displayWallet(wallet);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  createListByClassName(parentClass, childClass) {
    const list = document.createElement('ul');
    list.className = childClass;
    document.querySelector(`.${parentClass}`).appendChild(list);
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
    this.displayFullAmount(myWallet);
  }

  displayFullAmount(myWallet) {
    let fullAmount = myWallet.reduce((ac, cv) => {
      ac += (cv.unit * cv.number);
      return ac;
    }, 0);
    document.querySelector('.fullAmount').innerHTML = `${this.numberWithCommas(fullAmount)}원`;
  }
}