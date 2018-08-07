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






    

    

}