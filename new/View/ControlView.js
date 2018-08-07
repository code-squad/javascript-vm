class VendingMachineControlView {
    constructor() {

        this.util = new Utility();

    }

    /** 
     * 자판기에 투입된 돈을 새로고침합니다 (VIEW)
     */
    refreshInvestedMoneyInVendingMachine(money) {
        const vendingMachineInvestedMoneyDivNode = this.util.getNodeData('#money-display');
        this.changeMoneyNodeTextContent(vendingMachineInvestedMoneyDivNode, money); // this.model.getInvestedMoney()
    }

    /**
     * 돈을 표시하는 노드의 textContent 를 수정합니다
     * @param {DOM NODE} node - 노드 데이터
     * @param {number} money - 금액 데이터
     */
    changeMoneyNodeTextContent(node, money) {
        let moneyWithCommas = this.util.numberWithCommas(money);
        node.textContent = moneyWithCommas + "원";
    }

    /**
     * 로그 창에 로그를 표시(출력)합니다
     * @param {string} logData
     * @param {string} mode
     */
    displayLog(logData, mode) {
        this.insertLogDivToLogWindow(logData, mode);
    }

    /**
     * 로그창에 로그노드(DIV)를 삽입합니다
     * @param {string} logData 
     */
    insertLogDivToLogWindow(logData, mode) {
        const logDivNode = this.createLogDivNode(logData, mode);
        const logWindowNode = this.util.getNodeData('#status-panel');
        logWindowNode.appendChild(logDivNode);
    }

    /**
     * 로그 데이터를 DIV node 로 반환합니다
     * @param {string} logData 
     */
    createLogDivNode(logData, mode) {
        /*
            원래 해당 부분을 insertAdjacentHTML 메서드를 이용해서 노드를 바로 추가했었는데
            classList 를 사용해보기 위하여 createElement 와 innerText 속성을 이용하였습니다

            문자열에 class 를 넣어서 insertAdjacentHTML 을 이용해도 괜찮을 것 같습니다.
            ex. const logDivNodeText = <div class="text-left-align">LOG DATA</div>;
        */ 
        const logDivElement = document.createElement("div");
        logData = this.util.addLogModeText(logData, mode);
        logDivElement.innerText = logData;
        logDivElement.classList.add('text-left-align');
        return logDivElement;
    }
    

    

}