class VendingMachineItemView {
    constructor(view) {
        this.util = new Utility();
        this.mainView = view;


    }

    /** 
     * 선택할 수 있는 노드들을 표시합니다
     */
    showSelctableNodes(money) {
        const itemNodeList = this.util.getNodeData('.d-item', 'all');
        let repeatCount = 0;
        let itemPrice;
        let itemPresenter = this.mainView.getPresenter().getItemPresenter();

        for (let node of itemNodeList) {
            repeatCount++;
            if (node.classList.contains('high-light')) { continue; }
            if(itemPresenter.isInvestedMoneyHigherThanItemPrice(node, repeatCount, money)) {
                this.util.setPropertyToItemNode(node, 'high-light');
            }
        }
    }





    
}