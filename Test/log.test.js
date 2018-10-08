import { VendingMachineLogView as LogView } from '../View/VendingMachineLogView.js';
import { VendingMachineMainView as MainView } from
'../View/VendingMachineMainView.js';
import { VendingMachineLogPresenter as LogPresenter } from '../Presenter/VendingMachineLogPresenter.js';
import { VendingMachineModel as Model } from '../Model/VendingMachineModel.js';
import { Utility as util} from '../util.js'

const mainView = new MainView(util);
const model = new Model();
const presenter = new LogPresenter(model);
const logView = new LogView(mainView, util);

/**
 이 파일의 각 테스트가 실행되기 전에 한번만 함수를 실행합니다.
 */
beforeAll(() => {
    // console.log("beforeAll LOG");
    // console.log(document);
    // console.log(document.innerHTML);
    // console.log(document.body);
    // console.log(document.body.classList);
    console.log("0");
    console.log(document);
    console.log(document.body);
    const htmlData = '<div class="status-panel"></div>';
    document.body.insertAdjacentHTML('beforeend', htmlData);
    console.log("0.1");
    console.log(document.querySelector('div'));
    console.log("run beforeAll method");
    // console.log("beforeAll LOG 2");
    // console.log(document);
    // console.log(document.innerHTML);
    // console.log(document.body);
    // console.log(document.body.innerHTML);
    // console.log(document.body.classList);

    const element = document.createElement('div');
    console.log(JSON.stringify(element, ["id", "className", "tagName"]));
    element.classList.add('status-panel');
    console.log(JSON.stringify(element, ["id", "className", "tagName"]));
    // document.body.insertAdjacentElement('beforeend', element);
    document.body.appendChild(element);

    console.log("0.2");
    console.log(document.querySelector('div'));
    console.log(document.querySelector('.status-panel').classList);
    console.log(document.body);

});

it ('displayLog 함수가 정상적으로 동작하는지 테스트합니다', () => {

    // test
    console.log("1");
    console.log(document.querySelector('#status-panel'));
    console.log("2");
    console.log(document.body.querySelector('#status-panel'));
    console.log("3");
    console.log(document.querySelector('body'));
    console.log("4");
    console.log(document.querySelector('div'));

    // given
    let logData = 10000; // 기초 데이터 (테스트 데이터)
    const mode = 'input';
    const result = "[투입] 10000원이 투입됨";

    // 기존 코드
    // logView.insertLogDivToLogWindow = jest.fn();
    /*
    createLogSentence 를 jest.fn() 으로 대체한 이유
    1. mainPresenter 에서 getPresenter 가 테스트코드에서는 필요없음
    동작되려면 복잡함. HTML 코드단에서 동작하는 (Presenter 에 데이터를 보내고.. 등)
    2. 그런 의미에서 displayLog 의 작업 중 createLogSentence 메서드 동작 중
    불필요한 작업들이 있음 mainPresenter 의 객체를 받아와서 logPresenter를
    받아온다거나 등등
    3. 메서드를 의미를 재 정의하고 하는 역할이 무엇인지 분명하게 정의할 필요가
    있어보임

    */
    logView.createLogSenetence = jest.fn();

    // createLogSentence 를 대체 (util 에서 2개의 메소드를 호출)
    logData = util.addLogSentenceText(logData, mode);
    logData = util.addLogModeText(logData, mode);

    // presenter.sendLogDataToModel = jest.fn();
    // logView.createLogSenetence.mockReturnValue(true);

    // when
    logView.displayLog(logData, mode);
    // logView.displayLog.mockReturnValue(true);

    // then
    // expect(logView.createLogSenetence).toHaveBeenCalled();
    // expect(logView.insertLogDivToLogWindow).toHaveBeenCalled();
    // 181008 debug
    console.log(document.body);
    console.log(document.body.innerHTML);
    console.log(window.document.querySelector('body').innerHTML); //
    // expect(logView.displayLog).toHaveReturnedWith(true);
    // expect(logView.displayLog.name).toEqual("displayLog");
    // expect(document.querySelector('body').innerHTML).toEqual("displayLog");
    expect(logView.createLogSentence).toHaveBeenCalled(true);
});

it('로그 노드(DIV)를 정상적으로 삽입하는지 테스트합니다', () => {
    // given
    const logData = "[투입] 10000원이 투입됨";

    // when
    logView.insertLogDivToLogWindow = jest.fn();
    logView.insertLogDivToLogWindow.mockReturnValue(true);
    logView.insertLogDivToLogWindow(logData);

    // then
    expect(logView.insertLogDivToLogWindow).toHaveReturnedWith(true);
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

    // then
    // expect(node.style.visibility).toBe('hidden');
    expect(logView.setNodeVisibility).toHaveBeenCalled();
    expect(logView.setNodeInnerText).toHaveBeenCalled();
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
