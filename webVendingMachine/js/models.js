class WalletModel {
  constructor(myMoney){
    this.myMoney=myMoney;
    this.controller = null;
  }
  get totalMoney(){
    return Object.keys(this.myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*this.myMoney[money]
    },0)
  }
  useMoney(data){
    if(this.myMoney[data.money]){
      this.myMoney[data.money]-=1;
      data.totalMoney = this.totalMoney
      data.moneyCount = this.myMoney[data.money]
      this.emit('reRenderWallet',data)
      return Number(data.money)
    }
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
}
class VendingMachineModel {
  constructor(snackList){
    this.selectedText = '';
    this.money = 0;
    this.snackList= snackList
    this.controller = null;
    this.logHistoryList = [];
  }
  startAutoChecking(){
    setTimeout(()=>{

    }, 3000)
  }
  insertMoney(data){
    this.money += Number(data.money);
    data.insertedMoney = this.money;
    this.logInsert('insertMoney', data.money);
    this.emit('displayCanBuyList', this.money);
    this.emit('reRenderVendingMachineMoney', data)
  }
  logInsert(type, data){
    const logData = {type, data};
    this.savelogHistory(logData);
    const latestHistorys = this.logHistoryList.slice(-3);
    this.emit('reRenderLog',latestHistorys)
  }
  logSelection(selectedText){
    this.selectedText += selectedText
    const selectedInfo = this.selectedText+" 번"
    this.emit('displaySelectedButtonNumber',this.selectedText)
    this.emit('startTimer',3)
  }
  updatedSelectedText(selectedText){
    return this.selectedText += selectedText
  }
  clearSelectedInfo(){
    this.selectedText = "";
  }
  savelogHistory(logData){
    this.logHistoryList = this.logHistoryList.concat(logData);
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
}