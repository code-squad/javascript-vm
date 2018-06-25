import {getEl, getElAll, updateText, addClassToList, removeClassToList, clearText} from './utils.js';
import {snackTemplate, selectButtonTemplate, walletMoneyButtonTemplate, logtemplate} from './template.js'
import {buttonTextList} from './assets.js';

export class VendingMachineView {
  constructor(){
    this.selectButtonText=""
    this.timerId = null;
    this.selectTime = 5;
    this.snackListEl = getEl('.snack-list')
    this.selectButtonsEl = getEl('.number-buttons')
    this.moneyButtonListEl = getEl('.money-button-list')
    this.insertedMoneyEl = getEl('.diplay-inserted-money .money')
    this.displayLogEl = getEl('.display-log-box')
    this.timer = getEl('.time')
    this.controller = null;
    this.numberButtonListEL = null;
    this.bindEvents();
  }
  getMessageByType(type, data){
    const actions = {
      'insertMoney': (data)=> `<p class="log">${data}원이 입력되었습니다</p>`,
    }
    return actions[type](data)
  }
  initRender(){
    this.selectButtonsEl.insertAdjacentHTML('beforeend', selectButtonTemplate(buttonTextList))
    this.saveNumberButtonList();
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
  bindEvents(){
    getEl('.select-input').addEventListener('keydown', e=>this.handleInputSelected(e))
    this.selectButtonsEl.addEventListener('click', e =>this.handleSelectButtonClicked(e));
    return this;
  }
  handleInputSelected(e){
    if(e.keyCode===13){
      const selectedSnackId = e.target.value.trim()
      selectedSnackId && this.emit('sendSnackNumber', selectedSnackId)
      e.target.value = ''
    }
  }
  makeLogTemplate(latestHistorys){
     return latestHistorys.reduce(
      (ac,{type, data})=>{
        return ac+=this.getMessageByType(type,data)
      },``);
  }
  reRenderLog(latestHistorys){
    const latestMsgTemplate = this.makeLogTemplate(latestHistorys);
    this.displayLogEl.innerHTML = latestMsgTemplate;
    this.displayLogEl.lastElementChild.classList.add('now')
    // this.reStartAutoClear();
  }
  // reStartAutoClear(){
  // const clearTime = 2000
  //   // clearAutoClear
  //   this.emit('clearAutoClear')
  //   this.startAutoClearLog(this.clearTime);
  // }
  checkHasMoney(){
    return Number(this.insertedMoneyEl.innerText)
  }
  checkNoneSelected(){
    return this.selectButtonText===""
  }
  handleChoseBtnClicked(){
    if(!this.checkHasMoney()){
      this.handleHasNoMoney()
    } 
    if(this.checkNoneSelected()){
      this.clearSelectedInfo()
      return this.updateLogView(null,'notifyNoneSelect')
    } 
    return this.handleSelected()
  }
  clearSelectButtonText(){
    this.selectButtonText = "";
  }
  updateNumberBtnText(buttonText){
    this.selectButtonText+=buttonText
    if(this.selectButtonText.length>2){ 
      this.selectButtonText = this.selectButtonText.substr(-2)
    }
  }
  handleSelected(){
    this.emit('selectSnack', this.NumberToselectButtonText())
    this.clearSelectedInfo()    
  }
  handleHasNoMoney(){
    this.clearSelectedInfo()
    return this.updateLogView(null, 'notifyHasNoMoney')
  }
  handleSelectButtonClicked({target}){
    if(target.className!=="select-button") return ;
    if(target.id==='choose') return this.handleChoseBtnClicked()
    if(target.id==='cancel') return this.handleCancelButtonClicked()
    return this.handleNumberBtnClicked(target)
  }
  handleNumberBtnClicked(buttonEl){

    const buttonText = buttonEl.innerText 
    this.updateNumberBtnText(buttonText)
    this.emit('clearTimeInfo')
    if(!this.checkHasMoney()) return this.handleHasNoMoney()
    this.startTimer()
    // BtnTextUpdate
    this.updateLogView(this.selectButtonText, 'nowSelectedNumber')
  }
  updateViewVendingMachineMoney(money){
   updateText(this.insertedMoneyEl, `${money}`)
  }
  NumberToselectButtonText(){
    return Number(this.selectButtonText)
  }
  clearSelectedInfo(){
    this.emit('clearTimeInfo')
    this.clearSelectButtonText()
    this.initSelectedTime()
  }
  initSelectedTime(){
    this.selectTime = 5;
  }
  updateSelectTime(){
    this.selectTime-=1
    this.timer.innerText = this.selectTime; 
  }
  handleSelectByTime(type){
    const second = 1000;
    if(this.selectTime>=0){
      this.timerId = setTimeout(()=>{
        this.updateSelectTime()
        this.handleSelectByTime()
      }, second)
     this.emit('sendTimerId', this.timerId)
    }else {
      if(type==="returnMoney") this.emit('returnMoney')
      else this.handleChoseBtnClicked()
    }
  }
  startTimer(type = null){
    this.timer.innerText = this.selectTime;
    this.handleSelectByTime(type)
  }
  reStartTimer(){
    this.clearSelectedInfo()
    this.startTimer()
  }
  updateLogView(updatedLogData, templateType){
    this.displayLogEl.innerHTML = logtemplate[templateType](updatedLogData);
  }
  changeStyleselectedLog(){
    const selectedLog = getEl('.selected-button-info', this.displayLogEl)
    selectedLog.classList.add('with-notify')
  }
  handleCancelButtonClicked(){
    this.clearSelectedInfo()   
    this.clearLog();
  }
  startAutoClearLog(clearTime = 1000, type){
    const autoClearId = setTimeout(this.clearLog.bind(this,type), clearTime);
    this.emit('sendAutoClearId', autoClearId)
  }
  clearLog(type){
    const addOrderTime = 3
    clearText(this.displayLogEl);
    if(type==="selected"){
      this.emit('notifySecondOrder', {logType: 'notifySecondOrder'})
      this.startTimer(addOrderTime, 'returnMoney')
    } 
  }
  saveNumberButtonList(){
    const slectButtonList = getElAll('button',this.selectButtonsEl)
    return this.numberButtonListEL = [...slectButtonList].filter(buttonEl=> !isNaN(buttonEl.innerText))
  }
  clearTimer(){
    return clearText(this.timer)
  }
}



