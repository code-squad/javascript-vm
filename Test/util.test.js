import { Utility as util } from '../util.js';

test('숫자 3자리 마다 콤마를 찍습니다', () => {
    // given
    const num;

    // when
    num = 440000;

    // then
    expect(util.numberWithCommas(num)).toBe('440,000');
});

// test('querySelector 함수가 정상적으로 동작하는지 확인합니다', () => {
//     const node = document.createElement('div');
//     const content = document.createTextNode('TEST DIV');
//     node.appendChild(content);
//
//     expect(util.getNodeData('#panel')).toBe(null);
// })

test('숫자만 출력하는 정규식을 테스트합니다', () => {
    // given - when
    const testData = 'abcde12345';

    // then
    expect(util.sortOutNumber(testData)).toBe(12345);
});

test('로그를 문장형식으로 만드는지 테스트합니다', () => {
    // given - when
    const testData = 100;
    const inputModeResult = "100원이 투입됨";
    const selectModeResult = "100번이 선택됨";
    const refundModeResult = "100원이 반환됨";

    //then
    expect(util.addLogSentenceText(testData, 'input')).toBe(inputModeResult);
    expect(util.addLogSentenceText(testData, 'select')).toBe(selectModeResult);
    expect(util.addLogSentenceText(testData, 'refund')).toBe(refundModeResult);
});

test('모드 문자가 정상적으로 추가되는지 테스트합니다', () => {
    // given - when
    const testData = '테스트';
    const inputModeResult = "[투입] 테스트";
    const selectModeResult = "[선택] 테스트";
    const refundModeResult = "[반환] 테스트";

    // then
    expect(util.addLogModeText(testData, 'input')).toBe(inputModeResult);
    expect(util.addLogModeText(testData, 'select')).toBe(selectModeResult);
    expect(util.addLogModeText(testData, 'refund')).toBe(refundModeResult);
});

// test("노드에 클래스 속성을 설정하는지 테스트합니다", () => {
//
//     const node = document.createElement('div');
//     const content = document.createTextNode('TEST DIV');
//     node.appendChild(content);
//
//     expect(util.setPropertyToItemNode(node, 'high-light')).toBe();
//
//     console.log(node);
// });

// test('nodeList 를 arrayList 로 잘 반환하는지 테스트합니다', () => {
//
// });

















