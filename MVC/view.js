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

        console.log("Success Load - View Constructor");
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

        console.log("success Exit registerClickEventToInsertMoneyBtn");

    } // function

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
            this.viewUtil.alertErrorMessage("지갑의 돈이 부족합니다 :(");
            return false;
        }
        this.model.increaseInvestedMoney(money);
        this.viewUpdate.refreshInvestedMoneyInVendingMachine();
        
        this.viewUpdate.refreshWalletMoney();
        this.showLogFromLogWindow(money);
    }

    /**
     * 로그 창에 로그를 표시(출력)합니다
     * @param {string} logData
     */
    showLogFromLogWindow(logData) {
        logData = this.viewUtil.addLogSentenceText(logData, 'input');
        this.model.insertLogData(logData);
        this.viewUpdate.insertLogDivToLogWindow(logData);
        debugger;
    }

    /** 
     * 선택할 수 있는 노드들을 표시합니다
    */
    showSelctableNodes() {
        debugger;
        const itemNodeList = this.viewUtil.getNodeData('.d-item', 'all');
        const investedMoney = this.model.getInvestedMoney();
        // const priceRegex = /[가-힣]+\n\d+.\s/;
        const priceRegex = /.*\n+\d+.\s/;

        for (let node of itemNodeList) {
            const itemPrice = Number(node.innerText.replace(priceRegex, ''));
            console.log(itemPrice);
            debugger;
            if (investedMoney >= itemPrice) {
                this.viewUpdate.setHighLightToItemNode(node);
            }
        }
    }

} // class