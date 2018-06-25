import {getEl, getElAll, updateText, addClassToList, removeClassToList, clearText} from './utils.js';
import {snackTemplate, selectButtonTemplate, walletMoneyButtonTemplate, logtemplate} from './template.js'
import {buttonTextList} from './assets.js';


export class VendingMachineView {
  constructor(){
    this.selectButtonText=""
    this.timerId = null;
    this.selectTime = 5;
    this.inputEl = getEl('.select-input')
    this.snackListEl = getEl('.snack-list')
    this.selectButtonsEl = getEl('.number-buttons')
    this.moneyButtonListEl = getEl('.money-button-list')
    this.myTotalMoneyEl = getEl('.total-my-assets .money')
    this.insertedMoneyEl = getEl('.diplay-inserted-money .money')
    this.displayLogEl = getEl('.display-log-box')
    this.timer = getEl('.time')
    this.controller = null;
    this.actions = {
      'insertMoney': (data)=> `<p class="log">${data}원이 입력되었습니다</p>`,
    }
    this.numberButtonListEL = null;
    this.clearTime = 2000;
    this.addOrderTime = 3;
    this.bindEvents();
  }
  getMessageByType(type, data){
    return this.actions[type](data)
  }
  initRender(snackList){
    this.snackListEl.insertAdjacentHTML('beforeend', snackTemplate(snackList))
    this.selectButtonsEl.insertAdjacentHTML('beforeend', selectButtonTemplate(buttonTextList))
    this.saveNumberButtonList();
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
  bindEvents(){
    this.inputEl.addEventListener('keydown', e=>this.handleInputSelected(e))
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
  getCanBuyList(money){
    const eachSnacks = getElAll(`[data-id]`, this.snackListEl);
    return [...eachSnacks].filter(({dataset})=>dataset.price<=money)
  }
  updateCanBuyList(money){
    const lastDisplayList = getElAll('.red')
    const canNotBuyList = [...lastDisplayList].filter(snackEl=>snackEl.dataset.price>money)
    removeClassToList(canNotBuyList,'red')
  }
  displayCanBuyList(money){
    const canBuyList = this.getCanBuyList(money);
    addClassToList(canBuyList,'red')
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
      this.clearSelectedInfo()
      return this.updateLogView(null, 'notifyHasNoMoney')
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
  handleSelectButtonClicked({target}){
    if(target.className!=="select-button") return ;
    if(target.id==='choose') return this.handleChoseBtnClicked()
    if(target.id==='cancel') return this.handleCancelButtonClicked()
    return this.handleNumberBtnClicked(target)
  }
  handleNumberBtnClicked(buttonEl){
    // numberBtn Clicked
    const buttonText = buttonEl.innerText 
    this.updateNumberBtnText(buttonText)
    this.emit('clearTimeInfo')
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
    clearText(this.displayLogEl);
    if(type==="selected"){
      this.emit('notifySecondOrder', {logType: 'notifySecondOrder'})
      this.startTimer(this.addOrderTime, 'returnMoney')
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



