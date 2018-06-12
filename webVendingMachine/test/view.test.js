import {VendingMachineView} from '../js/view';
import {gs} from '../js/utils';

// 전체를 다 하면 좋지만 주요메소드 위주로만 우선 테스트-> 시간 대비 학습효과!
// 1. insertMoney 
// 2. selectSnak 
// 3. useMoney 


describe('VendingMachineView Test', () => {
  let vendingMachineView;
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
    `
    document.body.innerHTML = testTemplate.trim()
    vendingMachineView = new VendingMachineView()
    // console.log('test',gs('.money-button-list') === vendingMachineView.moneyButtonListEl)
    vendingMachineView.bindEvents();
    vendingMachineView.controller = {}
    vendingMachineView.controller.on = (evtName, data)=> {evtName, data} 
  })
  test('moneyButton이 클릭되었을 떄 money를 handleMoneyBtn ClickedMethod가 불리는지', () => {
    // 이벤트 캡쳐링 ?.? 어떻게 해야 될지 
    
    //given
    vendingMachineView.handleMoneyButtonClicked = jest.fn();
    const evt = new Event('click');
    //when
    console.log('aaaa',vendingMachineView.moneyButtonListEl)
    vendingMachineView.moneyButtonListEl.dispatchEvent(evt)

    // 버튼에 바로 dispatch하는 것으로는 바인딩 이벤트를 인식 못해서 나서 2번쨰 방법으로 접근했습니다.
    // gs('.money-button').dispatchEvent(evt)

    //then
    expect(vendingMachineView.handleMoneyButtonClicked).toHaveBeenCalled()
    });

    test('handleMoneyButtonClicked되고 target이 ', () => {
      
      //given
      vendingMachineView.emit = jest.fn();
      const evtMock = {}
      evtMock.target = gs('.money-button')
      const mockMoney = 1000
      console.dir(evtMock)
      //when
      vendingMachineView.handleMoneyButtonClicked(evtMock)       
      //then
      expect(vendingMachineView.emit).toHaveBeenCalledWith('useMoney', mockMoney)
      });
      test('moneyButton이 클릭되었을 떄 money를 handleMoneyBtn ClickedMethod가 불리는지', () => {
        // 이벤트 캡쳐링 ?.? 어떻게 해야 될지 
        
        //given
        vendingMachineView.handleMoneyButtonClicked = jest.fn();
        const evt = new Event('click');
        //when
        
        vendingMachineView.moneyButtonListEl.dispatchEvent(evt)
        //then
        expect(vendingMachineView.handleMoneyButtonClicked).toHaveBeenCalled()
        });
});
