import { VendingMachineControlView as ControlView } from '../View/VendingMachineControlView.js';
import { VendingMachineMainView as MainView } from
'../View/VendingMachineMainView.js';
import { VendingMachineModel as Model } from '../Model/VendingMachineModel.js';
import { Utility as util} from '../util.js'

const mainView = new MainView(util);
const controlView = new ControlView(mainView, util);

beforeAll(() => {
    const htmlData = `<div id="item-selector-panel">
        <div class="function-column-base">
            <button class="grid btn-num">1</button>
            <button class="grid btn-num">2</button>
            <button class="grid btn-num">3</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', htmlData);
});

// 이런 이벤트들을 어떤 부분을 테스트 해야하는지 잘 감이 안온다.
test("상품을 선택하는 버튼에 이벤트가 등록되는지 테스트한다", () => {
    // const clickEvent = new Event('click');
    // document.querySelector('#item-selector-panel').dispatchEvent(clickEvent);

    controlView.registerClickEventToProductClickNumBtn = jest.fn();

    controlView.registerClickEventToProductClickNumBtn();

    expect(controlView.registerClickEventToProductClickNumBtn).toHaveReturned();
    expect(controlView.registerClickEventToProductClickNumBtn.mock.calls.length).toBe(1);

});

test("상품을 클릭하는 버튼의 배열을 정상적으로 생성하는지 테스트한다", () => {
    // given
    const htmlData = `<button class="grid btn-zero-num">0</button>`;
    document.body.insertAdjacentHTML('beforeend', htmlData);

    // when
    const expectedResult = controlView.createProductNumNodeArr();

    // then
    expect(expectedResult.length).toBe(4);
});

test("노드의 textContent가 정상적으로 수정되는지 테스트합니다", () => {
    // given
    const node = document.createElement('div');

    // when
    const receivedResult = controlView.changeMoneyNodeTextContent(node, 10000);

    // then
    expect(node.textContent).toBe('10,000원');
});

test("자판기에 투입된 돈을 정상적으로 설정하는지 테스트합니다", () => {
    // given
    const htmlData = `<div id="money-display">0원</div>`;
    document.body.insertAdjacentHTML('beforeend', htmlData);

    // then
    controlView.refreshInvestedMoneyInVendingMachine(10000);
    const expectedNode = document.querySelector('#money-display');

    // when
    expect(expectedNode.textContent).toBe('10,000원');
});







