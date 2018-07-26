class VendingMachineView {
    constructor(model) {
        this.model = model;

        this.registerClickEventToInsertMoneyBtn();

        console.log("Success Exit - View Constructor");
    }

    /*
        INPUT: NONE
        OUTPUT: NONE
        DESCRIPTION: 동전을 투입하는 버튼에 이벤트를 등록합니다.        
    */
    registerClickEventToInsertMoneyBtn() {
        const moneyInputBtnList = document.querySelectorAll('.ui-item-base');        

        for (let node of moneyInputBtnList) {
            if (node.nodeName === "BUTTON") {
                node.addEventListener("click", () => {
                    console.log(node.innerText);
                });
            } // if
        } // for

        console.log("success Exit registerClickEventToInsertMoneyBtn");

    } // function

    /*
        INPUT: money (투입된 돈)
        OUTPUT: NONE
        DESCRIPTION: model 로 접근해 돈을 투입하고, 내 지갑의 돈을 화면에 표시합니다.
    */
    insertMoney(money) {
        this.model.increaseCurrentMoney(money);
        this.showCurrentMoney();
    }

    /*
        INPUT: NONE
        OUTPUT: NONE
        DESCRIPTION: 내 지갑의 돈을 표시합니다 (VIEW)
    */
    showCurrentMoney() {
        const currentMoneyDivNode = document.querySelector('#money-amount-window');
        // console.log(currentMoneyDiv);
        let currentMoneyDataWithCommas = this.numberWithCommas(this.model.getCurrentMoney());
        currentMoneyDivNode.textContent = currentMoneyDataWithCommas + "원";
    }

    /*
        INPUT: x (INT 형 데이터)
        OUTPUT: STRING
        DESCRIPTION: 숫자 3자리마다 콤마를 찍습니다.
    */
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    

} // class