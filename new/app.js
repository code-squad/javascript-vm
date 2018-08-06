window.addEventListener('DOMContentLoaded', () => {
    const model = new VendingMachineModel();
    const view = new VendingMachineView();
    const presenter = new VendingMachinePresenter(model, view);

    view.setPresenter(presenter);    


});