class WalletView {
  constructor(commonView) {
    this.commonView = commonView;
    this.clickMoneyButtonHandler = null;
  }
  clickMoneyButtons() {
    const moneyButtons = document.querySelectorAll('.money_list .money');
    moneyButtons.forEach((v, i) => {
      v.addEventListener('click', ({ target }) => {
        this.clickMoneyButtonHandler(target);
      })
    });
  }
  rerender(price, walletModel) {
    this.changeFullAmount(walletModel.fullAmount);
    this.changeNumberOfItem(price, walletModel.getMoneyList());
  }
  changeFullAmount(fullAmount) {
    const fullAmountElement = document.querySelector('.full_amount');
    fullAmountElement.innerText = `${Util.numberWithCommas(fullAmount)}원`;
  }
  changeNumberOfItem(price, moneyList) {
    const item = document.querySelector(`[data-price='${price}'`);
    const numberOfItem = item.nextElementSibling;
    numberOfItem.innerText = `${moneyList[price]}개`;

  }
  printClickedMoney(clickedMoney) {
    console.log(clickedMoney.innerText);
  }

  displayMoney(walletModel) {
    this.commonView.createListByClassName('wallet_container', 'money_list');
    this.updateMoney(walletModel.money);
    this.displayFullAmount(walletModel.fullAmount);
  }
  updateMoney(money) {
    const moneyUnit = Object.keys(money);
    const moneyNumber = Object.values(money);
    const moneyList = moneyUnit.reduce((acc, ele, idx) => {
      acc +=
        `<li class= "money_item">
        <div class="money_container">
          <span class="money" data-price="${ele}">${Util.numberWithCommas(ele)}원</span>
          <span class="number_of_money">${moneyNumber[idx]}개</span>
        </div>
      </li>
      `
      return acc;
    }, '');
    document.querySelector('.money_list').innerHTML = moneyList;
  }

  displayFullAmount(fullAmount) {
    document.querySelector('.full_amount').innerHTML = `${Util.numberWithCommas(fullAmount)}원`;
  }
}