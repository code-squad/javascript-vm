class VendingMachineItemView {
    constructor() {

        this.presenter;
        this.util = new Utility();



    }

    setPresenter(presenter) {
        this.presenter = presenter;
    }

    /** 
     * 선택할 수 있는 노드들을 표시합니다
     */
    showSelctableNodes(money) {
        const itemNodeList = this.util.getNodeData('.d-item', 'all');
        let repeatCount = 0;
        let itemPrice;

        for (let node of itemNodeList) {
            repeatCount++;
            if (node.classList.contains('high-light')) { continue; }
            if(this.isInvestedMoneyHigherThanItemPrice(node, repeatCount, money)) {
                this.viewUpdate.setPropertyToItemNode(node, 'high-light');
            }
        }
    }
    
}