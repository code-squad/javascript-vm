import VmModel from '../js/VmModel.js';
const walletData = {
  10000: 1,
  5000: 2,
  1000: 5,
  500: 8,
  100: 10
}
let vmModel = new VmModel(walletData);
beforeEach(() => {
  vmModel = new VmModel(walletData);
})
describe('모델 객체의 데이터를 가져오는 TEST', () => {
  test('지갑에 총 금액이 3만원이 있다.', () => {
    expect(30000).toBe(vmModel.getYourMoney())
  })
  test('현재 자판기에 넣은 돈이 0원이다', () => {
    expect(0).toBe(vmModel.getInputMoney())
  })
  test('동전의 갯수가 100원 10개 500원 8개 1000원 5개 5000원 2개 만원 1개이다.', () => {
    expect({ '100': 10, '500': 8, '1000': 5, '5000': 2, '10000': 1 }).toEqual(vmModel.getCoinCount())
  })
})

describe('모델 객체의 데이터를 변경시키는 메소드 TEST', () => {
  test('100원을 넣었을 때 데이터 변화를 확인한다.', () => {
    vmModel.insertCoin(100)
    expect({
      inputMoney: 100,
      yourMoney: 29900,
      coinCount: { '100': 9, '500': 8, '1000': 5, '5000': 2, '10000': 1 }
    }).toEqual(vmModel.getMoneyData())
  })
  test('500원을 넣었을 때 데이터 변화를 확인한다.', () => {
    vmModel.insertCoin(500)
    expect({
      inputMoney: 500,
      yourMoney: 29500,
      coinCount: { '100': 10, '500': 7, '1000': 5, '5000': 2, '10000': 1 }
    }).toEqual(vmModel.getMoneyData())
  })
  test("500원짜리 메뉴를 골랐을 때의 데이터변화를 확인한다.", () => {
    vmModel.insertCoin(1000);
    vmModel.selectItem(500);
    expect({
      inputMoney: 500,
      yourMoney: 29000,
      coinCount: { '100': 10, '500': 8, '1000': 4, '5000': 2, '10000': 1 }
    }).toEqual(vmModel.getMoneyData())
  })
  test("1000원을 반환했을 때 데이터변화를 확인한다.", () => {
    vmModel.insertCoin(1000);
    vmModel.returnMoney();
    expect({
      inputMoney: 0,
      yourMoney: 30000,
      coinCount: { '100': 10, '500': 8, '1000': 5, '5000': 2, '10000': 1 }
    }).toEqual(vmModel.getMoneyData())
  })
})