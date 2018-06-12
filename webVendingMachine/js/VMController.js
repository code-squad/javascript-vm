export class VmController {
  constructor({wallet, vendingMachine}, {vendingMachineView,walletView}){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.vendingMachineView = vendingMachineView;
    this.walletView = walletView;
  }
  init(){
    // controller bind
    this.vendingMachine.controller = this;
    this.wallet.controller = this 
    this.vendingMachineView.controller = this;
    this.walletView.controller = this;
    this.initRender()
  }
  initRender(){
    this.vendingMachineViewInitRender()
    this.walletViewInitRender()
  }
  vendingMachineViewInitRender(){
    const snackList = this.vendingMachine.getSnackList()
    this.vendingMachineView.initRender(snackList)    
  }
  walletViewInitRender(){
    const myMoney  = this.wallet.getMyMoney();
    const toatlMoney = this.wallet.getTotalMoney()
    this.walletView.initRender(myMoney, toatlMoney);
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


