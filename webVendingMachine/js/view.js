class VendingMachineView {
  constructor(){
    this.snackListEl = this.getSearched('.snack-list')
    this.selectButtonsEl = this.getSearched('.number-buttons')
    this.moneyButtonListEl = this.getSearched('.money-button-list')
    this.myTotalMoneyEl = this.getSearched('.total-my-assets .money')
    this.insertedMoneyEl = this.getSearched('.diplay-inserted-money .money')
    this.displayLogEl = this.getSearched('.display-log-box')
    this.timer = this.getSearched('.time')
    this.controller = null;
    this.actions = {
      'insertMoney': (data)=> `<p class="log">${data}원이 입력되었습니다</p>`,
      'selected': (data)=> `<p class="selected-text">${data} 번</p>`,
    }
  }
  getSearched(selector, target=document){
    return target.querySelector(selector);
  }
  getSearchedAll(selector, target=document){
    return target.querySelectorAll(selector);
  }
  updateText(el,updateText){
    return el.innerText = updateText;
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
  }
  handleMoneyButtonClicked({target}){
    if(!target.localName==="button") return;
    const moneyCountEl = target.nextElementSibling
    const moneyCount =  Number(moneyCountEl.dataset.count)
    if(!moneyCount) return;
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
    const eachSnacks = this.getSearchedAll(`[data-id]`, this.snackListEl);
    return Array.prototype.filter.call(eachSnacks,(snackEl)=>{
      const price = snackEl.dataset.price
      if(price<=money) return snackEl;
    })
  }
  addClassElList(list, className){
    list.forEach(el=> el.classList.add(className))
  }
  displayCanBuyList(money){
    const canBuyList = this.getCanBuyList(money);
    this.addClassElList(canBuyList, 'red')
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
    this.displayLogEl.innerHTML = `<p class="selected-button-info">${selectedText}</p>`;
  }
  handleSelectButtonClicked(e){
    const buttonText = e.target.innerText 
    if(buttonText==='선택') return this.emit('selectSnack')
    if(buttonText==='취소') return this.emit('handleCancelButtonClicked')
    this.emit('handleSelectButtonClicked',buttonText)
  }
  reRenderVendingMachineMoney(money){
   this.updateText(this.insertedMoneyEl, `${money}`)
  }
  reRenderWallet(data){
    this.updateText(data.moneyCountEl, `${data.moneyCount}개`);
    data.moneyCountEl.setAttribute('data-count',data.moneyCount);
    this.updateText(data.totalMoneyEl, data.totalMoney);
  }
  startTimer(time){
    let initTime = time;
    this.timer.innerText = initTime;
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
  displaySelectedOne(selectedOne){
    this.displayLogEl.innerHTML = `<p class="selected-one">${selectedOne.name} 가 나왔습니다</p>`;
    this.clearTimer();
  }
  notifyCanBuy(money){
    this.displayLogEl.innerHTML = `<p class="notify">${money} 원으로 살 수 없는 스낵입니다</p>`;
    this.clearTimer();
  }
  handleCancelButtonClicked(){
    this.displayLogEl.innerHTML = ``;
    this.clearTimer();
  }
  clearTimer(){
    this.timer.innerHTML = '';
  }
}