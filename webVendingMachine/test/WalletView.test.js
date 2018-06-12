import {WalletView} from '../js/WalletView.js';
import {gs} from '../js/utils';

// 전체를 다 하면 좋지만 주요메소드 위주로만 우선 테스트-> 시간 대비 학습효과!
// 1. insertMoney 
// 2. selectSnak 
// 3. useMoney 


describe('walletView Test', () => {
  let walletView;
  beforeEach(()=>{
    const testTemplate = 
    `
    <input class="select-input" type="text" placeholder="choose your snack">
    <ul class="number-buttons">
      <li>
          <button class="select-button">1</button>
      </li>
      <li>
          <button class="select-button">선택</button>
      </li>
      <li>
          <button class="select-button">취소</button>
      </li>    
    </ul>
    <ul class="money-button-list">
          <li class="wallet-money-button">
            <button class="money-button" data-money="1000" data-unit="원">1000 원</button>
            <span class="money-count" data-count="5">5개</span>
          </li>
      </ul>
      <div class="total-my-assets">
      <p>
          <span class="money">3000</span><span class="unit">원</span>
      </p>
      </div>
    `
    document.body.innerHTML = testTemplate.trim()
    walletView = new WalletView()
    // console.log('test',gs('.money-button-list') === vendingMachineView.moneyButtonListEl)
    walletView.bindEvent();
    walletView.controller = {}
    walletView.controller.on = (evtName, data)=> {evtName, data} 
  })
  test('moneyButton이 클릭되었을 떄 money를 handleMoneyBtn ClickedMethod가 불리는지', () => {
    // 이벤트 캡쳐링 ?.? 어떻게 해야 될지 
    
    //given
    walletView.handleMoneyButtonClicked = jest.fn();
    const evt = new Event('click');
    //when
    walletView.moneyButtonListEl.dispatchEvent(evt)

    // 버튼에 바로 dispatch하는 것으로는 바인딩 이벤트를 인식 못해서 나서 2번쨰 방법으로 접근했습니다.
    // gs('.money-button').dispatchEvent(evt)

    //then
    expect(walletView.handleMoneyButtonClicked).toHaveBeenCalled()
   });

  test('머니메소드에서는 evt.target에 data-count 와 data-money를 가지고 와서 업데이트 하는지 test', () => {
  
    //given
    walletView.emit = jest.fn();
    const evtMock = {}
    evtMock.target = gs('.money-button')
    const moneyCountEl = gs('.money-count')
    console.log('moneyCountEl', moneyCountEl)
    const initCount = Number(moneyCountEl.dataset.count)
    const money = Number(evtMock.target.dataset.money)
    //when
    const initTotalMoney = Number(walletView.myTotalMoneyEl.innerText)
    walletView.handleMoneyButtonClicked(evtMock)       
    //then
    expect(Number(walletView.myTotalMoneyEl.innerText)).toBe(initTotalMoney-money)
    expect(Number(moneyCountEl.dataset.count)).toBe(initCount-1)
   });  

  test('handleMoneyButtonClicked되고 해당 MoneyBtn data-money와 함께 메소드 useMoney를 emit한다', () => {
    
    //given
    walletView.emit = jest.fn();
    const evtMock = {}
    evtMock.target = gs('.money-button')
    const mockMoney = 1000
    console.dir(evtMock)
    //when
    walletView.handleMoneyButtonClicked(evtMock)       
    //then
    expect(walletView.emit).toHaveBeenCalledWith('useMoney', mockMoney)
    });
});
