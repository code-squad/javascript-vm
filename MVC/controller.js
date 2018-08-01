/** 자판기에 대한 Controller를 나타내는 함수입니다 */
class VendingMachineController {
    /**
     * View의 이벤트에 의해서 동작되는 변경사항을 연결 (이벤트 핸들러 역할을 포함)
     * @param {Class} model 
     * @param {Class} view 
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initProcess();
    }

    /** 
     * 웹 자판기의 초기상태를 지정합니다 (VIEW 접근)
    */
    initProcess() {
        this.view.insertMoneyToWallet(10000);
    }
}