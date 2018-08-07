class VendingMachineControlView {
    constructor(view) {
        this.mainView = view;
        this.util = new Utility();
    }

    /**
     * 상품을 선택하는 버튼에 이벤트를 등록합니다
     */
    registerClickEventToProductClickNumBtn() {
        this.createProductNumNodeArr().forEach(element => {
            element.addEventListener("click", () => {
                const controlPresenter = this.mainView.getPresenter().getControlPresenter();
                const logPresenter = this.mainView.getPresenter().getLogPresenter();
                controlPresenter.doBeforeProductPurchase(element);
                controlPresenter.startProductPurchaseTimer(1000);
            });
        });
    }

    /** 
     * 상품을 클릭하는 버튼의 배열을 생성합니다
     * @returns {array}
    */
    createProductNumNodeArr() {
        const productNumBtnList = this.util.getNodeData('.btn-num', 'all');
        const productNumZeroBtn = this.util.getNodeData('.btn-zero-num');
        const productNumBtnArr = this.util.convertNodeListToArray(productNumBtnList);
        productNumBtnArr.push(productNumZeroBtn);
        return productNumBtnArr;
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