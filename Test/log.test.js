import { VendingMachineLogView as LogView } from '../View/VendingMachineLogView.js';
import { VendingMachineMainView as MainView } from
'../View/VendingMachineMainView.js';
import { VendingMachineLogPresenter as LogPresenter } from '../Presenter/VendingMachineLogPresenter.js';
import { VendingMachineModel as Model } from '../Model/VendingMachineModel.js';
import { Utility as util} from '../util.js'

const mainView = new MainView(util);
const model = new Model();
const presenter = new LogPresenter(model);
let logView;

/**
 이 파일의 각 테스트가 실행되기 전에 한번만 함수를 실행합니다.
 */
beforeEach(() => {
    logView = new LogView(mainView, util);

    document.body.innerHTML = "";
    const element = document.createElement('div');
    element.classList.add('status-panel');
    document.body.appendChild(element);
});

it ('displayLog 함수가 정상적으로 동작하는지 테스트합니다', () => {
    // given
    let logData = 10000; // 기초 데이터 (테스트 데이터)
    const mode = 'input';
    const expectedResult = "[투입] 10000원이 투입됨";

    // createLogSentence 를 jest.fn() 으로 대체한 이유
    // 1. mainPresenter 에서 getPresenter 가 테스트코드에서는 필요없음
    // 동작되려면 복잡함. HTML 코드단에서 동작하는 (Presenter 에 데이터를 보내고.. 등)
    // 2. 그런 의미에서 displayLog 의 작업 중 createLogSentence 메서드 동작 중
    // 불필요한 작업들이 있음 mainPresenter 의 객체를 받아와서 logPresenter를
    // 받아온다거나 등등
    // 3. 메서드를 의미를 재 정의하고 하는 역할이 무엇인지 분명하게 정의할 필요가
    // 있어보임

    // createLogSentence 를 대체할 (util 에서 2개의 메소드를 호출)
    logData = util.addLogSentenceText(logData, mode);
    logData = util.addLogModeText(logData, mode);

    // 대신 mock의 mockReturnValue 함수를 통해서 결과값을 고정시킨다
    // mock 함수의 존재 이유인 것 같다.
    logView.createLogSenetence = jest.fn().mockReturnValue(logData);

    // when
    logView.displayLog(logData, mode);

    // then
    const element = document.querySelector('.status-panel');
    const receivedData = element.childNodes[0].innerText;
    expect(receivedData).toBe(expectedResult);
});

it('로그 노드(DIV)를 정상적으로 삽입하는지 테스트합니다', () => {
    // given
    const logData = "[투입] 10000원이 투입됨";
    const expectedResult = logData;

    // when
    logView.insertLogDivToLogWindow(logData);

    // then
    const element = document.querySelector('.status-panel');
    const receivedData = element.childNodes[0].innerText;
    expect(receivedData).toBe(expectedResult);
});

it('로그의 DIV 노드를 정상적으로 만드는지 테스트합니다', () => {
    // given
    const logData = "[투입] 10000원이 투입됨";
    const expectedNode = document.createElement('div');
    expectedNode.innerText = logData;
    expectedNode.classList.add('text-left-align');

    // when
    const receivedResult = logView.createLogDivNode(logData);

    // then
    expect(receivedResult).toEqual(expectedNode);
    expect(receivedResult.innerText).toBe(expectedNode.innerText);
});

it('메세지를 특정시간동안 잘 보여주는지 테스트합니다', () => {
    // given
    logView.setNodeVisibility = jest.fn();
    logView.setNodeInnerText = jest.fn();

    // when
    logView.setNodeVisibility.mockReturnValue('visible');
    logView.showAlertMsg('nonExistProduct', 1000);

    // then
    expect(logView.setNodeInnerText).toHaveBeenCalled();
    expect(logView.setNodeVisibility).toHaveReturnedWith('visible');
});

it('노드의 속성들을 정상적으로 설정하는지 테스트합니다', () => {
    // given
    let node = document.createElement('div');

    // when
    logView.setNodeVisibility(node, 'hidden');
    logView.setNodeInnerText(node, 'test');

    console.log(node.style.visibility);

    // then
    expect(node.style.visibility).toBe('hidden');
    expect(node.innerText).toBe('test');
});

it('타이머 이벤트를 테스트합니다', () => {
    // given
    jest.useFakeTimers();
    const node = document.createElement('div');

    // when
    logView.startHideNodeTimer(node, 1000);

    // then
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

it('Model에 정상적으로 LogData가 넘어가는지 테스트합니다', () => {
    // given
    const logData = "[투입] 10000원이 투입됨";

    // when
    presenter.sendLogDataToModel(logData);

    // then
    expect(model.logDataList.length).toBe(1);
});
