const Utility = {

    /**
    * 숫자 3자리마다 콤마를 찍습니다
    * @param {number} x - 숫자 데이터
    * @return {string} 콤마가 포함된 숫자데이터
    */
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    /**
     * querySelector 함수를 대체합니다
     * @param {Node Class or ID data} data
     * @param {string} mode - all or none
     */
    getNodeData(data, mode) {
        return (mode === "all") ? document.querySelectorAll(data) : document.querySelector(data);
    },

    /**
     * 숫자만 골라내는 정규식입니다
     * @param {string} data - 금액 데이터
     * @return {number} 숫자 데이터
     */
    sortOutNumber(data) {
        return Number(data.replace(/[^0-9]/g,''));
    },

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
    },

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
    },

    /**
     * 노드에 속성을(클래스) 설정합니다
     * @param {node} node
     * @param {string} property - 노드에 적용할 Class명
     */
    setPropertyToItemNode(node, property) {
        node.classList.add(property);
    },

    /**
     * nodeList 를 array 로 변환합니다
     * Array.prototype.slice.call(nodeList)
     * [].slice.call(nodeList)
     * Array.from(nodeList)
     * @returns nodeList to array
    */
    convertNodeListToArray(nodeList) {
        // return Array.prototype.slice.call(nodeList);
        // return [].slice.call(nodeList);
        return Array.from(nodeList);
    },

    /**
     * 올바른 상품을 선택했는지 확인합니다
     * @param {number} data - 선택된 번호
     * @param {number} start
     * @param {number} end
     * @returns true - start~end 범위의 숫자 (올바른 상품)
     * @returns false - 이외의 숫자
     * 에러메세지 출력 및 입력된 번호 초기화
     */
    isCorrectSelectedProductNum(data, start, end) {
        if (data < start || data > end) return false;
        return true;
    },

    /**
     * 상품을 구매할 수 있는 가격인지 확인합니다
     * @returns true - 상품을 구매 가능할 때
     * @returns false - 상품을 구매하지 못할 때
     */
    isPossiblePurchase(price, investedMoney) {
        if (price <= investedMoney) return true;
        return false;
    },

    /**
     * classList 를 사용해 node의 클래스 속성을 제거합니다
     * @param {node} node
     * @param {string} className
     */
    removeNodeClass(node, className) {
        node.classList.remove(className);
    },

    /**
     * 에러메세지를 반환합니다
     * @param {string} type
     */
    getErrorMsg(type) {
        if (type === 'walletMoneyShortage') {
            return "지갑의 돈이 부족합니다 :(";
        }
        if (type === 'investedMoneyShortage') {
            return "금액이 부족합니다 :(";
        }
        if (type === 'nonExistProduct') {
            return "상품이 존재하지 않습니다 :(";
        }
    },

    /**
     * 반환하는 과정에서 예외사항을 처리합니다.
     */
    isMoneyZero(money) {
        if (money === 0) return true;
        return false;
    }


}

export { Utility }
