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
    this.commonView.createListByClassName('wallet_container', 'money_list');
    const moneyList = myWallet.reduce((acc, ele, idx) => {
      acc +=
        `<li class= "money_item">
        <div class="money_container">
          <span class="money">${Util.numberWithCommas(ele.unit)}원</span>
          <span class="number_of_money">${ele.number}개</span>
        </div>
      </li>
      `
      return acc;
    }, '');
    document.querySelector('.money_list').innerHTML = moneyList;
    this.displayFullAmount(myWallet);
  }

  displayFullAmount(myWallet) {
    const fullAmount = myWallet.reduce((ac, cv) => {
      ac += (cv.unit * cv.number);
      return ac;
    }, 0);
    document.querySelector('.full_amount').innerHTML = `${Util.numberWithCommas(fullAmount)}원`;
  }
}