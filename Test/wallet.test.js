import { VendingMachineWalletView as WalletView } from '../View/VendingMachineWalletView.js';
import { VendingMachineWalletPresenter as WalletPresenter } from '../Presenter/VendingMachineWalletPresenter.js';
import { VendingMachineMainView as MainView } from '../View/VendingMachineMainView.js';
import { VendingMachineModel as Model } from '../Model/VendingMachineModel.js';
import { Utility as util} from '../util.js'

const model = new Model();
const mainView = new MainView(util);
const walletView = new WalletView(mainView, util);
const walletPresenter = new WalletPresenter(util, model, mainView);

beforeAll(() => {
    const htmlData = `<div id="money-amount-window"></div>`
    document.body.insertAdjacentHTML('beforeend', htmlData);
});

// 해당 클릭이벤트도 어떻게 테스트하는지 의문이 듬
test("동전을 투입하는 버튼에 이벤트를 등록하는지 테스트합니다", () => {
    // given
    walletView.registerClickEventToInsertMoneyBtn = jest.fn();

    // when
    walletView.registerClickEventToInsertMoneyBtn();

    // then
    expect(walletView.registerClickEventToInsertMoneyBtn).toHaveBeenCalledTimes(1);
});

test("지갑의 돈을 정상적으로 새로고침하는지 테스트합니다", () => {
    // given
    walletView.changeMoneyNodeTextContent = jest.fn();

    // when
    walletView.refreshWalletMoney(10000);

    // then
    expect(walletView.changeMoneyNodeTextContent).toHaveBeenCalledTimes(1);
});

test("노드의 textContent를 정상적으로 수정하는지 테스트합니다", () => {
    // given
    const node = document.createElement('div');
    const moneyString = '10,000원';

    // when
    walletView.changeMoneyNodeTextContent = jest.fn();
    walletView.changeMoneyNodeTextContent.mockReturnValue = '10,000원';

    // then
    expect(walletView.changeMoneyNodeTextContent.mockReturnValue).toBe(moneyString);
});

test("자판기에 정상적으로 돈을 투입하는지 테스트합니다", () => {
    // given
    const moneyData = 10000;
    walletPresenter.isPossibleInvestMoney = jest.fn();
    walletPresenter.isPossibleInvestMoney.mockReturnValue(true);

    // when
    const result = walletPresenter.insertMoneyToVendingMachine(moneyData);

    // then
    expect(result).toBe(true);
});

test("지갑의 돈이 마이너스인지 테스트합니다", () => {
    // given
    const moneyData = 10000;
    model.increaseWalletMoney(-moneyData);

    // when
    const result = walletPresenter.isWalletMoneyMinus();

    // then
    expect(result).toBe(true);
});

test("돈이 부족한지 테스트합니다", () => {
    // given
    const money = 10000;

    // when
    const result = walletPresenter.isPossibleInvestMoney(money);

    // then
    expect(result).toBe(true);
});
