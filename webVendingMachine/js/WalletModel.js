export function WalletModel(myMoney) {
  this.myMoney=myMoney;
  this.controller = null;
  this.totalMoney = Object.keys(this.myMoney).reduce((ac,money)=> {
    return ac+=Number(money)*this.myMoney[money]
  },0)
}
WalletModel.prototype = {
getTotalMoney(){
  return this.totalMoney = Object.keys(this.myMoney).reduce((ac,money)=> {
    return ac+=Number(money)*this.myMoney[money]
  },0)
},
useMoney(money){
  if(this.myMoney[money]){
    this.myMoney[money]-=1;
    this.emit('insertMoney',money)
  }
},
emit(eventName, data){
  this.controller.on(eventName, data);
}
}