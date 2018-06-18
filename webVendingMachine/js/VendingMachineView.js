import {getEl, getElAll, updateText, addClassToList, removeClassToList, clearText} from './utils.js';
import {snackTemplate, selectButtonTemplate, walletMoneyButtonTemplate} from './template.js'
import {buttonTextList} from './assets.js';

export class VendingMachineView {
  constructor(){
    this.selectButtonText=""
    this.timerId = null;
    this.defaultTime = 5;
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
    this.reStartAutoClear();
  }
  reStartAutoClear(){
    this.emit('clearAutoClear')
    this.startAutoClearLog(this.clearTime);
  }
  displaySelectedButtonNumber(selectedText){
    this.displayLogEl.innerHTML = `<p class="selected-button-info">${selectedText} 번</p>`;
  }
  handleChoseBtnClicked(){
    const choseText = this.NumberToselectButtonText()
    this.clearInfo();
    if (choseText==="") this.updateLogView(null,'notifyNoneSelect')
    else this.emit('selectSnack', choseText)
   
  }
  updateNumberBtnText(buttonText){
    this.selectButtonText+=buttonText
    if(this.selectButtonText.length>2){ 
      this.selectButtonText = this.selectButtonText.substr(-2)
    }
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
    this.clearTimeInfo();
    this.startTimer(this.defaultTime)
    // BtnTextUpdate
    this.updateLogView(this.selectButtonText, 'nowSelectedNumber')
  }
  updateViewVendingMachineMoney(money){
   updateText(this.insertedMoneyEl, `${money}`)
  }
  NumberToselectButtonText(){
    return Number(this.selectButtonText)
  }
  clearInfo(){
    this.clearSelectedInfo();
    this.clearTimeInfo();
  }
  clearSelectedInfo(){
    this.selectButtonText = "";
  }
  clearTimeInfo(){
    clearTimeout(this.timerId);
    this.timerId = null;
    this.clearTimer();
  }
  startTimer(time, type = null){
    let initTime = time;
    this.timer.innerText = initTime;
    // setTimeOut 재귀 가능 !
    this.timerId = setInterval(()=>{
      if(initTime===0){
        if(type==="returnMoney") this.emit('returnMoney')
        else this.emit('selectSnack', this.NumberToselectButtonText())
        return this.clearInfo();
      } 
        initTime-=1
        this.timer.innerText = initTime; 
      },1000)
  }
  updateLogView(updatedLogData, templateType){
    const logtemplate = {
      nowSelectedNumber: (nowSelectedNumber)=> `<p class="selected-one">${nowSelectedNumber}</p>`,
      displaySelectedOne: (selectedOne)=>`<p class="selected-one">${selectedOne.name} 가 나왔습니다</p>` ,
      notifyCanNotBuy: ({money})=>`<p class="notify">${money} 원으로 살 수 없는 스낵입니다</p>`,
      notifyChoseWrongNumber: ({id})=>`<p class="notify">${id}는 선택할 수 없는 번호입니다.</p>`,
      notifyBreakdown: ({id})=>`<p class="notify">죄송합니다 ${id}는 고장으로 선택할 수 없습니다</p>`,
      notifyNoneSelect: ()=>`<p class="notify">선택하기 전에 <br>선택할 번호를 입력해주세요</p>`,
      notifySecondOrder: ()=>`<p class="notify">추가 선택이 3초 동안 안 이뤄질 시<br>입력한 돈을 반환 합니다</p>`,
      notifyReturnMoney: ({money})=>`<p class="notify">${money} 이 반환 되었습니다</p>`
    }
    this.displayLogEl.innerHTML = logtemplate[templateType](updatedLogData);
    
    // this.clearTimer();
    // const type = templateType==='displaySelectedOne' ? 'selected' :null
    // const clearTime = templateType==='notifySecondOrder' ? this.addOrderTime*1000 : this.clearTime
    // this.startAutoClearLog(clearTime, type);
  }
  notifyNumberButtonBlocked(){
    this.changeStyleselectedLog();
    this.displayLogEl.insertAdjacentHTML(
      'beforeend', 
      '<p class="notify blocked">세 자리수 이상 선택 못 합니다.<br> 재입력을 하시려면 취소버튼을 누르고 입력하십시오</p>'
    ); 
  }
  changeStyleselectedLog(){
    const selectedLog = getEl('.selected-button-info', this.displayLogEl)
    selectedLog.classList.add('with-notify')
  }
  handleCancelButtonClicked(){
    this.clearLog();
    this.clearTimer();
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



