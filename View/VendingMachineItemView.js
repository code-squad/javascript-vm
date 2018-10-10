class VendingMachineItemView {
    constructor(view, util) {
        this.util = util;
        this.mainView = view;
        this.mainPresenter;
    }

    /**
     * 선택할 수 있는 노드들을 표시합니다
     * @param {number} money
     */
    showSelctableNodes(money) {
        const itemNodeList = this.util.getNodeData('.d-item', 'all');
        let repeatCount = 0;
        this.mainPresenter = this.mainView.getPresenter();
        let itemPresenter = this.mainPresenter.getItemPresenter();

        for (let node of itemNodeList) {
            repeatCount++;
            if(node.classList.contains('high-light')) continue;
            if(itemPresenter.isInvestedMoneyHigherThanItemPrice(node, repeatCount, money)) {
                this.util.setPropertyToItemNode(node, 'high-light');
            }
        }
    }

    /**
     * 선택된 노드들을 전부 해제합니다
     */
    hideSelectableNodes() {
        const itemNodeList = this.util.getNodeData('.d-item', 'all');
        for (let node of itemNodeList) {
            this.util.removeNodeClass(node, 'high-light');
        }
    }

    /**
     * 현재의 가격에 맞춰 노드들을 새로고침 합니다
     */
    refreshSelectableNodes() {
        this.hideSelectableNodes();
        this.showSelctableNodes();
    }

}

export { VendingMachineItemView }