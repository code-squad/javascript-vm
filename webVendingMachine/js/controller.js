export class VmController {
  constructor(vendingMachine,wallet,vendingMachineView){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.vendingMachineView = vendingMachineView;
  }
  on(eventName, data){
    this[eventName](data)
  }
  useMoney(data){
    this.wallet.useMoney(data)
    this.vendingMachine.insertMoney(data);
  }
  reRenderWallet(data){
    this.vendingMachineView.reRenderWallet(data);
  }
  reRenderVendingMachineMoney(money){
    this.vendingMachineView.reRenderVendingMachineMoney(money);
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
  selectSnack(){
    this.vendingMachine.selectSnack()
    this.vendingMachineView.setNumberButtonDisable(false);
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
    this.vendingMachine.clearSelectedInfo();
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


