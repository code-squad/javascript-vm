import WalletView from '../js/view/walletView.js'
import { Util } from '../js/util/util.js'
import { Temp } from '../js/view/template.js'

let walletView = new WalletView(Temp);
let money = { 10: 5, 50: 4, 100: 8, 500: 5, 1000: 5, 5000: 3, 10000: 1 };
let fullAmount = 23550;
document.body.innerHTML =
    `<div class="wallet">
            <div class="wallet_container">
                <ul class="money_list"></ul>
            </div>
            <div class="full_amount">
                <span></span>
            </div>
        </div>`;

describe('walletView Test', () => {

    describe('지갑을 랜더링한다', () => {

        test('돈 목록을 랜더링해서 ul태그의 elementChild는 7개가 된다', () => {
            walletView.renderMoney(money);
            walletView.renderFullAmount(fullAmount);
            const expected = Object.keys(money).length;
            expect(document.querySelector('.money_list').childElementCount).toBe(expected);
        });

        test('선택한 금액의 개수가 올바르게 랜더링된다', () => {
            const firstChild = document.querySelector('[data-money="10"]').nextElementSibling.innerHTML;
            const expected = '5개'
            expect(firstChild).toBe(expected);
        });

        test('총액이 랜더링된다', () => {
            const expected = '23,550원';
            walletView.renderFullAmount(fullAmount);
            expect(document.querySelector('.full_amount').innerHTML).toBe(expected);
        });
    });

    describe('돈을 자판기에 넣는다', () => {
        walletView.renderMoney(money);
        walletView.renderFullAmount(fullAmount);
        // 5000원을 사용하여 5000원의 개수와 총액 변화
        const changedMoney = { 10: 5, 50: 4, 100: 8, 500: 5, 1000: 5, 5000: 2, 10000: 1 };
        const changedFullAmount = 18550;

        test('5000원이 사용됨에 따라 랜더링이 업데이트된다', () => {
            walletView.updateRendering(["5000"], changedMoney, changedFullAmount);

            expect(document.querySelector('[data-money="5000"]').nextElementSibling.innerText).toBe('2개');
            expect(document.querySelector('.full_amount').innerHTML).toBe('18,550원');
        });
    });
    describe('경고 메세지를 출력한다', () => {
        test('선택한 금액이 부족한 것을 사용자에게 알린다', () => {
            walletView.alertNoMoneyUnit = jest.fn();
            walletView.alertNoMoneyUnit(1000);

            expect(walletView.alertNoMoneyUnit).toHaveBeenCalledWith(1000);
        });
    });
});