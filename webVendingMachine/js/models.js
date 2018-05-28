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
    this.autoClearId = null;
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
  handleSelectNumberButtonClicked(selectedText){
    if((this.selectedText+selectedText).length===3) return this.emit('blockOverRange')
    this.selectedText += selectedText
    this.emit('displaySelectedButtonNumber',this.selectedText)
    this.emit('startTimer',5)
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
    if(this.selectedText==="") return this.emit('updateLogView',{logType: 'notifyNoneSelect'})
    const snackId = Number(this.selectedText)
    const selectedOne = this.snackList.find(snack=>snack.id===snackId);
    this.clearSelectedInfo();    
    return this.checkValidSelection(selectedOne, snackId)
  }
  checkValidSelection(selectedOne={name: 'outOfRange'}, snackId){
    if(this.isErrorCase(selectedOne)) return this.handleErrorCase(selectedOne, snackId)
    return this.checkCanBuy(selectedOne)
  }
  isErrorCase({name}){
    return (name==='outOfRange'||name==='{고장}') 
  }
  handleErrorCase(selectedOne, snackId){
    const updatedlogData = {id: snackId}
    updatedlogData.logType = selectedOne.name==='outOfRange'  ? 'notifyChoseWrongNumber' :'notifyBreakdown'
    return this.emit('updateLogView', updatedlogData)
  }
  checkCanBuy(selectedOne){
    if(this.money>=selectedOne.price){
      this.useMoney(selectedOne.price)
      const updatelogData = {...selectedOne, logType: 'displaySelectedOne'} 
      return this.emit('updateLogView', updatelogData) 
    } 
    else {
      const updatelogData = {money: this.money, logType: 'notifyCanNotBuy'}
      return this.emit('updateLogView',updatelogData)
    } 
  }
  useMoney(snackPrice){
    this.money-=snackPrice
    this.emit('reRenderVendingMachineMoney', this.money)
    this.emit('updateCanBuyList', this.money)
  }
  getAutoClearId(autoClearId){
    return this.autoClearId = autoClearId;
  }
  clearAutoClear(){
    clearTimeout(this.autoClearId);
    this.autoClearId = null;
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
}