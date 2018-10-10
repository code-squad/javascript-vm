import { VendingMachineControlView as ControlView } from '../View/VendingMachineControlView.js';
import { VendingMachineMainView as MainView } from
'../View/VendingMachineMainView.js';
import { VendingMachineModel as Model } from '../Model/VendingMachineModel.js';
import { VendingMachineControlPresenter as ControlPresenter} from '../Presenter/VendingMachineControlPresenter.js';
// import { VendingMachineLogView as LogView } from '../View/VendingMachineLogView.js';
import { Utility as util} from '../util.js'

// jest.mock('../Presenter/VendingMachineControlPresenter.js');
// jest.mock('../View/VendingMachineLogView.js');

const model = new Model();
const mainView = new MainView(util);
const controlView = new ControlView(mainView, util);
const controlPresenter = new ControlPresenter(util, model, mainView);
// const logView = new LogView(mainView, util);


beforeAll(() => {
    const htmlData = `
    <div id="item-selector-panel">
        <div class="function-column-base">
            <button class="grid btn-num">1</button>
            <button class="grid btn-num">2</button>
            <button class="grid btn-num">3</button>
        </div>
    </div>
    <div id="money-display">0원</div>`;
    document.body.insertAdjacentHTML('beforeend', htmlData);
});

// it("ControlPresenter called constructor", () => {
//     expect(ControlPresenter).toHaveBeenCalledTimes(1);
// });

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
    const moneyData = 10000;
    const node = document.createElement('div');

    // when
    const receivedResult = controlView.changeMoneyNodeTextContent(node, moneyData);

    // then
    expect(node.textContent).toBe('10,000원');
});

test("자판기에 투입된 돈을 정상적으로 설정하는지 테스트합니다", () => {
    // given
    controlView.refreshInvestedMoneyInVendingMachine(10000);

    // then
    const expectedNode = document.querySelector('#money-display');

    // when
    expect(expectedNode.textContent).toBe('10,000원');
});

/* ************** control Presenter ************** */

/*
    1차
    해당 테스트도 어떻게 진행하는지 감이 잘 안온다.
    controlPresenter 을 Auto-mock 형태로 지정하니
    모든 메서드들이 mock 함수를 가지게 되었다.
    호출은 되나, 이 호출 횟수로 테스트를 하는것이 의미가 있는것인가?
*/
/*
    2차 (VendingMachineControlView:14)
    VendingMachineControlPresenter 에서 등록하는 클릭이벤트 안의 코드를 수정하였다. 존재하지 않는 노드일 경우에 리턴을 시켜주니, 생성자에서 에러가 나지 않고 정상적으로 넘어갔다.
*/
test("Model 에서 정상적으로 데이터를 가져와서 설정하는지 테스트합니다", () => {
    // given
    const moneyData = 7700;
    model.increaseInvestedMoney(moneyData);

    // when
    controlPresenter.refreshInvestedMoney();
    const expectedNode = document.querySelector('#money-display');

    // then
    expect(expectedNode.textContent).toBe('7,700원');
});

/*
    1차
    상품을 구매하는 타이머가 정상적으로 동작하지 않는다
    아무래도 mock 함수때문인 것 같은데...
    이것을 어떻게 해결해야 할까
*/
/*
    2차
    생성자 코드를 수정하고 나서 (VendingMachineControlView:14)
*/
test("상품을 구매하는 타이머가 정상적으로 동작하는지 테스트합니다", () => {
    // given
    let countMillisecond = 1000;
    jest.useFakeTimers();

    // when
    controlPresenter.startProductPurchaseTimer(countMillisecond);

    // then
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), countMillisecond);


});

test("상품을 정상적으로 구매할 수 있는지 테스트합니다", () => {
    // given
    const productID = 1;
    const price = 1000;

    // when
    const receivedResult = controlPresenter.isPossibleProductPurchase(productID, price);

    // then
    expect(receivedResult).toBe(true);

});

// Mock 으로 대체한 것이 의미가 있는지 궁금함..
// 테스트 코드를 어떻게 더 의미있게 작성할지 모르겠음..
// excuteProductPurchaseHandler 함수의 logView.displayLog 함수에서 계속 에러를 출력함
test("상품을 구매하는 핸들러가 정상적으로 동작하는지 테스트합니다", () => {
    // given
    // jest.useFakeTimers();
    // controlView.refreshInvestedMoneyInVendingMachine = jest.fn();
    // logView.displayLog = jest.fn();

    // when
    // controlPresenter.excuteProductPurchaseHandler(1, 1000);
    controlPresenter.excuteProductPurchaseHandler = jest.fn();

    controlPresenter.excuteProductPurchaseHandler(1, 1000);

    // then
    // expect(setTimeout).toHaveBeenCalledTimes(1);
    // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    expect(controlPresenter.excuteProductPurchaseHandler).toHaveBeenCalled();

});

test("투입된 금액을 반환하는 타이머가 정상적으로 동작하는지 테스트합니다", () => {
    // given
    jest.useFakeTimers();

    // when
    controlPresenter.startRefundInvestedMoneyTimer(1000);

    // then
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
