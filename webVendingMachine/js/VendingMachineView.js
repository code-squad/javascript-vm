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
      this.selectButtonText = selectedSnackId
      this.handleChoseBtnClicked()      
      e.target.value = ''
      this.emit('clearAutoClear')
    }
  }

  // reRenderLog(latestHistorys){
  //   const latestMsgTemplate = this.makeLogTemplate(latestHistorys);
  //   this.displayLogEl.innerHTML = latestMsgTemplate;
  //   this.displayLogEl.lastElementChild.classList.add('now')
  //   this.startAutoClearLog()
  // }
  checkHasMoney(){
    return Number(this.insertedMoneyEl.innerText)
  }
  checkNoneSelected(){
    return this.selectButtonText===""
  }
  handleChoseBtnClicked(){
    if(!this.checkHasMoney()) return this.handleHasNoMoney()
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
    this.emit('clearAutoClear')
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
    this.setSelectTime()
  }
  setSelectTime(time=5){
    this.selectTime = time;
  }
  updateSelectTime(){
    this.timer.innerText = this.selectTime; 
    this.selectTime-=1    
  }
  handleSelectByTime(type){
    const second = 1000;
    this.updateSelectTime()
    this.timerId = setTimeout(()=>{
        if(this.selectTime>=0) this.handleSelectByTime(type)
        else if(type==="returnMoney") this.emit('returnMoney')
        else this.handleChoseBtnClicked()
      }, second)
     this.emit('sendTimerId', this.timerId)
  }
  startTimer(type = null){
    this.handleSelectByTime(type)
  }
  reStartTimer(){
    if(this.selectButtonText){
      this.clearSelectedInfo()
      this.startTimer()
    }
  }
  updateLogView(updatedLogData, templateType){
    this.displayLogEl.innerHTML = logtemplate[templateType](updatedLogData);
    this.startAutoClearLog(templateType)
  }
  startAutoClearLog(type){
    const autoClearTime = 2000
    const nextOrderTime = 3
    if(type==='nowSelectedNumber') return ;
    const autoClearId = setTimeout(()=> {
        if(type==="displaySelectedOne"){
          this.updateLogView(null,'notifySecondOrder')
          this.setSelectTime(nextOrderTime)
          this.handleSelectByTime("returnMoney")
        } 
        else if(type!=='notifySecondOrder'&& type!=='insertMoney') this.handleCancelButtonClicked()
      }, autoClearTime)
      this.emit('sendAutoClearId', autoClearId)
  }
  changeStyleselectedLog(){
    const selectedLog = getEl('.selected-button-info', this.displayLogEl)
    selectedLog.classList.add('with-notify')
  }
  handleCancelButtonClicked(){
    this.clearSelectedInfo()   
    this.clearLog();
  }
  clearLog(){
    clearText(this.displayLogEl);
  }
  saveNumberButtonList(){
    const slectButtonList = getElAll('button',this.selectButtonsEl)
    return this.numberButtonListEL = [...slectButtonList].filter(buttonEl=> !isNaN(buttonEl.innerText))
  }
  clearTimer(){
    return clearText(this.timer)
  }
}



