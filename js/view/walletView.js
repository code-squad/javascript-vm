/*
Wallet의 랜더링을 담당하는 파일
초기 디스플레이, 이벤트 시에 화면 변화를 담당한다
*/
import { Util } from '../util/util.js'
export default class WalletView {
  constructor(template) {
    this.clickMoneyButtonHandler = null;
    this.TMP = template;
  }

  initializeView(moneyList, fullAmount) {
    this.renderWallet(moneyList, fullAmount);
    document.addEventListener('DOMContentLoaded', () => { this.addEventClickedMoney() });
  }

  addEventClickedMoney() {
    const moneyList = document.querySelector('.money_list');
    moneyList.addEventListener('click', ({ target }) => {
      if (target.className !== 'money') return;
      let moneyUnit = target.dataset["money"];
      this.clickMoneyButtonHandler(moneyUnit);

    })
  }

  renderWallet(moneyList, fullAmount) {
    this.renderMoney(moneyList);
    this.renderFullAmount(fullAmount);
  }

  renderMoney(moneyList) {
    const moneyListString = this.TMP.moneyListTemp(moneyList);
    document.querySelector('.money_list').innerHTML = moneyListString;
  }

  renderFullAmount(fullAmount) {
    document.querySelector('.full_amount').innerHTML = `${Util.numberWithCommas(fullAmount)}원`;
  }

  updateRendering(moneyUnit, moneyList, fullAmount) {
    this.renderChangedMoney(moneyUnit, moneyList);
    this.renderFullAmount(fullAmount);
  }

  changeFullAmount(fullAmount) {
    const fullAmountElement = document.querySelector('.full_amount');
    fullAmountElement.innerText = `${Util.numberWithCommas(fullAmount)}원`;
  }

  renderChangedMoney(moneyUnit, moneyList) {
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