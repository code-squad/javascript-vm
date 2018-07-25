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

  printClickedMoney(clickedMoney) {
    console.log(clickedMoney.innerText);
  }

  displayMoney(money) {
    this.commonView.createListByClassName('wallet_container', 'money_list');
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
    this.displayFullAmount(moneyUnit, moneyNumber);
  }

  displayFullAmount(moneyUnit, moneyNumber) {
    const fullAmount = moneyUnit.reduce((acc, ele, idx) => {
      acc += (ele * moneyNumber[idx]);
      return acc;
    }, 0);
    document.querySelector('.full_amount').innerHTML = `${Util.numberWithCommas(fullAmount)}원`;
  }
}