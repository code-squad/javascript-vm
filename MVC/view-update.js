/** 
 * MV 구조에서 VIEW 에 해당하며, 갱신 및 조작을 담당합니다
*/
class VendingMachineViewUpdate {
    constructor(model, util) {
        this.model = model;
        this.viewUtil = util;
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
    createLogDivNode(logData, mode) {
        /*
            원래 해당 부분을 insertAdjacentHTML 메서드를 이용해서 노드를 바로 추가했었는데
            classList 를 사용해보기 위하여 createElement 와 innerText 속성을 이용하였습니다

            문자열에 class 를 넣어서 insertAdjacentHTML 을 이용해도 괜찮을 것 같습니다.
            ex. const logDivNodeText = <div class="text-left-align">LOG DATA</div>;
        */ 
        const logDivElement = document.createElement("div");
        logData = this.viewUtil.addLogModeText(logData, mode);
        logDivElement.innerText = logData;
        logDivElement.classList.add('text-left-align');
        return logDivElement;
    }

    /**
     * classList 를 사용해 node의 클래스 속성을 제거합니다
     * @param {node} node 
     * @param {string} className
     */
    removeNodeClass(node, className) {
        node.classList.remove(className);
    }

    /**
     * 로그창에 로그노드(DIV)를 삽입합니다
     * @param {string} logData 
     */
    insertLogDivToLogWindow(logData, mode) {
        const logDivNode = this.createLogDivNode(logData, mode);
        const logWindowNode = this.viewUtil.getNodeData('#status-panel');
        logWindowNode.appendChild(logDivNode);
    }

    /**
     * 노드에 속성을(클래스) 설정합니다
     * @param {node} node
     * @param {string} property - 노드에 적용할 Class명
     */
    setPropertyToItemNode(node, property) {
        node.classList.add(property);
    }

    /**
     * 투입된 금액이 아이템 가격보다 높은지 확인합니다
     * @param {node} node 
     * @param {number} index
     * @returns true - 투입된 금액 > 아이템 가격 
     */
    isInvestedMoneyHigherThanItemPrice(node, index) {
        let itemPrice;
        const priceRegex = /.*\n+\d+.\s/;
        const investedMoney = this.model.getInvestedMoney();
        
        itemPrice = this.model.getItemPrice[index];
        if (itemPrice === undefined) {
            itemPrice = Number(node.innerText.replace(priceRegex, ''));
            this.model.addItemPrice(index, itemPrice);
        } else {
            itemPrice = this.model.getItemPrice(index);
        }

        return (investedMoney >= itemPrice) ? true : false;
    }

}