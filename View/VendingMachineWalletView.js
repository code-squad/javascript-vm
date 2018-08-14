class VendingMachineWalletView {

    constructor(view, util) {
        this.mainView = view;
        this.util = util;
        this.mainPresenter;
    }

    /** 
     * 동전을 투입하는 버튼에 이벤트를 등록합니다
     */
    registerClickEventToInsertMoneyBtn() {
        const moneyInputBtnList = this.util.getNodeData('.ui-item-base', 'all');

        for (let node of moneyInputBtnList) {
            if (node.nodeName !== "BUTTON") continue;
            node.addEventListener("click", this.insertMoneyBtnHandler.bind(this, node));
        }
    }

    /**
     * 동전을 투입하는 이벤트 핸들러입니다
     * @param {DOM Node} node - 금액 버튼 노드 
     */
    insertMoneyBtnHandler(node) {
        this.mainPresenter = this.mainView.getPresenter();
        const walletPresenter = this.mainPresenter.getWalletPresenter();
        const controlPresenter = this.mainPresenter.getControlPresenter();
        const selectionMoneyNumberData = this.util.sortOutNumber(node.innerText);
        const result = walletPresenter.insertMoneyToVendingMachine(selectionMoneyNumberData);
        if (!result) return;
        controlPresenter.refreshInvestedMoney();
        this.mainView.getLogView().displayLog(selectionMoneyNumberData, 'input');
        this.mainView.getItemView().showSelctableNodes();
        walletPresenter.calcelCurrentRunningTimer();
    }

    /** 
     * 내 지갑의 돈을 새로고침(지정) 합니다 (VIEW)
     */
    refreshWalletMoney(money) {
        const walletMoneyDivNode = this.util.getNodeData('#money-amount-window');
        this.changeMoneyNodeTextContent(walletMoneyDivNode, money); // this.model.getWalletMoney()
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

export { VendingMachineWalletView }