/** 자판기에 대한 VIEW를 나타내는 클래스 입니다 */
class VendingMachineView {
    /**
     * 이벤트를 지정합니다.
     * @param {Class} model - 자판기 MODEL 클래스 객체입니다.
     */
    constructor(model) {
        this.model = model;

        this.registerClickEventToInsertMoneyBtn();

        console.log("Success Exit - View Constructor");
    }

    /**
     * querySelector 함수를 대체합니다
     * @param {Node Class or ID data} data 
     * @param {string} mode - all or none
     */
    getNodeData(data, mode) {
        return (mode === "all") ? document.querySelectorAll(data) :
            document.querySelector(data);
    }

    /** 
     * 동전을 투입하는 버튼에 이벤트를 등록합니다
    */
    registerClickEventToInsertMoneyBtn() {
        const moneyInputBtnList = this.getNodeData('.ui-item-base', 'all');        

        for (let node of moneyInputBtnList) {
            if (node.nodeName !== "BUTTON") continue;
            node.addEventListener("click", () => {
                const selectionMoneyNumberData = this.sortOutNumber(node.innerText);
                this.insertMoneyToVendingMachine(selectionMoneyNumberData);
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
        this.refreshWalletMoney();
    }

    /** 
     * 내 지갑의 돈을 새로고침합니다 (VIEW)
    */
    refreshWalletMoney() {
        const walletMoneyDivNode = this.getNodeData('#money-amount-window');
        this.changeMoneyNodeTextContent(walletMoneyDivNode, this.model.getWalletMoney());
    }

    /** 
     * 자판기에 투입된 돈을 새로고침합니다 (VIEW)
    */
    refreshInvestedMoneyInVendingMachine() {
        const vendingMachineInvestedMoneyDivNode = this.getNodeData('#money-display');
        this.changeMoneyNodeTextContent(
          vendingMachineInvestedMoneyDivNode, this.model.getInvestedMoney());
    }

    /**
     * 돈을 표시하는 노드의 textContent 를 수정합니다
     * @param {DOM NODE} node - 노드 데이터
     * @param {number} money - 금액 데이터
     */
    changeMoneyNodeTextContent(node, money) {
        let moneyWithCommas = this.numberWithCommas(money);
        node.textContent = money + "원";
    }

    /**
     * 숫자 3자리마다 콤마를 찍습니다
     * @param {number} x - 숫자 데이터
     * @return {string} 콤마가 포함된 숫자데이터
     */
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * 숫자만 골라내는 정규식입니다
     * @param {string} data - 금액 데이터
     * @return {number} 숫자 데이터
     */
    sortOutNumber(data) {
        return Number(data.replace(/[^0-9]/g,''));
    }

    /**
     * 자판기에 돈을 투입합니다
     * @param {number} money - 금액 데이터
     */
    insertMoneyToVendingMachine(money) {
        this.model.decreaseWalletMoney(money);
        if (this.checkWalletMoneyMinus()) {
            this.model.increaseWalletMoney(money);
            this.alertErrorMessage("지갑의 돈이 부족합니다 :(");
            return;
        }
        this.model.increaseInvestedMoney(money);
        this.refreshInvestedMoneyInVendingMachine();
        
        this.refreshWalletMoney();
    }

    /** 
     * 지갑의 돈이 마이너스 되는지 검사합니다
     * @return {boolean}
    */
    checkWalletMoneyMinus() {
        return this.model.getWalletMoney() < 0;
    }

    /**
     * 브라우저에 경고창을 띄웁니다.
     * @param {string} message - 메세지 데이터
     */
    alertErrorMessage(message) {
        alert(message);
    }

} // class