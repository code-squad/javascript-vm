import { Utility as util } from '../util.js';

beforeAll(() => {
    const htmlData = '<div class="a">TEST DATA</a>';
    document.body.insertAdjacentHTML('beforeend', htmlData);
});

test('숫자 3자리 마다 콤마를 찍습니다', () => {
    // given
    let num = 440000;

    // when
    const result = util.numberWithCommas(num);

    // then
    expect(result).toBe('440,000');
});

test('querySelector 함수가 정상적으로 동작하는지 확인합니다', () => {
    // given

    // when
    const node = util.getNodeData('.a');

    // then
    expect(node.textContent).toBe("TEST DATA");

});

test('숫자만 출력하는 정규식을 테스트합니다', () => {
    // given
    const testData = 'abcde12345';

    // when
    const result = util.sortOutNumber(testData);

    // then
    expect(result).toBe(12345);
});

test('로그를 문장형식으로 만드는지 테스트합니다', () => {
    // given
    const testData = 100;

    // when
    const inputModeResult = util.addLogSentenceText(testData, 'input');
    const selectModeResult = util.addLogSentenceText(testData, 'select');
    const refundModeResult = util.addLogSentenceText(testData, 'refund');

    // then
    expect(inputModeResult).toBe("100원이 투입됨");
    expect(selectModeResult).toBe("100번이 선택됨");
    expect(refundModeResult).toBe("100원이 반환됨");
});

test('모드 문자가 정상적으로 추가되는지 테스트합니다', () => {
    // given
    const testData = '테스트';
    const inputModeResult = util.addLogModeText(testData, 'input');
    const selectModeResult = util.addLogModeText(testData, 'select');
    const refundModeResult = util.addLogModeText(testData, 'refund');

    // when - then
    expect(inputModeResult).toBe("[투입] 테스트");
    expect(selectModeResult).toBe("[선택] 테스트");
    expect(refundModeResult).toBe("[반환] 테스트");
});

test("노드에 클래스 속성을 설정하는지 테스트합니다", () => {
    // given
    const node = document.createElement('div');
    const content = document.createTextNode('TEST DIV');

    // when
    node.appendChild(content);
    util.setPropertyToItemNode(node, 'high-light');

    // then
    expect(node.classList.contains('high-light')).toBe(true);
});

test("NodeList 를 array 로 반환하는지 테스트합니다", () => {
    // given
    const singleNode = (function () {
        // make an empty node list to inherit from
        const nodelist = document.createDocumentFragment().childNodes;
        // return a function to create object formed as desired
        return function (node) {
            return Object.create(nodelist, {
                '0': {value: node, enumerable: true},
                'length': {value: 1},
                'item': {
                    "value": function (i) {
                        return this[+i || 0];
                    },
                    enumerable: true
                }
            }); // return an object pretending to be a NodeList
        };
    }());

    const divNode = document.createElement('div');
    const nodeList = singleNode(divNode); // for example
    const expectedResult = [];

    // when
    const receivedData = util.convertNodeListToArray(nodeList);
    expectedResult.push(divNode);

    // then
    expect(receivedData).toEqual(expectedResult);
});

test("상품 선택이 올바른지 테스트합니다", () => {
    // given
    const start = 1;
    const end = 32;
    const selectiveNum = 5; // 선택된 번호(dummy data)

    // when
    const receivedData = util.isCorrectSelectedProductNum(selectiveNum, start, end);

    // then
    expect(receivedData).toBe(true);
});

test("상품을 구매할 수 있는 상품인지 테스트합니다", () => {
    // given
    const price = 2000;
    const investedMoney = 10000;

    // when
    const receivedData = util.isPossiblePurchase(price, investedMoney);

    // then
    expect(receivedData).toBe(true);
});

test("node의 클래스 속성을 정상적으로 제거하는지 테스트합니다", () => {
    // given
    const node = document.createElement('div');
    const content = document.createTextNode('TEST DIV');
    node.appendChild(content);
    util.setPropertyToItemNode(node, 'high-light');

    // when
    util.removeNodeClass(node, 'high-light');

    // then
    expect(node.classList.contains('high-light')).toBe(false);
});

test("에러메세지를 정상적으로 반환하는지 테스트합니다", () => {
    // given
    const expectedWalletTestResult = "지갑의 돈이 부족합니다 :(";
    const expectedMoneyTestResult = "금액이 부족합니다 :(";
    const expectedProductTestResult = "상품이 존재하지 않습니다 :(";

    // when
    const walletMode = 'walletMoneyShortage';
    const moneyMode = 'investedMoneyShortage';
    const productMode = 'nonExistProduct';

    // then
    expect(util.getErrorMsg(walletMode)).toBe(expectedWalletTestResult);
    expect(util.getErrorMsg(moneyMode)).toBe(expectedMoneyTestResult);
    expect(util.getErrorMsg(productMode)).toBe(expectedProductTestResult);
});

test("데이터가 0일 경우를 테스트합니다", () => {
    // given
    const data = 0;

    // when
    const expectedResult = util.isMoneyZero(data);

    // then
    expect(expectedResult).toBe(true);
});