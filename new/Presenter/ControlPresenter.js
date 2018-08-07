class VendingMachineControlPresenter {
    constructor(model, view) {

        this.model = model;
        this.itemView = view.getItemView();
        this.controlView = view.getControlView();
        this.logView = view.getLogView();
        this.util = new Utility();

        this.controlView.registerClickEventToProductClickNumBtn();

    }

    /**
     * VIEW 에서 돈을 투입할 때, model 과 관련된 작업들을 진행합니다
     */
    refreshInvestedMoney() {
        let currentInvestedMoney = this.model.getInvestedMoney();
        this.controlView.refreshInvestedMoneyInVendingMachine(currentInvestedMoney);
    }

    /**
     * 상품을 구매하기 전 작업들을 진행합니다
     * do : 절차와 무관한 명령의 강제적 실행
     * @param {DOM node} element 
     */
    doBeforeProductPurchase(element) {
        this.model.clearTimer(this.model.getProductVerificationTimerID());
        this.model.clearTimer(this.model.getRefundTimerID());
        this.model.updateCurrentSelectedNumTxt(element.innerText);
    }

    /** 
     * 상품을 구매하는 타이머를 시작합니다
     * @param {number} time
     */
    startProductPurchaseTimer(time) {
        let productPurchaseTimerID = setTimeout(() => {
            let currentEnteredProductID = this.model.getCurrentSelectedNumTxt();
            let selectedProductPrice = this.model.getItemPrice(Number(currentEnteredProductID));

            if (this.isPossibleProductPurchase(currentEnteredProductID, selectedProductPrice)) return;
            this.excuteProductPurchaseHandler(currentEnteredProductID, selectedProductPrice);
        }, time);
        this.model.setProductVerificationTimerID(productPurchaseTimerID);
    }

    /**
     * 상품을 구입하는 과정에서 예외를 처리합니다
     * @param {number} id - 현재 선택된 ID
     * @param {price} price - 현재 선택된 상품의 가격
     */
    isPossibleProductPurchase(id, price) {
        if (!this.util.isCorrectSelectedProductNum(id, 1, 32)) {
            this.model.initCurrentSelectNumTxt();
            alert("상품존재ㄴ");
            // this.viewUpdate.showAlertMsg('nonExistProduct', 1500);
            return false;
        }
        if (!this.util.isPossiblePurchase(price, this.model.getInvestedMoney())) {
            this.model.initCurrentSelectNumTxt();
            alert("투입된 금액 부족");
            // this.viewUpdate.showAlertMsg('investedMoneyShortage', 1500);
            return false;
        }
    }

    /** 
     * 상품을 구매하는 핸들러를 실행합니다
     * setTimeout 이벤트에 의해 호출되므로 -Handler 네이밍을 적용하였습니다
     */
    excuteProductPurchaseHandler(productID, price) {
        this.logView.displayLog(productID, 'select');
        this.model.decreaseInvestedMoney(price);
        this.controlView.refreshInvestedMoneyInVendingMachine(this.model.getInvestedMoney());
        this.itemView.refreshSelectableNodes();
        this.model.initCurrentSelectNumTxt();
        // this.startRefundInvestedMoneyTimer(3000);
    }

    
    



}