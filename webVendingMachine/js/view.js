class VendingMachineView {
  constructor(){
    this.snackListEl = getSearched('.snack-list')
    this.selectButtonsEl = getSearched('.number-buttons')
    this.moneyButtonListEl = getSearched('.money-button-list')
    this.myTotalMoneyEl = getSearched('.total-my-assets .money')
    this.insertedMoneyEl = getSearched('.diplay-inserted-money .money')
    this.displayLogEl = getSearched('.display-log-box')
    this.timer = getSearched('.time')
    this.controller = null;
    this.actions = {
      'insertMoney': (data)=> `<p class="log">${data}원이 입력되었습니다</p>`,
    }
    this.numberButtonListEL = null;
    this.clearTime = 2000;
  }
  getMessageByType(type, data){
    return this.actions[type](data)
  }
  initRender(template, data){
    const {snackTemplate, selectButtonTemplate, walletMoneyButtonTemplate} = template
    const {snackList, buttonTextList, myMoney} = data
    this.snackListEl.insertAdjacentHTML('beforeend', snackTemplate(snackList))
    this.selectButtonsEl.insertAdjacentHTML('beforeend', selectButtonTemplate(buttonTextList))
    this.moneyButtonListEl.insertAdjacentHTML('beforeend', walletMoneyButtonTemplate(myMoney))
    this.myTotalMoneyEl.innerText = Object.keys(myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*myMoney[money]
    },0)
   this.saveNumberButtonList();
  }
  handleMoneyButtonClicked({target}){
    if(target.className!=="money-button") return;
    const moneyCountEl = target.nextElementSibling
    const moneyCount =  Number(moneyCountEl.dataset.count)
    if(!moneyCount) return;
    this.emit('clearSelectedInfo')
    const eventData = {
      money: target.dataset.money,
      moneyCountEl,
      totalMoneyEl: this.myTotalMoneyEl,
      insertedMoneyEl: this.insertedMoneyEl,
    };
    this.emit('useMoney', eventData)
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
  bindEvents(){
    this.selectButtonsEl.addEventListener('click', e =>this.handleSelectButtonClicked(e));
    this.moneyButtonListEl.addEventListener('click', e =>this.handleMoneyButtonClicked(e));
    return this;
  }
  getCanBuyList(money){
    const eachSnacks = getSearchedAll(`[data-id]`, this.snackListEl);
    return [...eachSnacks].filter(({dataset})=>dataset.price<=money)
  }
  updateCanBuyList(money){
    const lastDisplayList = getSearchedAll('.red')
    const canNotBuyList = [...lastDisplayList].filter(snackEl=>snackEl.dataset.price>money)
    removeClassElList(canNotBuyList,'red')
  }
  displayCanBuyList(money){
    const canBuyList = this.getCanBuyList(money);
    addClassElList(canBuyList,'red')
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
  }
  displaySelectedButtonNumber(selectedText){
    this.displayLogEl.innerHTML = `<p class="selected-button-info">${selectedText} 번</p>`;
  }
  handleSelectButtonClicked(e){
    this.emit('clearAutoClear')
    const selectButton= e.target
    if(selectButton.id==='chose') return this.emit('selectSnack')
    if(selectButton.id==='cancel') return this.emit('handleCancelButtonClicked')
    this.emit('handleSelectNumberButtonClicked',selectButton.innerText)
  }
  reRenderVendingMachineMoney(money){
   updateText(this.insertedMoneyEl, `${money}`)
  }
  reRenderWallet(data){
    updateText(data.moneyCountEl, `${data.moneyCount}개`);
    data.moneyCountEl.setAttribute('data-count',data.moneyCount);
    updateText(data.totalMoneyEl, data.totalMoney);
  }
  startTimer(time){
    let initTime = time;
    this.timer.innerText = initTime;
    // setTimeOut 재귀 가능 !
    const intervalId = setInterval(()=>{
      if(initTime===0){
        this.emit('selectSnack')
        return clearTimeout(intervalId);
      } 
        initTime-=1
        this.timer.innerText = initTime; 
      },1000)
    this.emit('updateTimerInfo', intervalId)
  }
  updateLogView(updatedLogData, templateType){
    const logtemplate = {
      displaySelectedOne: (selectedOne)=>`<p class="selected-one">${selectedOne.name} 가 나왔습니다</p>` ,
      notifyCanNotBuy: (money)=>`<p class="notify">${money} 원으로 살 수 없는 스낵입니다</p>`,
      notifyChoseWrongNumber: (wrongNumber)=>`<p class="notify">${wrongNumber}는 선택할 수 없는 번호입니다.</p>`,
      notifyBreakdown: (breakId)=>`<p class="notify">죄송합니다 ${breakId}는 고장으로 선택할 수 없습니다</p>`
    }
    this.displayLogEl.innerHTML = logtemplate[templateType](updatedLogData);
    this.clearTimer();
    this.startAutoClearLog(this.clearTime);
  }
  notifyNumberButtonBlocked(){
    this.changeStyleselectedLog();
    this.displayLogEl.insertAdjacentHTML(
      'beforeend', 
      '<p class="notify blocked">세 자리수 이상 선택 못 합니다.<br> 재입력을 하시려면 취소버튼을 누르고 입력하십시오</p>'
    ); 
  }
  changeStyleselectedLog(){
    const selectedLog =getSearched('.selected-button-info', this.displayLogEl)
    selectedLog.classList.add('with-notify')
  }
  handleCancelButtonClicked(){
    this.clearLog();
    this.clearTimer();
    this.setNumberButtonDisable(false);
  }
  startAutoClearLog(clearTime = 1000){
    const autoClearId = setTimeout(this.clearLog.bind(this), clearTime);
    this.emit('sendAutoClearId', autoClearId)
  }
  clearLog(){
    return clearText(this.displayLogEl);
  }
  saveNumberButtonList(){
    const slectButtonList = getSearchedAll('button',this.selectButtonsEl)
    return this.numberButtonListEL = [...slectButtonList].filter(buttonEl=> !isNaN(buttonEl.innerText))
  }
  setNumberButtonDisable(disbaled){
    return [...this.numberButtonListEL].forEach(buttonEl=>buttonEl.disabled=disbaled)
  }
  clearTimer(){
    return clearText(this.timer)
  }
}