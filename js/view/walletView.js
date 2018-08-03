/*
Wallet의 랜더링을 담당하는 파일
초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
class WalletView {
  constructor(walletModel) {
    this.walletModel = walletModel;
    this.clickMoneyButtonHandler = null;
    this.displayMoney(walletModel);
    this.addEventMoneyButton();
  }

  addEventMoneyButton() {
    const moneyButtons = document.querySelectorAll('.money_list .money');
    moneyButtons.forEach((v, i) => {
      v.addEventListener('click', ({ target }) => {
        this.clickMoneyButtonHandler(target.dataset["money"]);
      })
    });
  }

  rerender(price, walletModel) {
    this.displayFullAmount(walletModel.fullAmount);
    this.changeNumberOfItem(price, walletModel.getMoneyList());
  }

  changeFullAmount(fullAmount) {
    const fullAmountElement = document.querySelector('.full_amount');
    fullAmountElement.innerText = `${Util.numberWithCommas(fullAmount)}원`;
  }

  changeNumberOfItem(price, moneyList) {
    const item = document.querySelector(`[data-money='${price}'`);
    const numberOfItem = item.nextElementSibling;
    numberOfItem.innerText = `${moneyList[price]}개`;
  }

  printClickedMoney(clickedMoney) {
    console.log(`${clickedMoney}원`);
  }

  displayMoney(walletModel) {
    this.renderMoney(walletModel.getMoneyList());
    this.displayFullAmount(walletModel.fullAmount);
  }

  renderMoney(money) {
    const moneyUnit = Object.keys(money);
    const moneyNumber = Object.values(money);
    const moneyList = moneyUnit.reduce((acc, ele, idx) => {
      acc +=
        `<li class= "money_item">
        <div class="money_container">
          <span class="money" data-money="${ele}">${Util.numberWithCommas(ele)}원</span>
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

  noMoneyUnit(price) {
    alert(`지갑에 ${Util.numberWithCommas(price)}원이 부족합니다`);
  }

}