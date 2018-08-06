class VendingMachineRefreshView {
    constructor() {

    }

    /** 
     * 내 지갑의 돈을 새로고침합니다 (VIEW)
     * @param {money} money
    */
    refreshWalletMoney(money) {
        const walletMoneyDivNode = this.viewUtil.getNodeData('#money-amount-window');
        this.changeMoneyNodeTextContent(walletMoneyDivNode, money); // this.model.getWalletMoney()
    }

    /**
     * 돈을 표시하는 노드의 textContent 를 수정합니다
     * @param {DOM NODE} node - 노드 데이터
     * @param {number} money - 금액 데이터
     */
    changeMoneyNodeTextContent(node, money) {
        let moneyWithCommas = this.viewUtil.numberWithCommas(money);
        node.textContent = moneyWithCommas + "원";
    }

}