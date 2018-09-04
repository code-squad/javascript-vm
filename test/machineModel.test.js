import MachineModel from '../js/model/machineModel.js';
import { Temp } from '../js/view/template.js';

describe('MachineModel Test', () => {
  const itemList =
    [{ name: '콜라', price: 500, stock: 5, imageName: 'coke.png' },
    { name: '사이다', price: 1000, stock: 5, imageName: 'cider.png' },
    { name: '파인애플맛 환타', price: 400, stock: 5, imageName: 'fanta_pineapple.png' },
    { name: '포도맛 환타', price: 300, stock: 5, imageName: 'fanta_grape.png' },
    { name: '레몬에이드', price: 900, stock: 5, imageName: 'lemonade.png' },
    { name: '봉봉', price: 1200, stock: 5, imageName: 'bongbong.png' },
    { name: '코코아주스', price: 1000, stock: 5, imageName: 'chocoMilk.png' },
    { name: '콜라제로', price: 1000, stock: 5, imageName: 'coke.png' }];
  const dList = Temp.itemListTemp(itemList);
  document.body.innerHTML = dList;

  describe('MachineModel을 초기화한다', () => {
    const machineModel = new MachineModel(itemList);
    test('초기화된 ItemList를 가져온다', () => {
      const expected = itemList;
      expect(machineModel.getItemList()).toEqual(expected);
    });

    test('초기화된 상태이기에 투입금액은 0원을 반환한다', () => {
      const expected = 0;
      expect(machineModel.getTotalInsertedMoney()).toBe(expected);
    })
  })

  describe('사용자가 1000원을 투입한다', () => {
    const machineModel = new MachineModel(itemList);
    machineModel.notifyReceiveMoney = jest.fn();

    machineModel.receiveMoney(1000);

    test('1000원을 투입받아서 투입금액이 1,000원이 되었다', () => {
      const expected = 1000;
      expect(machineModel.getTotalInsertedMoney()).toBe(expected);
    });
  });

  describe('1000원을 투입하고 레몬에이드 번호 5번을 눌러 구입한다', () => {
    const machineModel = new MachineModel(itemList);
    const ITEM_NUMBER = 5;
    const insertedMoney = 1000;
    machineModel.notifyReceiveMoney = jest.fn();

    machineModel.receiveMoney(insertedMoney);

    describe('아이템을 제공하는 핸들러가 실행된다', () => {
      const originalStock = itemList[ITEM_NUMBER - 1].stock;

      machineModel.provideItemHandler(ITEM_NUMBER);

      test('레모네이드를 클릭하여 재고의 차이가 1개 난다', () => {
        const expected = originalStock - 1;
        expect(machineModel.getItemList()[ITEM_NUMBER - 1].stock).toBe(expected);
      });

      test('사용자 투입금액 중 레모네이드의 값 900원이 사용되어 투입금액이 100원 남는다', () => {
        const expected = insertedMoney - itemList[ITEM_NUMBER - 1].price;
        expect(machineModel.getTotalInsertedMoney()).toBe(expected);
      });
    });
  });

  describe('투입금액 2100원을 반환한다', () => {
    const machineModel = new MachineModel(itemList);
    machineModel.notifyReceiveMoney = jest.fn();
    const insertedMoney = 2100;
    machineModel.receiveMoney(insertedMoney);

    const change = machineModel.returnChange();

    test('투입금액인 2,100원을 리턴한다', () => {
      const expected = insertedMoney;
      expect(change).toBe(expected);
    });

    test('돈이 모두 반환됐기에 투입금액은 0원이 된다', () => {
      const expected = 0;
      expect(machineModel.getTotalInsertedMoney()).toBe(expected);
    });
  });

  describe('투입금액 800원으로 음료수를 선택할 수 있다', () => {
    const machineModel = new MachineModel(itemList);
    machineModel.notifyReceiveMoney = jest.fn();
    const insertedMoney = 800;
    machineModel.receiveMoney(insertedMoney);

    test('500원인 음료수 1번을 선택하면 투입금액으로 살 수 있기에 true를 리턴한다', () => {
      const ITEM_NUMBER = 1;
      const expected = true;

      const returnValue = machineModel.isEnoughMoney(ITEM_NUMBER);

      expect(returnValue).toBe(expected);
    });

    test('1,000원인 음료수 2번을 선택하면 금액 부족으로 false를 리턴한다', () => {
      const ITEM_NUMBER = 2;
      const expected = false;

      const returnValue = machineModel.isEnoughMoney(ITEM_NUMBER);

      expect(returnValue).toBe(expected);
    });
  });
});