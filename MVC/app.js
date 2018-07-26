window.addEventListener('DOMContentLoaded', () => {
    const model = new VendingMachineModel();
    const view = new VendingMachineView(model);
    const controller = new VendingMachineController(model, view);

    console.log("Success Loaded MODEL VIEW CONTROLLER !");
});