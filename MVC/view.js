/** 자판기에 대한 VIEW를 나타내는 클래스 입니다 */
class VendingMachineView {
    /**
     * 이벤트를 지정합니다.
     * @param {Class} model - 자판기 MODEL 클래스 객체입니다.
     */
    constructor(model, update, util) {
        this.model = model;
        this.viewUpdate = update;
        this.viewUtil = util;

        this.registerClickEventToInsertMoneyBtn();
        this.registerClickEventToProductClickNumBtn();
    }

    /** 
     * 동전을 투입하는 버튼에 이벤트를 등록합니다
     */
    registerClickEventToInsertMoneyBtn() {
        const moneyInputBtnList = this.viewUtil.getNodeData('.ui-item-base', 'all');

        for (let node of moneyInputBtnList) {
            if (node.nodeName !== "BUTTON") continue;
            node.addEventListener("click", () => {
                const selectionMoneyNumberData = this.viewUtil.sortOutNumber(node.innerText);
                this.insertMoneyToVendingMachine(selectionMoneyNumberData);
                this.showSelctableNodes();
            });
        } // for
    } // function

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
                this.model.updateCurrentSelectedNumTxt(element.innerText);
                this.startProductPurchaseTimer(1000);
            });
        });
    }

    /**
     * model 로 접근해 데이터를 저장하고, 내 지갑의 돈을 화면에 표시합니다
     * @param {number} money - 금액 데이터
     */
    insertMoneyToWallet(money) {
        this.model.increaseWalletMoney(money);
        this.viewUpdate.refreshWalletMoney();
    }

    /**
     * 자판기에 돈을 투입합니다
     * @param {number} money - 금액 데이터
     */
    insertMoneyToVendingMachine(money) {
        this.model.decreaseWalletMoney(money);
        if (this.viewUtil.checkWalletMoneyMinus()) {
            this.model.increaseWalletMoney(money);
            this.viewUpdate.showAlertMsg('walletMoneyShortage', 1500);
            return false;
        }
        this.model.increaseInvestedMoney(money);
        this.viewUpdate.refreshInvestedMoneyInVendingMachine();
        
        this.viewUpdate.refreshWalletMoney();
        this.displayLog(money, 'input');
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
     * 로그 창에 로그를 표시(출력)합니다
     * @param {string} logData
     * @param {string} mode
     */
    displayLog(logData, mode) {
        logData = this.viewUtil.addLogSentenceText(logData, mode);
        this.model.insertLogData(logData);
        this.insertLogDivToLogWindow(logData, mode);
    }

    /**
     * 현재의 가격에 맞춰 노드들을 새로고침 합니다
     */
    refreshSelectableNodes() {
        this.hideSelectableNodes();
        this.showSelctableNodes();
    }

    /** 
     * 상품을 구매하는 타이머를 시작합니다.
     * @param {number} time
     */
    startProductPurchaseTimer(time) {
        let productPurchaseTimerID = setTimeout(() => {
            let currentEnteredProductID = this.model.getCurrentSelectedNumTxt();
            let selectedProductPrice = this.model.getItemPrice(Number(currentEnteredProductID));

            if (! this.viewUtil.checkCorrectSelectedProductNum(currentEnteredProductID, 1, 32)) {
                this.viewUpdate.showAlertMsg('nonExistProduct', 1500);
                return;
            }
            if (! this.viewUtil.checkPossiblePurchase(selectedProductPrice)) {
                this.viewUpdate.showAlertMsg('investedMoneyShortage', 1500);
                return;
            }

            this.excuteProductPurchaseHandler(currentEnteredProductID, selectedProductPrice);
        }, time);
        this.model.setProductVerificationTimerID(productPurchaseTimerID);
    }

    /** 
     * 상품을 구매하는 핸들러를 실행합니다
     * setTimeout 이벤트에 의해 호출되므로 -Handler 네이밍을 적용하였습니다
     */
    excuteProductPurchaseHandler(productID, price) {
        this.displayLog(productID, 'select');
        this.model.decreaseInvestedMoney(price);
        this.viewUpdate.refreshInvestedMoneyInVendingMachine();
        this.refreshSelectableNodes();
        this.model.initCurrentSelectNumTxt();
        this.viewUpdate.startRefundInvestedMoneyTimer(3000);
    }

    /**
     * 투입된 금액을 반환하는 타이머를 시작합니다
     * @param {number} time
     */
    startRefundInvestedMoneyTimer(time) {
        let refundTimerID = setTimeout(() => {
            debugger;
            // 투입된 금액 초기화
            const currentInvestedMoney = this.model.getInvestedMoney();
            this.model.decreaseInvestedMoney(currentInvestedMoney);
            this.model.increaseWalletMoney(currentInvestedMoney);
            this.displayLog(currentInvestedMoney, 'refund');
        }, time);
    }

} // class