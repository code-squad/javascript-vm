/*
Wallet의 랜더링을 담당하는 파일
초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
class WalletView {
  constructor(template) {
    this.clickMoneyButtonHandler = null;
    this.TMP = template;
  }

  initializeView(moneyList, fullAmount) {
    this.renderWallet(moneyList, fullAmount);
    this.addEventClickedMoney();
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

  renderWallet(moneyList, fullAmount) {
    this.displayMoney(moneyList);
    this.displayFullAmount(fullAmount);
  }

  displayMoney(moneyList) {
    const moneyListString = this.TMP.moneyListTemp(moneyList);
    document.querySelector('.money_list').innerHTML = moneyListString;
  }

  displayFullAmount(fullAmount) {
    document.querySelector('.full_amount').innerHTML = `${Util.numberWithCommas(fullAmount)}원`;
  }

  updateRendering(moneyUnit, moneyList, fullAmount) {
    this.displayChangedMoney(moneyUnit, moneyList);
    this.displayFullAmount(fullAmount);
  }

  changeFullAmount(fullAmount) {
    const fullAmountElement = document.querySelector('.full_amount');
    fullAmountElement.innerText = `${Util.numberWithCommas(fullAmount)}원`;
  }

  displayChangedMoney(moneyUnit, moneyList) {
    moneyUnit.forEach(unit => {
      const item = document.querySelector(`[data-money='${unit}'`);
      const numberOfItem = item.nextElementSibling;
      numberOfItem.innerText = `${moneyList[unit]}개`;
    });
  }

  printClickedMoney(clickedMoney) {
    console.log(`${clickedMoney}원`);
  }

  alertNoMoneyUnit(price) {
    alert(`지갑에 ${Util.numberWithCommas(price)}원이 부족합니다`);
  }

}