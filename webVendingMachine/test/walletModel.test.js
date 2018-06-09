const { WalletModel }= require('../js/models.js')
const {myMoney} = require('../js/assets');


describe('walletModel Test', () => {
  let wallet;
  beforeEach(()=>{
    wallet = new WalletModel(myMoney)
    wallet.controller = {}
    wallet.controller.on = (evtName, data)=> {evtName, data} 
  })
  test('wallet getTotalMoney는 myMoney 총 합과 같아야 한다', () => {
    const totalMoney = Object.keys(myMoney).reduce((ac,c)=>{
      return ac+=c*myMoney[c]
    },0)
    expect(wallet.totalMoney).toBe(totalMoney)
    });
  test('wallet useMoney 사용한 돈 만큼 totalMoney가 변하는지 테스트', () => {
    const initialMoney = wallet.totalMoney
    const usedMoney = 1000;
    wallet.useMoney(usedMoney)
    wallet.getTotalMoney()
    expect(wallet.totalMoney).toBe(initialMoney-usedMoney)
    });
  test('wallet useMoney 사용하면 emit을 발생시키는지 테스트 ', () => {
    const usedMoney = 1000;
    wallet.emit = jest.fn();
    wallet.useMoney(usedMoney)
    const useMoneyInfo = {
      totalMoney: wallet.getTotalMoney(),
      moneyCount: wallet.myMoney[usedMoney],
    }
    expect(wallet.emit).toHaveBeenCalledWith('reRenderWallet',useMoneyInfo)
    });
});


