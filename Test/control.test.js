import { VendingMachineControlView as ControlView } from '../View/VendingMachineControlView.js';
import { VendingMachineMainView as MainView } from
'../View/VendingMachineMainView.js';
import { VendingMachineModel as Model } from '../Model/VendingMachineModel.js';
import { VendingMachineControlPresenter as ControlPresenter} from '../Presenter/VendingMachineControlPresenter.js'
import { Utility as util} from '../util.js'

jest.mock('../Presenter/VendingMachineControlPresenter.js');

const model = new Model();
const mainView = new MainView(util);
const controlView = new ControlView(mainView, util);
const controlPresenter = new ControlPresenter(util, model, mainView);


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

it("ControlPresenter called constructor", () => {
    expect(ControlPresenter).toHaveBeenCalledTimes(1);
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
    controlView.refreshInvestedMoneyInVendingMachine(10000);

    // then
    const expectedNode = document.querySelector('#money-display');

    // when
    expect(expectedNode.textContent).toBe('10,000원');
});

/* ************** control Presenter ************** */

// 해당 테스트도 어떻게 진행하는지 감이 잘 안온다.
// controlPresenter 을 Auto-mock 형태로 지정하니
// 모든 메서드들이 mock 함수를 가지게 되었다.
// 호출은 되나, 이 호출 횟수로 테스트를 하는것이 의미가 있는것인가?
test("Model 에서 정상적으로 데이터를 가져와서 설정하는지 테스트합니다", () => {
    // given
    model.increaseInvestedMoney(7700);
    const mockControlPresenterInstance = ControlPresenter.mock.instances[0];
    const mockRefreshInvestedMoney = mockControlPresenterInstance.refreshInvestedMoney;
    // console.log(controlPresenter);
    // console.log(model.getInvestedMoney());

    controlPresenter.refreshInvestedMoney();

    console.log(mockRefreshInvestedMoney);
    console.log(mockRefreshInvestedMoney.mock);
    console.log(mockRefreshInvestedMoney.mock.calls);
    console.log(mockRefreshInvestedMoney.mock.calls[0]);
    console.log(mockRefreshInvestedMoney.mock.calls[0][0]);
    // console.log(mockRefreshInvestedMoney.toHaveBeenCalledTimes(1));
    // console.log(mockRefreshInvestedMoney.mock.calls[0][0]);

    // when
    // const expectedNode = document.querySelector('#money-display');
    // controlPresenter.refreshInvestedMoney();
    // console.log(ControlPresenter.mock.instances[0]);
    // console.log(expectedNode.textContent);
    // console.log(controlPresenter.refreshInvestedMoney());
    // console.log(controlPresenter);
    expect(mockRefreshInvestedMoney).toHaveBeenCalledTimes(1);

    // then
    // expect(expectedNode.textContent).toBe('7,700원');
});

// 상품을 구매하는 타이머가 정상적으로 동작하지 않는다
// 아무래도 mock 함수때문인 것 같은데...
// 이것을 어떻게 해결해야 할까
test("상품을 구매하는 타이머가 정상적으로 동작하는지 테스트합니다", () => {
    // given
    jest.useFakeTimers();
    beforeAll(() => {
        controlPresenter.startProductPurchaseTimer.mockImplementation(()=> {
            return {
                timer: setTimeout(() => {
                    throw new Error('Test error');
                }, 1000),
            };
        });
    });

    // when
    // controlPresenter.startProductPurchaseTimer = jest.fn();
    controlPresenter.startProductPurchaseTimer(1000);
    // controlPresenter.startProductPurchaseTimer;
    // console.log(controlPresenter.startProductPurchaseTimer);

    // then
    // expect(setTimeout).not.toHaveBeenCalled();
    // expect(controlPresenter.startProductPurchaseTimer).toHaveBeenCalledTimes(0);
    // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(setTimeout).not.toHaveBeenCalled();
});







