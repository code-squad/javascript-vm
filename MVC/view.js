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
                    const selectionMoneyNumberData = this.sortOutNumber(node.innerText);
                    this.insertMoneyToVendingMachine(selectionMoneyNumberData);
                });
            } // if
        } // for

        console.log("success Exit registerClickEventToInsertMoneyBtn");

    } // function

    /*
        INPUT: money (투입된 돈)
        OUTPUT: NONE
        DESCRIPTION: 
         model 로 접근해 데이터를 저장합니다.
         내 지갑의 돈을 화면에 표시합니다.
    */
    insertMoneyToWallet(money) {
        this.model.increaseWalletMoney(money);
        this.refreshWalletMoney();
    }

    /*
        INPUT: NONE
        OUTPUT: NONE
        DESCRIPTION: 내 지갑의 돈을 표시합니다 (VIEW)
    */
    refreshWalletMoney() {
        const walletMoneyDivNode = document.querySelector('#money-amount-window');
        // console.log(currentMoneyDiv);
        let walletMoneyDataWithCommas = this.numberWithCommas(this.model.getWalletMoney());
        walletMoneyDivNode.textContent = walletMoneyDataWithCommas + "원";
    }

    /*
        INPUT: NONE
        OUTPUT: NONE
        DESCRIPTION: 자판기에 투입된 돈을 새로고침합니다 (VIEW)
    */
    refreshInvestedMoneyInVendingMachine() {
        const vendingMachineInvestedMoneyDivNode = document.querySelector('#money-display');
        // console.log(vendingMachineInvestedMoneyDivNode);
        let InvestedMoneyWithCommas = this.numberWithCommas(this.model.getInvestedMoney());
        vendingMachineInvestedMoneyDivNode.textContent = InvestedMoneyWithCommas + "원";
    }

    /*
        INPUT: x (INT 형 데이터)
        OUTPUT: STRING
        DESCRIPTION: 숫자 3자리마다 콤마를 찍습니다.
    */
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /*
        INPUT: STRING
        OUTPUT: INT
        DESCRIPTION: 숫자만 골라내는 정규식입니다.
    */
    sortOutNumber(data) {
        return Number(data.replace(/[^0-9]/g,''));
    }

    /*
        INPUT: money
        OUTPUT: NONE
        DESCRIPTION: 자판기에 돈을 투입합니다.
    */
    insertMoneyToVendingMachine(money) {
        this.model.increaseInvestedMoney(money);
        this.refreshInvestedMoneyInVendingMachine();
        this.model.decreaseWalletMoney(money);
        this.refreshWalletMoney();
    }    

} // class