import { WalletModel } from'../js/WalletModel.js';
import { myMoney } from '../js/assets';


describe('walletModel Test', () => {
  let wallet;
  beforeEach(()=>{
    wallet = new WalletModel(myMoney)
    wallet.controller = {}
    wallet.controller.on = (evtName, data)=> {evtName, data} 
  })
  test('init test wallet getTotalMoney는 myMoney 총 합과 같아야 한다', () => {
    const totalMoney = Object.keys(myMoney).reduce((ac,c)=>{
      return ac+=c*myMoney[c]
    },0)
    expect(wallet.totalMoney).toBe(totalMoney)
    });
  test('wallet useMoney 사용한 돈 만큼 totalMoney가 변하는지 테스트', () => {
    //given
    const initialMoney = wallet.totalMoney
    const usedMoney = 1000
    const initialCount = wallet.myMoney[usedMoney]
    //when
    wallet.useMoney(usedMoney)
    const nowCount = wallet.myMoney[usedMoney]
    //then
    expect(nowCount).toBe(initialCount-1)
    });
    test('wallet useMoney 사용하면 vendingMachine에 insertMoney를 보내는지 테스트', () => {
      // given
      wallet.emit = jest.fn();
      const usedMoney = 5000
      // when
      wallet.useMoney(usedMoney)
      // then
      expect(wallet.emit).toHaveBeenCalledWith('insertMoney',usedMoney)
      });
});


