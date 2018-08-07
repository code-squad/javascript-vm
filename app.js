window.addEventListener('DOMContentLoaded', () => {
    const model = new VendingMachineModel();
    const view = new VendingMachineMainView();
    const presenter = new VendingMachineMainPresenter(model, view);

    view.setPresenter(presenter);
    presenter.initProcess();
});