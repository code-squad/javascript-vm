/*
Wallet의 랜더링을 담당하는 파일
초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
class WalletView {
  constructor() {
    this.clickMoneyButtonHandler = null;
  }

  addEventClickedMoney() {
    const moneyButtons = document.querySelectorAll('.money_list .money');
    moneyButtons.forEach((v) => {
      v.addEventListener('click', ({ target }) => {
        let moneyUnit = target.dataset["money"];
        this.clickMoneyButtonHandler(moneyUnit);
      })
    });
  }

  rerender(wallet) {
    this.renderMoney(wallet.getMoneyList());
    this.addEventClickedMoney();
    this.displayFullAmount(wallet.getFullAmount());
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

  displayMoney(wallet) {
    this.renderMoney(wallet.getMoneyList());
    this.displayFullAmount(wallet.getFullAmount());
  }

  renderMoney(moneyList) {
    const moneyUnit = Object.keys(moneyList);
    const moneyNumber = Object.values(moneyList);
    const moneyView = moneyUnit.reduce((acc, ele, idx) => {
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
    document.querySelector('.money_list').innerHTML = moneyView;
  }

  displayFullAmount(fullAmount) {
    document.querySelector('.full_amount').innerHTML = `${Util.numberWithCommas(fullAmount)}원`;
  }

  noMoneyUnit(price) {
    alert(`지갑에 ${Util.numberWithCommas(price)}원이 부족합니다`);
  }

}