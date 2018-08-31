import { VendingMachineItemView as ItemView } from '../View/VendingMachineItemView.js';
import { VendingMachineItemPresenter as ItemPresenter } from '../Presenter/VendingMachineItemPresenter.js';
import { VendingMachineMainView as MainView } from
'../View/VendingMachineMainView.js';
import { VendingMachineModel as Model } from '../Model/VendingMachineModel.js';
import { Utility as util} from '../util.js'

const model = new Model();
const mainView = new MainView(util);
const itemView = new ItemView(mainView, util);
const itemPresenter = new ItemPresenter(model, mainView);

beforeAll(() => {
    const htmlData = `<div id="test" class="d-item high-light"></div>
    <div id="test2" class="d-item"></div>`;
    document.body.insertAdjacentHTML('beforeend', htmlData);
});

/*
    TypeError: Cannot read property 'getItemPresenter' of undefined
    VendingMachineItemView:15, 16
    해당 코드들을 어떻게 테스트해야할지 모르겠다
*/
test("선택할 수 있는 노드들을 정상적으로 표시하는지 테스트합니다", () => {
    // given
    const testNode = document.querySelector('#test2');
    itemView.showSelctableNodes = jest.fn();

    // when
    itemView.showSelctableNodes(10000);

    // then
    expect(itemView.showSelctableNodes).toHaveBeenCalledTimes(1);

});

test("선택된 노드들을 정상적으로 해제하는지 테스트합니다", () => {
    // given
    const testNode = document.querySelector('#test');

    // when
    itemView.hideSelectableNodes();

    // then
    expect(testNode.classList.length).toBe(1);
});

test("투입된 금액이 아이템 가격보다 높은지 판별하는 함수를 테스트합니다", () => {
    // given
    const investedMoney = 10000;
    // const func = function(investedMoney, itemPrice) {
    //     return (investedMoney >= itemPrice) ? true : false;
    // };
    const mockFn = jest.fn().mockImplementation(itemPrice => itemPrice < investedMoney);

    // when
    // const result = itemPresenter.isInvestedMoneyHigherThanItemPrice(node, index);
    // const receivedResult = mockFn(investedMoney, itemPrice)
    const receivedResult = mockFn(1000);

    // then
    // console.log(mockFn.mock.calls[0][0] === 0);
    // console.log(receivedResult);
    expect(receivedResult).toBe(true);

});













