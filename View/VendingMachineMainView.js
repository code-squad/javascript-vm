import { VendingMachineControlView } from './VendingMachineControlView.js';
import { VendingMachineItemView } from './VendingMachineItemView.js';
import { VendingMachineWalletView } from './VendingMachineWalletView.js';
import { VendingMachineLogView } from './VendingMachineLogView.js';

class VendingMachineMainView {
    constructor(util) {
        this.presenter;
        this.controlView = new VendingMachineControlView(this, util);
        this.itemView = new VendingMachineItemView(this, util);
        this.walletView = new VendingMachineWalletView(this, util);
        this.logView = new VendingMachineLogView(this, util);
    }

    /**
     * @returns Control View 를 반환합니다
    */
    getControlView() {
        return this.controlView;
    }

    /**
     * @returns Item View 를 반환합니다
     */
    getItemView() {
        return this.itemView;
    }

    /**
     * @returns Wallet View 를 반환합니다
     */
    getWalletView() {
        return this.walletView;
    }

    /**
     * @returns Log View 를 반환합니다
     */
    getLogView() {
        return this.logView;
    }

    /**
     * Presenter 를 지정합니다
     * @param {class} presenter - MainPresenter class
     */
    setPresenter(presenter) {
        this.presenter = presenter;
    }

    /**
     * Presenter 을 반환합니다
     * @returns MainPresenter Class
     */
    getPresenter() {
        return this.presenter;
    }
}

export { VendingMachineMainView }
