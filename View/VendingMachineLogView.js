class VendingMachineLogView {
    constructor(view, util) {
        this.mainView = view;
        this.mainPresenter;
        this.util = util;
    }

    /**
     * 로그 창에 로그를 표시(출력)합니다
     * @param {string} logData
     * @param {string} mode
     */
    displayLog(logData, mode) {
        logData = this.createLogSenetence(logData, mode);
        this.insertLogDivToLogWindow(logData);
    }

    /**
     * 로그를 위한 문장을 완성합니다
     * @param {string} logData - 비정형 데이터
     * @param {string} mode - 로그 모드 (투입, 선택, 반환)
     * @return {string} logData - 정형 데이터(문장)
     */
    createLogSenetence(logData, mode) {
        this.mainPresenter = this.mainView.getPresenter();
        const logPresenter = this.mainPresenter.getLogPresenter();
        logData = this.util.addLogSentenceText(logData, mode);
        logData = this.util.addLogModeText(logData, mode);
        logPresenter.sendLogDataToModel(logData);

        return logData;
    }

    /**
     * 로그창에 로그노드(DIV)를 삽입합니다
     * @param {string} logData
     */
    insertLogDivToLogWindow(logData) {
        const logDivNode = this.createLogDivNode(logData);
        const logWindowNode = this.util.getNodeData('.status-panel');
        logWindowNode.appendChild(logDivNode);
    }

    /**
     * 로그 데이터를 DIV node 로 반환합니다
     * @param {string} logData
     */
    createLogDivNode(logData) {
        /*
            원래 해당 부분을 insertAdjacentHTML 메서드를 이용해서 노드를 바로 추가했었는데
            classList 를 사용해보기 위하여 createElement 와 innerText 속성을 이용하였습니다

            문자열에 class 를 넣어서 insertAdjacentHTML 을 이용해도 괜찮을 것 같습니다.
            ex. const logDivNodeText = <div class="text-left-align">LOG DATA</div>;
        */
        const logDivElement = document.createElement("div");
        logDivElement.innerText = logData;
        logDivElement.classList.add('text-left-align');
        return logDivElement;
    }

    /**
     * 메세지를 시간동안 보여줍니다
     * @param {string} type - 메세지 타입에 따라 완성된 문자열을 받아옵니다
     * @param {string} time - 표시할 시간을 설정합니다
     */
    showAlertMsg(type, time) {
        const alertDivNode = this.util.getNodeData('.alert');
        const errorMsg = this.util.getErrorMsg(type);
        this.setNodeVisibility(alertDivNode, 'visible');
        this.setNodeInnerText(alertDivNode, errorMsg);
        this.setNodeVisibility(alertDivNode, 'show');
        this.startHideNodeTimer(alertDivNode, time);
    }

    /**
     * 노드의 Visibility 속성을 설정합니다
     * @param {DOM node} node
     * @param {string} mode
     */
    setNodeVisibility(node, mode) {
        node.style.visibility = (mode === 'hidden') ? 'hidden' : 'visible'
    }

    /**
     * 노드의 innerText 를 설정합니다
     * @param {DOM node} node
     * @param {string} text
     */
    setNodeInnerText(node, text) {
        node.innerText = text;
    }

    /**
     * 노드를 안보이게 하는 타이머를 시작합니다
     * @param {number} time
     */
    startHideNodeTimer(node, time) {
        setTimeout(() => {
            this.setNodeVisibility(node, 'hidden');
        }, time);
    }

}

export { VendingMachineLogView }
