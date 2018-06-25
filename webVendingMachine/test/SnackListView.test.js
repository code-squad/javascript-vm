import { SnackListView } from '../js/SnackListView.js';
import { getElAll } from '../js/utils.js';
import { templateMock } from './templateMock.js';

document.body.innerHTML = templateMock;


describe('SnackListView Test', () => {
  let snackListView;
  beforeEach(()=>{
    document.body.innerHTML = templateMock.trim()
    snackListView = new SnackListView()
    snackListView.controller = {}
    snackListView.controller.on = (evtName, data)=> {evtName, data} 
  })

  test('vendingMachine View 돈 입력된 만큼 살 수 있는 목록을 하이라이트 시켜준다.', () => {
  
    //given
   const vendingMachineMoney = 1000;
   //when
   snackListView.displayCanBuyList(vendingMachineMoney)
   const getList =snackListView.getCanBuyList(vendingMachineMoney)
  
   //then
   expect(getList.length ).toBe(getElAll('.red').length)
  });
});


