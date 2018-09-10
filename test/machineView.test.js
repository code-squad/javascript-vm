import MachineView from '../js/view/machineView.js';
import { Temp } from '../js/view/template.js';

const machineView = new MachineView(Temp);
const domTemplate = `<div class="vending_machine_wrap">
<div class="item_display">
  <ul class="item_list_container"></ul>
</div>
<div class="payment_display">
  <div class="current_coin_display">
    <div class="current_coin">0원</div>
  </div>
  <div class="coin_button_container">
    <ul class="coin_button_list_container">
      <li class="coin_button_item">
        <div data-select="1" class="coin_button">1</div>
      </li>
      <li class="coin_button_item">
        <div data-select="2" class="coin_button">2</div>
      </li>
      <li class="coin_button_item">
        <div data-select="3" class="coin_button">3</div>
      </li>
      <li class="coin_button_item">
        <div data-select="4" class="coin_button">4</div>
      </li>
    </ul>
  </div>
  <div class="progress_display">
    <div class="progress_container">
      <ul class="log_list">
      </ul>
    </div>
    <div class="receive_container">
      <ul class="image_list">
      </ul>
    </div>
  </div>
</div>
</div>`;
function initialze() {
  document.body.innerHTML = domTemplate;

}

describe('machineView Test', () => {
  beforeEach(() => {
    initialze();
  })
  describe('자판기를 랜더링 한다', () => {
    describe('itemList가 랜더링된다', () => {
      const itemList = [{ name: '콜라', price: 500, stock: 5, imageName: 'coke.png' },
      { name: '사이다', price: 1000, stock: 5, imageName: 'cider.png' },
      { name: '파인애플맛 환타', price: 400, stock: 5, imageName: 'fanta_pineapple.png' },
      { name: '포도맛 환타', price: 300, stock: 5, imageName: 'fanta_grape.png' }];

      test('해당 번호의 아이템이 올바른 node로 랜더링됐다', () => {
        const expected = `<div data-price="500" data-number="1" class="item_price">1. 500</div>`;

        machineView.renderMachine(itemList);
        const number1Node = document.querySelector('.item_list_container');
        expect(number1Node.innerHTML).toContain(expected);
      });
    });

    describe('사용자가 금액을 투입하고 상품을 구매할 수 있다', () => {


      test('투입한 금액이 로그뷰에 랜더링된다', () => {
        const INSERTED_MONEY = 700;
        const expected = '<span>700원이 투입됐습니다</span>';

        machineView.renderInsertLog(INSERTED_MONEY);
        const logListNode = document.querySelector('.log_list');

        expect(logListNode.innerHTML).toContain(expected);
      });

      test('투입한 금액으로 살 수 있는 상품이 하이라이트된다', () => {

      })
    });
  });

})