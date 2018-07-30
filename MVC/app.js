window.addEventListener('DOMContentLoaded', () => {
    const model = new VendingMachineModel();
    const viewUtil = new VendingMachineViewUtil(model);
    const viewUpdate = new VendingMachineViewUpdate(model, viewUtil);
    const view = new VendingMachineView(model, viewUpdate, viewUtil);
    const controller = new VendingMachineController(model, view);

    console.log("Success Loaded MODEL VIEW CONTROLLER !");
});