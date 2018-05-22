class VmController {
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
    this.insertMoney(data)
  }
  reRenderWallet(data){
    this.vendingMachineView.reRenderWallet(data);
  }
  insertMoney(data){
    this.vendingMachine.insertMoney(data);
  }
  reRenderVendingMachineMoney(data){
    this.vendingMachineView.reRenderVendingMachineMoney(data);
  }
  displayCanBuyList(money){
    this.vendingMachineView.displayCanBuyList(money);
  }
  reRenderLog(latestHistorys){
    this.vendingMachineView.reRenderLog(latestHistorys);
  }
  handleSelectButtonClicked(buttonText){
    this.vendingMachine.logSelection(buttonText)
  }
  displaySelectedButtonNumber(selectedText){
    this.vendingMachineView.displaySelectedButtonNumber(selectedText)
  }
  startTimer(time){
    this.vendingMachineView.startTimer(time);
  }
}