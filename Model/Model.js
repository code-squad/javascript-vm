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
        this.currentSelectedNumTxt = "";
        this.productVerificationTimerID;
        this.refundTimerID;
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
     * 투입된 금액을 감소시킵니다
     * @param {number} money
     */
    decreaseInvestedMoney(money) {
        this.investedMoney -= money;
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

    /** 
     * 현재 선택된 번호의 문자열을 반환합니다
    */
    getCurrentSelectedNumTxt() {
        return this.currentSelectedNumTxt;
    }

    /** 
     * 현재 선택된 번호의 문자열 길이를 반환합니다
    */
    getCurrentSelectedNumTxtLen() {
        return this.currentSelectedNumTxt.length;
    }

    /**
     * 현재 선택된 번호를 업데이트합니다
     */
    updateCurrentSelectedNumTxt(numTxt) {
        this.currentSelectedNumTxt += numTxt;
    }

    /** 
     * 현재 선택된 번호를 빈 문자열로 초기화합니다
    */
    initCurrentSelectNumTxt() {
        this.currentSelectedNumTxt = "";
    }

    /** 
     * 상품 검증 타이머 ID를 반환합니다
    */
    getProductVerificationTimerID() {
        return this.productVerificationTimerID;
    }

    /**
     * 상품검증 타이머의 ID를 지정합니다
     * @param {number} timerFunc - timer ID
     */
    setProductVerificationTimerID(id) {
        this.productVerificationTimerID = id;
    }

    /** 
     * 현재 타이머를 중지시킵니다
     * @param {number} id - setTimeout 함수를 담고있는 변수
    */
    clearTimer(id) {
        clearTimeout(id);
    }

    /** 
     * 반환 타이머 ID 를 반환합니다
    */
    getRefundTimerID() {
        return this.refundTimerID;
    }

    /**
     * 반환 타이머 ID 를 설정합니다
     * @param {number} id - setTimeout ID
     */
    setRefundTimerID(id) {
        this.refundTimerID = id;
    }


}