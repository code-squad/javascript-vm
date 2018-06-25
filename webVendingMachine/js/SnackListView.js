import {getEl, getElAll, updateText, addClassToList, removeClassToList, clearText} from './utils.js';
import { snackTemplate } from './template.js'


export class SnackListView {
  constructor(){
    this.snackListEl = getEl('.snack-list')
    this.controller = null;
  }
  initRender(snackList){
    this.snackListEl.insertAdjacentHTML('beforeend', snackTemplate(snackList))
  }
  emit(eventName, data){
    this.controller.on(eventName, data);
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
}



