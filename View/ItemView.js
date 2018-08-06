class ItemView {
    /** 
     * Item Panel View
    */
    constructor() {

    }

    /**
     * 상품을 선택하는 버튼에 이벤트를 등록합니다
     */
    registerClickEventToProductClickNumBtn() {
        const productClickNumList = this.viewUtil.getNodeData('.btn-num', 'all');
        const productClickZeroBtn = this.viewUtil.getNodeData('.btn-zero-num');
        const productClickNumArr = this.viewUtil.convertNodeListToArray(productClickNumList);
        productClickNumArr.push(productClickZeroBtn);

        productClickNumArr.forEach(element => {
            element.addEventListener("click", () => {
                this.model.clearTimer(this.model.getProductVerificationTimerID());
                this.model.clearTimer(this.model.getRefundTimerID());
                this.model.updateCurrentSelectedNumTxt(element.innerText);
                this.startProductPurchaseTimer(1000);
            });
        });
    }

    /** 
     * 선택할 수 있는 노드들을 표시합니다
     */
    showSelctableNodes() {
        const itemNodeList = this.viewUtil.getNodeData('.d-item', 'all');
        let repeatCount = 0;
        let itemPrice;

        for (let node of itemNodeList) {
            repeatCount++;
            if (node.classList.contains('high-light')) { continue; }
            if(this.viewUpdate.isInvestedMoneyHigherThanItemPrice(node, repeatCount)) {
                this.viewUpdate.setPropertyToItemNode(node, 'high-light');
            }
        }
    }

    /**
     * 선택된 노드들을 전부 해제합니다
     */
    hideSelectableNodes() {
        const itemNodeList = this.viewUtil.getNodeData('.d-item', 'all');
        for (let node of itemNodeList) {
            this.viewUpdate.removeNodeClass(node, 'high-light');
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