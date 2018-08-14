// import { VendingMachineModel } from './Model/Model';
// import { VendingMachineMainView } from './View/MainView';
// import { VendingMachineMainPresenter } from './Presenter/MainPresenter';
import { Utility } from './util';

// window.addEventListener('DOMContentLoaded', () => {

//     const util = new Utility();

//     const model = new VendingMachineModel();
//     const view = new VendingMachineMainView(util);
//     const presenter = new VendingMachineMainPresenter(util, model, view);

//     view.setPresenter(presenter);
//     presenter.initProcess();
// });



function loadHandler() {
    const util = new Utility();

    // const model = new VendingMachineModel();
    // const view = new VendingMachineMainView(util);
    // const presenter = new VendingMachineMainPresenter(util, model, view);

    // view.setPresenter(presenter);
    // presenter.initProcess();
}

document.addEventListener('DOMContentLoaded', loadHandler);