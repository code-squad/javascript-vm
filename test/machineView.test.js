import MachineView from '../js/view/machineView.js';
import { Temp } from '../js/view/template.js';
import { basicTemp } from '../test/testTemplate.js';

const machineView = new MachineView(Temp);
const testItems = [{ name: '콜라', price: 500, stock: 5, imageName: 'coke.png' },
{ name: '사이다', price: 1000, stock: 5, imageName: 'cider.png' },
{ name: '파인애플맛 환타', price: 400, stock: 5, imageName: 'fanta_pineapple.png' },
{ name: '포도맛 환타', price: 300, stock: 5, imageName: 'fanta_grape.png' }];

function initialze() {
  document.body.innerHTML = basicTemp;

}

describe('machineView Test', () => {
  beforeEach(() => {
    initialze();
  })
  describe('자판기를 랜더링 한다', () => {
    describe('itemList가 랜더링된다', () => {

      test('해당 번호의 아이템이 올바른 node로 랜더링됐다', () => {
        const expected = `<div data-price="500" data-number="1" class="item_price">1. 500</div>`;

        machineView.renderMachine(testItems);
        const number1Node = document.querySelector('.item_list_container');

        expect(number1Node.innerHTML).toContain(expected);
        number1Node.dataset.price === 500
      });
    });

    describe('사용자가 금액을 투입한다', () => {

      test('투입한 금액이 로그뷰에 랜더링된다', () => {
        const INSERTED_MONEY = 700;
        const expected = '<span>700원이 투입됐습니다</span>';

        machineView.renderInsertLog(INSERTED_MONEY);
        const logListNode = document.querySelector('.log_list');

        expect(logListNode.innerHTML).toContain(expected);
      });

      test('투입한 금액으로 살 수 있는 상품이 하이라이트된다', () => {
        const TOTAL_INSERTED_MONEY = 700;
        machineView.renderMachine(testItems);
        const expected = 3; // 700원 아래의 Item 3개

        machineView.renderAvailableItem(TOTAL_INSERTED_MONEY);

        expect(document.querySelectorAll('.available_item').length).toBe(expected);
      });


    });
    describe('투입한 금액으로 상품을 구매할 수 있다', () => {
      beforeEach(() => {
        initialze();
      });

      test('선택한 아이템에 대한 로그를 랜더링한다', () => {
        const ITEM_NUMBER = 1;
        const expected = '<span>1번 콜라가 선택됨</span>';
        machineView.renderMachine(testItems);

        machineView.renderSelectedItemLog(ITEM_NUMBER);

        expect(document.querySelector('.log_list').innerHTML).toContain(expected);
      });
      test('선택한 아이템의 이미지를 랜더링한다', () => {
        const ITEM_NUMBER = 1;
        const expected = '<img class="item_image" alt="No Image" src="js/model/images/coke.png">';
        machineView.renderMachine(testItems);

        machineView.renderSelectedItemImage(testItems, ITEM_NUMBER);

        expect(document.querySelector('.image_list').innerHTML).toContain(expected);
      })
    });
  });

})