/** 자판기에 대한 모델을 나타내는 클래스입니다 */
class VendingMachineModel {
    /** 
     * 자판기의 초기상태를 지정합니다.
    */
    constructor() {
        this.walletMoney = 0;
        this.investedMoney = 0;
        this.logDataList = [];
        this.itemPriceArr = [];

        console.log("Success Load - Model Constructor");
    }

    /** 
     * 현재 가지고 있는 돈을 반환하는 함수입니다
     * @return {number} - 지갑에 존재하는 금액 데이터
    */
    getWalletMoney() {
        return this.walletMoney;
    }

    /**
     * 현재 가지고 있는 돈을 증가시키는 함수입니다
     * @param {number} money - 금액 데이터
     */
    increaseWalletMoney(money) {
        this.walletMoney += money;
    }

    /**
     * 지갑의 돈을 감소시키는 함수입니다
     * @param {number} money - 금액 데이터
     */
    decreaseWalletMoney(money) {
        this.walletMoney -= money;
    }

    /** 
     * 투입된 금액을 반환합니다
     * @returns {number} 투입된 금액
    */
    getInvestedMoney() {
        return this.investedMoney;
    }

    /**
     * 투입된 금액을 증가시킵니다
     * @param {number} money - 금액 데이터
     */
    increaseInvestedMoney(money) {
        this.investedMoney += money;
    }

    /**
     * log list 에 log data 를 추가합니다
     * @param {string} log - 로그
     */
    insertLogData(log) {
        this.logDataList.push(log);
    }

    /** 
     * logDataList 를 반환합니다
    */
    getLogDataList() {
        return this.logDataList;
    }

    /**
     * 아이템 가격을 보관하는 배열의 index 에 price 데이터를 삽입합니다
     * @param {number} index 
     * @param {number} price 
     */
    addItemPrice(index, price) {
        this.itemPriceArr[index] = price;
    }

    /**
     * 아이템 가격 배열의 인덱스에 위치한 데이터를 반환합니다
     * @param {number} index 
     * @returns itemPriceArr[index]
     */
    getItemPrice(index) {
        return this.itemPriceArr[index];
    }
}