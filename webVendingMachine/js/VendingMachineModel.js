export function VendingMachineModel(snackList){
    this.money = 0;
    this.snackList= snackList
    this.controller = null;
    this.logHistoryList = [];
    this.timerId = null;
    this.autoClearId = null;
}

VendingMachineModel.prototype = {
  insertMoney(money){
    this.money += money;
    this.logInsert('insertMoney', money);
    this.emit('displayCanBuyList', this.money);
    this.emit('updateViewVendingMachineMoney', this.money)
  },
  getSnackList(){
    return this.snackList;
  },
  getLogHistory(){
    return this.logHistoryList;
  },
  logInsert(type, data){
    const logData = {type, data};
    this.savelogHistory(logData);
    const latestHistorys = this.logHistoryList.slice(-3);
    this.emit('reRenderLog',latestHistorys)
  },
  handleSelectNumberButtonClicked(selectedText){
    this.selectedText += selectedText
    this.selectedText = this.selectedText.slice(-2)
    this.emit('displaySelectedButtonNumber', this.selectedText)
    this.emit('startTimer',5)
  },
  updatedSelectedText(selectedText){
    return this.selectedText += selectedText
  },

  savelogHistory(logData){
    this.logHistoryList = [...this.logHistoryList, logData];
  },
  updateTimerInfo(intervalId){
    clearTimeout(this.timerId);
    this.timerId = intervalId;
  },
  getSnackId(selectedSnackId){
    this.selectedText = selectedSnackId;
    this.selectSnack(selectedSnackId)
  },
  selectSnack(selectedId){
    const selectedOne = this.snackList.find(snack=>snack.id===selectedId);   
    return this.checkValidSelection(selectedOne, selectedId)
  },
  checkValidSelection(selectedOne={name: 'outOfRange'}, snackId){
    if(this.isInValidCase(selectedOne)) return this.handleErrorCase(selectedOne, snackId)
    return this.checkCanBuy(selectedOne)
  },
  isInValidCase({name}){
    return (name==='outOfRange'||name==='{고장}') 
  },
  handleErrorCase(selectedOne, snackId){
    const updatedlogData = {id: snackId}
    updatedlogData.logType = selectedOne.name==='outOfRange'  ? 'notifyChoseWrongNumber' :'notifyBreakdown'
    return this.emit('updateLogView', updatedlogData)
  },
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
  },
  useMoney(snackPrice){
    this.money-=snackPrice
    this.emit('updateViewVendingMachineMoney', this.money)
    this.emit('updateCanBuyList', this.money)
  },
  returnMoney(){
    const returnMoney = this.money
    this.money = 0;
    const updateLogData = {money: returnMoney, logType: 'notifyReturnMoney'}
    this.logHistoryList = [];
    this.emit('updateViewVendingMachineMoney', this.money)
    this.emit('updateLogView', updateLogData)
    this.emit('updateCanBuyList', this.money)
  },
  getAutoClearId(autoClearId){
    return this.autoClearId = autoClearId;
  },
  clearAutoClear(){
    clearTimeout(this.autoClearId);
    this.autoClearId = null;
  },
  emit(eventName, data){
    this.controller.on(eventName, data);
  },
}





// class Timer {
//   constructor(){
//     this.timerId = null;
//     this.autoClearId = null;
//   }
// }


// 재고 



