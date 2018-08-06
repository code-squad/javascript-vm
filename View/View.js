class VendingMachineView {
    constructor() {

    }

    /**
     * 로그 창에 로그를 표시(출력)합니다
     * @param {string} logData
     * @param {string} mode
     */
    displayLog(logData, mode) {
        logData = this.viewUtil.addLogSentenceText(logData, mode);
        this.model.insertLogData(logData);
        this.viewUpdate.insertLogDivToLogWindow(logData, mode);
    }

}