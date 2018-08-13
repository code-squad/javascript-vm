window.addEventListener('DOMContentLoaded', () => {

    const util = new Utility();

    const model = new VendingMachineModel();
    const view = new VendingMachineMainView(util);
    const presenter = new VendingMachineMainPresenter(util, model, view);

    view.setPresenter(presenter);
    presenter.initProcess();
});