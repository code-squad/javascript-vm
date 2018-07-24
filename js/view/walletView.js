class WalletView {
  constructor(commonView) {
    this.commonView = commonView;
  }
  clickCoinButtonHandler() {
    const coinButtons = document.querySelectorAll('.coinList .coin');
    this.printClickedCoin(coinButtons);
  }

  printClickedCoin(coinButtons) {
    coinButtons.forEach(v => {
      v.addEventListener('click', ({ target }) => {
        console.log(target.innerHTML);
      })
    });
  }

  displayWallet(myWallet) {
    this.commonView.createListByClassName('coinUI', 'coinList');
    const coinList = myWallet.reduce((acc, ele, idx) => {
      acc +=
        `<li class= "coinItem">
        <div class="coinContainer">
          <span class="coin">${Util.numberWithCommas(ele.unit)}원</span>
          <span class="numberOfCoin">${ele.number}개</span>
        </div>
      </li>
      `
      return acc;
    }, '');
    document.querySelector('.coinList').innerHTML = coinList;
    this.displayFullAmount(myWallet);
  }

  displayFullAmount(myWallet) {
    const fullAmount = myWallet.reduce((ac, cv) => {
      ac += (cv.unit * cv.number);
      return ac;
    }, 0);
    document.querySelector('.fullAmount').innerHTML = `${Util.numberWithCommas(fullAmount)}원`;
  }
}