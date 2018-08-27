import MoneyView from '../js/MoneyView.js'
import SelectItemView from '../js/SelectItemView.js'
document.body.innerHTML = `
<div class='input-money'></div>
<div class='your-money'></div>
<div class='wallet'><ul>
    <li>
        <div data-coin="100" class="insert-coin-button">100원</div>
        <div class="current-coin-count"></div>
    </li>
</ul></div>
`

test('자판기에 동전을 넣을 시에 이벤트가 발생한다.', () => {

  //given
  let moneyView = new MoneyView();
  const initMoneyData = {
    yourMoney: 30000,
    inputMoney: 0,
    coinCount: { 10000: 1, 5000: 2, 1000: 5, 500: 8, 100: 10 }
  }
  moneyView.inputMoneyHandler = jest.fn();
  moneyView.insertCoinHandler = jest.fn();
  const stopReturnSpy = jest.spyOn(moneyView, 'stopReturnMoney');
  const moneyViewSpy = jest.spyOn(moneyView, 'moneyView');
  const evt = new Event('click', { bubbles: true });

  //when
  moneyView.setMoneyData(initMoneyData);
  document.querySelector('.insert-coin-button').dispatchEvent(evt);

  //   //then
  expect(moneyViewSpy).toBeCalled();
  expect(stopReturnSpy).toBeCalled();
  expect(moneyView.insertCoinHandler).toBeCalled();
  expect(moneyView.insertCoinHandler).toBeCalledWith(100);
  expect(true).toBe(true);
})

test('setTimeout과 clearTimeout 돈을 반환하지 않게하는 함수가 호출된다.', () => {

  //given
  document.body.innerHTML = `
  <div class="select-button-part"><ul>
  <li class="basic-button select-button">1</li>
  <li class="basic-button select-button">2</li>
  </ul></div>`
  const selectItemView = new SelectItemView('3000');
  selectItemView.stopReturnMoneyHandler = jest.fn();
  const evt = new Event('click', { bubbles: true });

  //when
  jest.useFakeTimers();
  document.querySelector('.select-button').dispatchEvent(evt);

  //then
  expect(setTimeout).toBeCalled();
  expect(clearTimeout).toBeCalled();
  expect(selectItemView.stopReturnMoneyHandler).toBeCalled();
})