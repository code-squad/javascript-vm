import { VendingMachineControlView as controlView } from '../View/VendingMachineControlView.js';
jest.mock('../View/VendingMachineControlView.js');

beforeAll(() => {
    const htmlData = `<button class="grid btn-num">1</button>`;

});

test("상품을 선택하는 버튼에 이벤트가 등록되는지 테스트한다", () => {
    console.log(controlView);
    console.log(document.body);
    // given
    // controlView.registerClickEventToProductClickNumBtn();
    const clickEvent = new Event('click');
    const node = document.createElement('button');
    node.classList.add('grid btn-num');
    node.insertAdjacentHTML('beforeend', "")


    // when

    // then
});
