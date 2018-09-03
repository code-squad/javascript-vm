import { WalletModel } from '../js/model/walletModel.js';


describe('WalletModel Test', () => {
    let testMoneyData = { 10: 3, 50: 2, 100: 5, 500: 15, 1000: 10, 5000: 2, 10000: 5 };
    let walletModel = new WalletModel(testMoneyData);


    describe('MoneyData를 넣어서 지갑을 초기화 한다', () => {
        test('지갑의 금액을 올바르게 반환한다', () => {
            const expected = { 10: 3, 50: 2, 100: 5, 500: 15, 1000: 10, 5000: 2, 10000: 5 };
            expect(walletModel.getMoneyList()).toEqual(expected);
        });

        test('지갑의 총액을 반환한다', () => {
            const expected = 78130;
            expect(walletModel.getFullAmount()).toBe(expected);
        });

        test('지갑의 총액을 계산해서 반환한다', () => {
            const expected = 78130;
            expect(expected).toBe(walletModel.calculateFullAmount(testMoneyData));
        });
    });

    describe('500원을 선택해 자판기에 넣음', () => {
        let testMoneyData = { 10: 3, 50: 2, 100: 5, 500: 15, 1000: 10, 5000: 2, 10000: 5 };
        const walletModel = new WalletModel(testMoneyData);
        const testMoney = '500';
        walletModel.notifyChangedMoney = jest.fn();
        walletModel.decreaseMoney(testMoney);

        test('지갑의 500원의 개수 감소', () => {
            const expected = 14;
            expect(walletModel.getMoneyList()[testMoney]).toBe(expected);
        });

        test('지갑의 총액 감소', () => {
            const expected = 77630
            expect(walletModel.getFullAmount()).toBe(expected);
        });

        test('500원을 넣어서 지갑의 변화를 알리는 notifyChangeMoney가 호출됨', () => {
            expect(walletModel.notifyChangedMoney.mock.calls.length).toBe(1);
            expect(walletModel.notifyChangedMoney.mock.calls[0][0]).toEqual(["500"]);
        });
    })
});