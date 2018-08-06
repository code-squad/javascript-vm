class VendingMachineRefreshView {
    constructor() {
        
    }

    /**
     * VIEW 를 전체적으로 새로고침 합니다
     */
    refreshView() {
        this.viewUpdate.refreshWalletMoney();
        this.viewUpdate.refreshInvestedMoneyInVendingMachine();
        this.refreshSelectableNodes();
    }





}