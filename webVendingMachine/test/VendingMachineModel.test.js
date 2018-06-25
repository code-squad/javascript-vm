import { VendingMachineModel } from'../js/VendingMachineModel.js';
import { snackList } from'../js/assets';
import { VendingMachineView } from '../js/VendingMachineView';
import { getEl } from '../js/utils.js';
import { templateMock } from './templateMock.js';

document.body.innerHTML = templateMock;

// 전체를 다 하면 좋지만 주요메소드 위주로만 우선 테스트-> 시간 대비 학습효과!
// 1. insertMoney 
// 2. selectSnak 
// 3. useMoney 

describe('VendingMachineModel Test', () => {
  let vendingMachineModel;
  
  beforeEach(()=>{
    vendingMachineModel = new VendingMachineModel(snackList)
    vendingMachineModel.controller = {}
    vendingMachineModel.money = 0; 
    vendingMachineModel.controller.on = (evtName, data)=> {evtName, data} 
  })

  test('insertMoney Test 입력한 돈 만큼 돈이 들어오는지 테스트', () => {
    //given
    const inputMoney = 1000;
    const initialMoney = vendingMachineModel.money
    //when
    vendingMachineModel.insertMoney(inputMoney)
    //then
    expect(vendingMachineModel.money).toBe(inputMoney+initialMoney)

  });

  test('insertMoney가 실행되면 뷰에 현재 money를 넘겨준다.', () => {
    
    //given
    const vendingMachineView = new VendingMachineView()
    vendingMachineModel.controller.on = (eventName, data)=> {
      const events = {
        'updateLogView': ()=>{},
        'displayCanBuyList': ()=>{},
        'updateViewVendingMachineMoney': vendingMachineView.updateViewVendingMachineMoney.bind(vendingMachineView),
      }
      events[eventName](data);
    } 
    const inputMoney = 1000;
    const initialMoney = vendingMachineModel.money
    const changedMoney = initialMoney+inputMoney
    
    
    //when
    vendingMachineModel.insertMoney(inputMoney)
    //then
    expect(vendingMachineView.insertedMoneyEl.innerText).toBe((changedMoney).toString())
  });

  test('뷰에 살 수 있는 목록들을 가지고 와서 넘겨준다.  displayCanBuyList에 넘겨주는지 테스트', () => {
    // 현재돈과 method를 호출하고 나머지 호출했을 떄 가격에 맞게 잘 출력하는지는 뷰에서 테스트 
    //given
    const inputMoney = 1000;
    const initialMoney = vendingMachineModel.money
    vendingMachineModel.emit = jest.fn();
    
    //when
    vendingMachineModel.insertMoney(inputMoney)
    //then
    expect(vendingMachineModel.emit).toHaveBeenCalledWith('displayCanBuyList',initialMoney+inputMoney)

  });

  test('insertMoney를 3번 했을 때 logInsert가 잘 기록되는지 테스트', () => {
      //given
      const inputMoneyList = [1000, 500, 100];
      const initialMoney = vendingMachineModel.money
      //when
      vendingMachineModel.insertMoney(inputMoneyList[0])
      vendingMachineModel.insertMoney(inputMoneyList[1])
      vendingMachineModel.insertMoney(inputMoneyList[2])
      //then
      console.log(vendingMachineModel.logHistoryList)
      // length만 test
      // ...
      expect(vendingMachineModel.getLogHistory().length).toBe(3)
      });
      
    test('select Snack Test 살 수 있는 경우 selectSnack을 했을 때 그 상품만큼 가격만큼 차감되는지 test', () => {
      // 1. 유효 번호 선택경우 살 수 있는 경우 테스트 
      
      //given
      vendingMachineModel.selectedText = '1';
      const inputMoney = 10000;
      vendingMachineModel.insertMoney(inputMoney);

      const selectedOne = vendingMachineModel.snackList.find(snack=>snack.id===Number(vendingMachineModel.selectedText))
      vendingMachineModel.selectSnack(Number(vendingMachineModel.selectedText))
      //when 
      expect(vendingMachineModel.money).toBe(inputMoney-selectedOne.price)

      });
      test('select Snack Test 살 수 있는 경우 selectSnack을 했을 때 그 상품정보를 메소드에 잘 보내주는지 test', () => {
        // 1. 유효 번호 선택경우 살 수 있는 경우 테스트 
        
        //given
        vendingMachineModel.selectedText = '1';
        const inputMoney = 10000;
        vendingMachineModel.insertMoney(inputMoney);
  
        const selectedOne = vendingMachineModel.snackList.find(snack=>snack.id===Number(vendingMachineModel.selectedText))
        vendingMachineModel.emit = jest.fn();
        vendingMachineModel.selectSnack(Number(vendingMachineModel.selectedText))
        
        //when         
        const updateLogdata = {...selectedOne, logType:'displaySelectedOne'}
        expect(vendingMachineModel.emit).toHaveBeenCalledWith('updateLogView',updateLogdata)
      });
});


