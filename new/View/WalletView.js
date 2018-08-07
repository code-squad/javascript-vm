class VendingMachineWalletView {
    constructor(view) {
        this.mainView = view;

        this.itemView;

        this.util = new Utility();
    }

    /** 
     * 동전을 투입하는 버튼에 이벤트를 등록합니다
     */
    registerClickEventToInsertMoneyBtn() {
        const moneyInputBtnList = this.util.getNodeData('.ui-item-base', 'all');
        // const investedMoney = this.model.getInvestedMoney();

        for (let node of moneyInputBtnList) {
            if (node.nodeName !== "BUTTON") continue;
            node.addEventListener("click", () => {
                const selectionMoneyNumberData = this.util.sortOutNumber(node.innerText);
                const walletPresenter = this.mainView.getPresenter().getWalletPresenter();
                const controlPresenter = this.mainView.getPresenter().getControlPresenter();
                const result = walletPresenter.insertMoneyToVendingMachine(selectionMoneyNumberData);
                controlPresenter.refreshInvestedMoney(result, selectionMoneyNumberData, 'input');
                this.mainView.getItemView().showSelctableNodes();
                // this.model.clearTimer(this.model.getRefundTimerID());
            });
        }
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