import {gs, ut} from './utils.js';
import { walletMoneyButtonTemplate } from './template.js'

export class WalletView {
  constructor(){
    this.moneyButtonListEl = gs('.money-button-list')
    this.myTotalMoneyEl = gs('.total-my-assets .money')
    this.controller = null;
    this.bindEvent()
  }
  initRender(myMoney, toatlMoney){
    this.moneyButtonListEl.insertAdjacentHTML('beforeend', walletMoneyButtonTemplate(myMoney))
    this.myTotalMoneyEl.innerText = toatlMoney   
  }
  bindEvent(){
    this.moneyButtonListEl.addEventListener('click', e =>this.handleMoneyButtonClicked(e));
  }
  handleMoneyButtonClicked({target}){
    if(target.className!=="money-button") return;
    const moneyCountEl = target.nextElementSibling
    const moneyCount =  Number(moneyCountEl.dataset.count)
    if(!moneyCount) return;
    this.emit('clearSelectedInfo')
    const money = Number(target.dataset.money)
    this.handleMoneyBtnUpdate(moneyCountEl, money)
  }
  handleMoneyBtnUpdate(moneyCountEl, money){
    this.updateMoneyCount(moneyCountEl)
    this.updateTotalMoney(money)
    this.emit('useMoney', money)
  }
  updateMoneyCount(el){
    el.dataset.count-=1
    ut(el, `${el.dataset.count}개`);
  }
  updateTotalMoney(money){
    const totalMoney = Number(this.myTotalMoneyEl.innerText)
    ut(this.myTotalMoneyEl, totalMoney-money)
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
}