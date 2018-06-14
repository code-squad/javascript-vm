import {VendingMachineView} from '../js/VendingMachineView.js';
import {gs, acL, gsA} from '../js/utils.js';
import {templateMock} from './templateMock.js';

describe('VendingMachineView Test', () => {
  let vendingMachineView;
  beforeEach(()=>{
    document.body.innerHTML = templateMock.trim()
    vendingMachineView = new VendingMachineView()
    // console.log('test',gs('.money-button-list') === vendingMachineView.moneyButtonListEl)
    vendingMachineView.bindEvents();
    vendingMachineView.controller = {}
    vendingMachineView.controller.on = (evtName, data)=> {evtName, data} 
  })
  test('vendingMachine View 돈 입력된 만큼 insertMoney표시 된다.', () => {
  
     //given
    const vendingMachineMoney = 1000;
    console.log(vendingMachineView.insertedMoneyEl.innerText);
    //when
    vendingMachineView.updateViewVendingMachineMoney(vendingMachineMoney)

    //then
    const loggedMoney = Number(vendingMachineView.insertedMoneyEl.innerText)
    expect(loggedMoney).toBe(vendingMachineMoney)
   });

   test('vendingMachine View 돈 입력된 만큼 살 수 있는 목록을 하이라이트 시켜준다.', () => {
  
    //given
   const vendingMachineMoney = 1000;
   //when
   vendingMachineView.displayCanBuyList(vendingMachineMoney)
   const getList =vendingMachineView.getCanBuyList(vendingMachineMoney)
  
   //then
   expect( getList.length ).toBe(gsA('.red').length)
  });
  
  // test('선택할 수 없는 번호가 선택시 선택할 수 없다는 메시지 출력된다 테스트', () => {
    
  //   //given

  //   // vendingMachineView.mock = jest.fn();
  //   vendingMachineView.handleSelecButtonClicked()
  //   //when
  //   walletView.handleMoneyButtonClicked(evtMock)       
  //   //then
  //   expect(walletView.emit).toHaveBeenCalledWith('useMoney', mockMoney)
  //   });
});
