class VendingMachineLogView {
    constructor(view) {
        this.mainView = view;
        this.util = new Utility();
    }

    /**
     * 로그 창에 로그를 표시(출력)합니다
     * @param {string} logData
     * @param {string} mode
     */
    displayLog(logData, mode) {
        const logPresenter = this.mainView.getPresenter().getLogPresenter();
        logData = this.util.addLogSentenceText(logData, mode);
        logData = this.util.addLogModeText(logData, mode);
        logPresenter.sendLogDataToModel(logData);
        this.insertLogDivToLogWindow(logData);
    }

    /**
     * 로그창에 로그노드(DIV)를 삽입합니다
     * @param {string} logData 
     */
    insertLogDivToLogWindow(logData) {
        const logDivNode = this.createLogDivNode(logData);
        const logWindowNode = this.util.getNodeData('#status-panel');
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

}