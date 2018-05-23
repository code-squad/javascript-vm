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
    this.timerId = null;
  }
  insertMoney(data){
    this.money += Number(data.money);
    this.logInsert('insertMoney', data.money);
    this.emit('displayCanBuyList', this.money);
    this.emit('reRenderVendingMachineMoney', this.money)
  }
  logInsert(type, data){
    const logData = {type, data};
    this.savelogHistory(logData);
    const latestHistorys = this.logHistoryList.slice(-3);
    this.emit('reRenderLog',latestHistorys)
  }
  logSelection(selectedText){
    this.selectedText += selectedText
    this.emit('displaySelectedButtonNumber',this.selectedText)
    this.emit('startTimer',5)
    if(this.selectedText.length===2)this.emit('blockOverRange')
  }
  updatedSelectedText(selectedText){
    return this.selectedText += selectedText
  }
  clearSelectedInfo(){
    this.selectedText = "";
    clearTimeout(this.timerId);
    this.timerId = null;
  }
  savelogHistory(logData){
    this.logHistoryList = this.logHistoryList.concat(logData);
  }
  updateTimerInfo(intervalId){
    clearTimeout(this.timerId);
    this.timerId = intervalId;
  }
  selectSnack(){
    const snackId = Number(this.selectedText)
    const selectedOne = this.snackList.find(snack=>snack.id===snackId)
    if(selectedOne===undefined) return this.handleChoseWrongNumber(snackId)
    this.checkCanBuy(selectedOne)
  }
  handleChoseWrongNumber(snackId){
    this.clearSelectedInfo();
    return this.emit('notifyChoseWrongNumber',snackId)
  }
  checkCanBuy(selectedOne){
    this.clearSelectedInfo();    
    if(this.money>=selectedOne.price){
      this.useMoney(selectedOne.price)
      return this.emit('sendSelectedSnack',selectedOne) 
    } 
    else return this.emit('notifyCanNotBuy', this.money)
  }
  useMoney(snackPrice){
    this.money-=snackPrice
    this.emit('reRenderVendingMachineMoney', this.money)
    this.emit('updateCanBuyList', this.money)
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
}