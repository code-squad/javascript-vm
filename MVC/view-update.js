/** 
 * MV 구조에서 VIEW 에 해당하며, 갱신 및 조작을 담당합니다
*/
class VendingMachineViewUpdate {
    constructor(model, util) {
        this.model = model;
        this.viewUtil = util;
        
        console.log("Success Load view-update");
    }

    /** 
     * 내 지갑의 돈을 새로고침합니다 (VIEW)
    */
    refreshWalletMoney() {
       const walletMoneyDivNode = this.viewUtil.getNodeData('#money-amount-window');
       this.changeMoneyNodeTextContent(walletMoneyDivNode, this.model.getWalletMoney());
    }

    /** 
     * 자판기에 투입된 돈을 새로고침합니다 (VIEW)
    */
    refreshInvestedMoneyInVendingMachine() {
        const vendingMachineInvestedMoneyDivNode = this.viewUtil.getNodeData('#money-display');
        this.changeMoneyNodeTextContent(vendingMachineInvestedMoneyDivNode, this.model.getInvestedMoney());
    }

    /**
     * 돈을 표시하는 노드의 textContent 를 수정합니다
     * @param {DOM NODE} node - 노드 데이터
     * @param {number} money - 금액 데이터
     */
    changeMoneyNodeTextContent(node, money) {
        let moneyWithCommas = this.viewUtil.numberWithCommas(money);
        node.textContent = money + "원";
    }

    /**
     * 로그 데이터를 DIV node 로 반환합니다
     * @param {string} logData 
     */
    createLogDiv(logData) {
        return "<div>" + logData + "</div>";
    }

    insertLogDivToLogWindow(logData) {
        const logDivFormat = this.createLogDiv(logData);
        const logWindowNode = this.viewUtil.getNodeData('#status-panel');
        logWindowNode.insertAdjacentHTML("beforeend", logDivFormat);
        debugger;
    }

}