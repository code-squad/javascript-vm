import { VendingMachineItemPrsenter } from './ItemPresenter';
import { VendingMachineWalletPresenter } from './WalletPresenter';
import { VendingMachineControlPresenter } from './ControlPresenter';
import { VendingMachineLogPresenter } from './LogPresenter';

class VendingMachineMainPresenter {
    constructor(util, model, view) {
        this.model = model;
        this.view = view;
        
        this.itemView = view.getItemView();
        this.walletView = view.getWalletView();
        this.controlView = view.getControlView();
        this.logView = view.getLogView();

        this.itemPresenter = new VendingMachineItemPrsenter(model, view);
        this.walletPresenter = new VendingMachineWalletPresenter(util, model, view);
        this.controlPresenter = new VendingMachineControlPresenter(util, model, view);
        this.logPresenter = new VendingMachineLogPresenter(model, view);
    }

    /**
     * 웹 자판기의 초기화를 진행합니다
     */
    initProcess() {
        this.model.increaseWalletMoney(10000);
        let walletMoney = this.model.getWalletMoney();
        this.walletView.refreshWalletMoney(walletMoney);
    }

    /**
     * @returns Item Presenter Class
     */
    getItemPresenter() {
        return this.itemPresenter;
    }

    /**
     * @returns Wallet Presenter Class
     */
    getWalletPresenter() {
        return this.walletPresenter;
    }

    /**
     * @returns Control Presenter Class
     */
    getControlPresenter() {
        return this.controlPresenter;
    }

    /**
     * @returns Log Presenter Class
     */
    getLogPresenter() {
        return this.logPresenter;
    }

}

export { VendingMachineMainPresenter }