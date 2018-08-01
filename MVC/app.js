window.addEventListener('DOMContentLoaded', () => {
    const model = new VendingMachineModel();
    const viewUtil = new VendingMachineUtilView(model);
    const viewUpdate = new VendingMachineUpdateView(model, viewUtil);
    const view = new VendingMachineView(model, viewUpdate, viewUtil);
    const controller = new VendingMachineController(model, view);
});