class WalletView extends CommonFunction {
  constructor() {
    super();
  }
  clickCoinButtonHandler() {
    let coinButtons = document.querySelectorAll('.coinList .coin');
    this.printClickedCoin(coinButtons);
  }
  printClickedCoin(coinButtons) {
    coinButtons.forEach(v => {
      v.addEventListener('click', (e) => {
        console.log(e.target.innerHTML);
      })
    });
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