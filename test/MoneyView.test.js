import MoneyView from '../js/MoneyView.js'
import VmController from '../js/VmController.js'
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
const moneyView = new MoneyView();
const initMoneyData = {
  yourMoney: 30000,
  inputMoney: 0,
  coinCount: { 10000: 1, 5000: 2, 1000: 5, 500: 8, 100: 10 }
}

function initialize() {
  moneyView.setMoneyData(initMoneyData);
}

beforeEach(initialize);
afterAll(() => {
  jest.useRealTimers();
})
describe("MoneyView Unit TEST", () => {

  test('총액 30000원이 view에 30000만원이 잘 있는 지 확인한다.', () => {
    //when
    moneyView.walletView();
    const yourMoney = document.querySelector('.your-money').innerText;
    //then
    expect('30000원').toBe(yourMoney);
  })
  test('자판기에 넣은 금액이 0원인지 확인한다.', () => {
    //when
    moneyView.inputMoneyHandler = jest.fn();
    moneyView.inputMoneyView();
    const inputMoney = document.querySelector('.input-money').innerText;
    //then
    expect('0원').toBe(inputMoney);
  })
  test('자판기의 동전의 갯수가 맞는지 확인한다.', () => {
    //when
    moneyView.walletCoinView();
    const firstCoinCount = document.querySelector('.current-coin-count').innerHTML;
    //then
    expect(firstCoinCount).toBe('10개');
  })
  test('지갑이 동전이 없는 지 확인한다. 동전이 없을 때 true값을 반환하고 이벤트핸들러함수가 호출된다.', () => {
    //when
    moneyView.showNoMoneyHandler = jest.fn();
    moneyView.setMoneyData({ inputMoney: 0, yourMoney: 0, coinCount: { 100: 0 } })
    const result = moneyView.lackCoinCount(100);
    expect(moneyView.showNoMoneyHandler).toBeCalled();
    expect(true).toBe(result);
  })
})

describe('금액 반환 시 TEST', () => {
  //given
  jest.useFakeTimers();

  test('금액 반환시에 setTimeout이 호출된다.', () => {
    //when
    moneyView.returnMoney();
    //then
    expect(setTimeout).toBeCalled();
  })
  test('금액 반환을 멈추고 싶을 때 clearTimeout이 호출된다.', () => {
    //when
    moneyView.stopReturnMoney();
    //then
    expect(clearTimeout).toBeCalled();
  })
  test('금액 반환시에 이벤트핸들러함수가 호출된다', () => {
    //given
    const moneyViewSpy = jest.spyOn(moneyView, 'moneyView');
    moneyView.returnMoneyHandler = jest.fn();
    //when
    moneyView.returnMoney();
    jest.runAllTimers();
    //then
    expect(moneyViewSpy).toBeCalled();
    expect(moneyView.returnMoneyHandler).toBeCalled();
  })
})

describe('자판기에 돈을 넣었을 때 이벤트 TEST', () => {

  test('동전버튼이 아닌 것을 click하면 콜백함수안에 있는 함수가 호출되지 않는다.', () => {
    //given
    const spy = jest.spyOn(moneyView, 'stopReturnMoney');
    const evt = new Event('click', { bubbles: true });
    //when
    document.querySelector(".current-coin-count").dispatchEvent(evt);
    //then
    expect(spy).not.toBeCalled();
  })

  test('자판기에 동전을 넣을 시에 이벤트가 발생한다.', () => {
    //given
    jest.useFakeTimers();
    moneyView.insertCoinHandler = jest.fn();
    const stopReturnSpy = jest.spyOn(moneyView, 'stopReturnMoney');
    const moneyViewSpy = jest.spyOn(moneyView, 'moneyView');
    const evt = new Event('click', { bubbles: true });
    //when
    document.querySelector('.insert-coin-button').dispatchEvent(evt);
    //then
    expect(moneyViewSpy).toBeCalled();
    expect(stopReturnSpy).toBeCalled();
    expect(moneyView.insertCoinHandler).toBeCalled();
    expect(moneyView.insertCoinHandler).toBeCalledWith(100);
  })
})