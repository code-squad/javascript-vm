window.addEventListener('DOMContentLoaded', () => {
    const model = new VendingMachineModel();
    const utilView = new VendingMachineUtilView(model);
    const updateView = new VendingMachineUpdateView(model, utilView);
    const exceptionView = new VendingMachineExceptionView(model, utilView, updateView);
    const view = new VendingMachineView(model, updateView, utilView, exceptionView);
    const controller = new VendingMachineController(model, view);
});