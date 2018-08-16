import { WalletModel } from '../js/model/walletModel.js';

let testMoneyData = { 10: 3, 50: 2, 100: 5, 500: 15, 1000: 10, 5000: 2, 10000: 5 };
let walletModel = new WalletModel(testMoneyData);

function initializeWalletModel() {
    testMoneyData = { 10: 3, 50: 2, 100: 5, 500: 15, 1000: 10, 5000: 2, 10000: 5 };
    walletModel = new WalletModel(testMoneyData);
    walletModel.notifyChangedMoney = jest.fn();
}

describe('지갑의 속성값을 가져온다', () => {
    test('전체 돈 객체', () => {
        expect(testMoneyData).toBe(walletModel.getMoneyList());
    });

    test('지갑의 총액', () => {
        expect(78130).toBe(walletModel.getFullAmount());
    });
});

describe('지갑의 private메소드 TEST', () => {
    test('지갑의 총액을 계산', () => {
        expect(78130).toBe(walletModel.calculateFullAmount(testMoneyData));
    });
})

describe('500원을 선택해 자판기에 넣음', () => {
    const testMoney = '500';
    beforeEach(() => {
        initializeWalletModel();
    });
    test('지갑의 500원의 개수 감소', () => {
        walletModel.decreaseMoney(testMoney);
        expect(14).toBe(walletModel.getMoneyList()[testMoney]);
    });

    test('지갑의 총액 감소', () => {
        walletModel.decreaseMoney(testMoney);
        expect(77630).toBe(walletModel.getFullAmount());
    });

    test('500원을 넣어서 지갑의 변화를 알리는 notifyChangeMoney가 호출됨', () => {
        walletModel.decreaseMoney(testMoney);
        expect(1).toBe(walletModel.notifyChangedMoney.mock.calls.length);
        expect(["500"]).toEqual(walletModel.notifyChangedMoney.mock.calls[0][0]);
    });
})

describe('자판기에서 반환되는 돈 6500원을 받음', () => {
    beforeEach(() => {
        initializeWalletModel();
    });

    test('6500원을 받아서 총액이 증가', () => {
        walletModel.receiveChange(6500);
        expect(78130 + 6500).toBe(walletModel.getFullAmount());
    });

    test('6500원을 반환 알고리즘에 의해 5000원 1개, 1000원 1개, 500원 1개를 지갑에 넣음', () => {
        // originalData = { 10: 3, 50: 2, 100: 5, 500: 15, 1000: 10, 5000: 2, 10000: 5 };
        const expectedMoneyData = { 10: 3, 50: 2, 100: 5, 500: 16, 1000: 11, 5000: 3, 10000: 5 };
        walletModel.receiveChange(6500);
        expect(expectedMoneyData).toEqual(walletModel.getMoneyList());
    })
})

describe('해당 지폐의 개수 반환', () => {
    beforeEach(() => {
        initializeWalletModel();
    });
    test('500원의 개수 반환', () => {
        expect(15).toBe(walletModel.hasMoney(500))
    })
})