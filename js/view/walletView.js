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

  rerender(moneyList, fullAmount) {
    this.displayMoney(moneyList);
    this.addEventClickedMoney();
    this.displayFullAmount(fullAmount);
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

  renderWallet(moneyList, fullAmount) {
    this.displayMoney(moneyList);
    this.displayFullAmount(fullAmount);
  }

  displayMoney(moneyList) {
    const moneyListString = Temp.moneyListTemp(moneyList);
    document.querySelector('.money_list').innerHTML = moneyListString;
  }

  displayFullAmount(fullAmount) {
    document.querySelector('.full_amount').innerHTML = `${Util.numberWithCommas(fullAmount)}원`;
  }

  noMoneyUnit(price) {
    alert(`지갑에 ${Util.numberWithCommas(price)}원이 부족합니다`);
  }

}