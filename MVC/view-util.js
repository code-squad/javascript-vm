/** 
 * MV 구조에서 VIEW 에 해당하며, 유틸을 담당합니다.
*/
class VendingMachineViewUtil {
    constructor(model) {
        this.model = model;
        
        console.log("Success Load view-util");
    }

    /**
     * querySelector 함수를 대체합니다
     * @param {Node Class or ID data} data 
     * @param {string} mode - all or none
     */
    getNodeData(data, mode) {
        return (mode === "all") ? document.querySelectorAll(data) : document.querySelector(data);
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
     * 지갑의 돈이 마이너스 되는지 검사합니다
     * @return {boolean}
    */
    checkWalletMoneyMinus() {
        return this.model.getWalletMoney() < 0;
    }

    /**
     * 브라우저에 경고창을 띄웁니다
     * @param {string} message - 메세지 데이터
     */
    alertErrorMessage(message) {
        alert(message);
    }

    /**
     * 로그의 문장을 만들어서 리턴합니다
     * @param {string} data 
     * @param {string} mode 
     * @returns 문장이 포함된 로그텍스트를 리턴
     */
    addLogSentenceText(data, mode) {
        if (mode == 'input') {
            data += "원이 투입됨";
        }

        return data;
    }

    /**
     * 식별하기 쉽도록 로그 텍스트 맨 앞에 모드 문자를 추가합니다
     * @param {string} logData
     * @param {string} mode - [삽입] or ...
     * @returns 모드가 포함된 로그텍스트를 리턴
     */
    addLogModeText(data, mode) {
        return mode + data;
    }

}