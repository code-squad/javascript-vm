class Utility {
    
    /**
    * 숫자 3자리마다 콤마를 찍습니다
    * @param {number} x - 숫자 데이터
    * @return {string} 콤마가 포함된 숫자데이터
    */
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
     * 숫자만 골라내는 정규식입니다
     * @param {string} data - 금액 데이터
     * @return {number} 숫자 데이터
     */
    sortOutNumber(data) {
        return Number(data.replace(/[^0-9]/g,''));
    }

    /**
     * 로그의 문장을 만들어서 리턴합니다
     * @param {string} data 
     * @param {string} mode 
     * @returns 문장이 포함된 로그텍스트를 리턴
     */
    addLogSentenceText(data, mode) {
        if (mode === 'input') {
            return data + "원이 투입됨";
        }
        if (mode === 'select') {
            return data + "번이 선택됨";
        }
        if (mode === 'refund') {
            return data + "원이 반환됨";
        }
    }

    /**
     * 식별하기 쉽도록 로그 텍스트 맨 앞에 모드 문자를 추가합니다
     * @param {string} logData
     * @param {string} mode - [삽입] or ...
     * @returns 모드가 포함된 로그텍스트를 리턴
     */
    addLogModeText(data, mode) {
        if (mode === 'input') {
            return '[투입] ' + data;
        }
        if (mode === 'select') {
            return '[선택] ' + data;
        }
        if (mode === 'refund') {
            return '[반환] ' + data;
        }
    }

    /**
     * 노드에 속성을(클래스) 설정합니다
     * @param {node} node
     * @param {string} property - 노드에 적용할 Class명
     */
    setPropertyToItemNode(node, property) {
        node.classList.add(property);
    }


}