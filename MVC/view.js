/** 자판기에 대한 VIEW를 나타내는 클래스 입니다 */
class VendingMachineView {
    /**
     * 이벤트를 지정합니다.
     * @param {Class} model - 자판기 MODEL 클래스 객체입니다.
     */
    constructor(model, update, util, exception) {
        this.model = model;
        this.viewUpdate = update;
        this.viewUtil = util;
        this.exceptionView = exception;

        this.registerClickEventToInsertMoneyBtn();
        this.registerClickEventToProductClickNumBtn();
    }



























    

} // class