export class VmController {
  constructor({wallet, vendingMachine}, {vendingMachineView,walletView}){
    Object.assign(this, { vendingMachine, wallet, vendingMachineView, walletView});
    this.bindController()
  }
  bindController(){
    this.vendingMachine.controller = this;
    this.wallet.controller = this 
    this.vendingMachineView.controller = this;
    this.walletView.controller = this;
  }
  vendingMachineViewInitRender(){
    const snackList = this.vendingMachine.getSnackList()
    this.vendingMachineView.initRender(snackList)    
  }
  on(eventName, data){
    this[eventName](data)
  }
  useMoney(money){
    this.wallet.useMoney(money)
  }
  insertMoney(money){
    this.vendingMachine.insertMoney(money);
  }
  reRenderWallet(data){
    this.vendingMachineView.reRenderWallet(data);
  }
  updateViewVendingMachineMoney(money){
    this.vendingMachineView.updateViewVendingMachineMoney(money);
  }
  displayCanBuyList(money){
    this.vendingMachineView.displayCanBuyList(money);
  }
  reRenderLog(latestHistorys){
    this.vendingMachineView.reRenderLog(latestHistorys);
  }
  handleSelectNumberButtonClicked(buttonText){
    this.clearAutoClear();
    this.vendingMachine.handleSelectNumberButtonClicked(buttonText)
  }
  displaySelectedButtonNumber(selectedText){
    this.vendingMachineView.displaySelectedButtonNumber(selectedText)
  }
  startTimer(time){
    this.vendingMachineView.startTimer(time);
  }
  updateTimerInfo(intervalId){
    this.vendingMachine.updateTimerInfo(intervalId)
  }
  selectSnack(selectedId){
    this.vendingMachine.selectSnack(selectedId)
  }
  updateLogView({logType, ...updatedlogData}){
    this.vendingMachineView.updateLogView(updatedlogData, logType)
  }
  handleCancelButtonClicked(){
    this.clearAutoClear();
    this.clearSelectedInfo();
    this.vendingMachineView.handleCancelButtonClicked();
  }
  updateCanBuyList(money){
    this.vendingMachineView.updateCanBuyList(money)
  }
  sendAutoClearId(autoClearId){
    this.vendingMachine.getAutoClearId(autoClearId)
  }
  clearSelectedInfo(){
    this.vendingMachineView.clearTimeInfo();
  }
  clearAutoClear(){
    this.vendingMachine.clearAutoClear();
  }
  notifyReturnMoney({logType, ...updatedlogData}){
    this.vendingMachineView.updateLogView(updatedlogData, logType)
  }
  notifySecondOrder({logType, ...updatedlogData}){
    this.vendingMachineView.updateLogView(updatedlogData, logType)
  }
  returnMoney(){
    this.vendingMachine.returnMoney()
  }
  sendSnackNumber(selectedSnackId){
    this.vendingMachine.getSnackId(selectedSnackId)
  }
}


