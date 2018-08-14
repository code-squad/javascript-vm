import { VendingMachineModel } from './Model/VendingMachineModel.js';
import { VendingMachineMainView } from './View/VendingMachineMainView.js';
import { VendingMachineMainPresenter } from './Presenter/VendingMachineMainPresenter.js';
import { Utility } from './util.js';

function loadHandler() {
    const util = Utility;
    const model = new VendingMachineModel();
    const view = new VendingMachineMainView(util);
    const presenter = new VendingMachineMainPresenter(util, model, view);

    view.setPresenter(presenter);
    presenter.initProcess();
}

document.addEventListener('DOMContentLoaded', loadHandler);
