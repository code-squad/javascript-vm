class VendingMachineView {
    constructor(model) {
        this.model = model;

        this.registerClickEventToInsertMoneyBtn();

        console.log("Success Exit - View Constructor");
    }

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

} // class