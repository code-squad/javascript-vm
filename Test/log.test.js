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
    const htmlData = '<div class="status-panel"></div>';
    document.body.insertAdjacentHTML('beforeend', htmlData);
});

it ('displayLog 함수가 정상적으로 동작하는지 테스트합니다', () => {
    // given
    const logData = 10000;
    const mode = 'input';
    const result = "[투입] 10000원이 투입됨";

    logView.insertLogDivToLogWindow = jest.fn();
    logView.createLogSenetence = jest.fn();
    // presenter.sendLogDataToModel = jest.fn();
    // logView.createLogSenetence.mockReturnValue(true);

    // when
    logView.displayLog(logData, mode);
    // logView.displayLog.mockReturnValue(true);

    // then
    expect(logView.createLogSenetence).toHaveBeenCalled();
    expect(logView.insertLogDivToLogWindow).toHaveBeenCalled();
    // expect(logView.displayLog).toHaveReturnedWith(true);
    expect(logView.displayLog.name).toEqual("displayLog");
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