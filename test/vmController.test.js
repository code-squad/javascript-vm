import VendingMachine from '../js/controller/vmController.js';
import MachineView from '../js/view/machineView.js';
import WalletView from '../js/view/walletView.js';
import MachineModel from '../js/model/machineModel.js';
import { WalletModel } from '../js/model/walletModel.js';
import { money } from '../js/model/money.js';
import { item } from '../js/model/item.js';
import { Temp } from '../js/view/template.js';
import { basicTemp } from '../test/testTemplate.js';

const walletView = new WalletView(Temp);
const machineView = new MachineView(Temp);
const walletModel = new WalletModel(money);
const machineModel = new MachineModel(item);

const vm = new VendingMachine(machineModel, walletModel, machineView, walletView);

describe('vmController TEST', () => {
  beforeEach(() => {
    vm.initializeConnection();
    document.body.innerHTML += basicTemp;
    walletModel.money = { 500: 3, 1000: 2, 5000: 0 };
    walletView.renderWallet(walletModel.getMoneyList(), walletModel.getFullAmount());
    machineView.initializeView(item);
    jest.useFakeTimers();
    walletView.alertNoMoneyUnit = jest.fn();
  });

  describe('컨트롤러가 초기화된다', () => {
    test('binding이 모두 이루어졌다', () => {

      expect(walletView.clickMoneyButtonHandler).not.toBeNull();
      expect(walletModel.notifyChangedMoney).not.toBeNull();
      expect(machineView.clickItemNumberButton).not.toBeNull();
      expect(machineModel.notifyReceiveMoney).not.toBeNull();
    });
  });

  describe('돈 버튼을 클릭해서 자판기에 돈을 투입한다', () => {
    test('잔돈 반환 타이머가 작동중이었다면 그것을 제거한다', () => {
      vm.clickMoneyButtonHandler(1000);

      expect(clearTimeout).toHaveBeenCalledTimes(1);
    });

    test('선택한 지폐의 개수가 부족하면 alert창을 출력한다', () => {
      vm.clickMoneyButtonHandler(5000);

      expect(walletView.alertNoMoneyUnit).toBeCalled();
    });
  });

  describe('상품 번호를 클릭하여 상품을 선택한다', () => {
    describe('한 자리수 번호 상품을 선택한다', () => {
      beforeEach(() => {
        vm.initItemNumberCounting();
      });

      test('상품 번호를 클릭한 순간 상품 반환 타이머가 작동된다', () => {
        const button1 = document.querySelector('[data-select="1"]');
        vm.clickItemNumberButton(button1);

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(vm.setTimeoutItemNumber.number).toBe('1');
      });

    })
    describe('두 자리수 번호 상품을 선택한다', () => {
      beforeEach(() => {
        vm.initItemNumberCounting();
        const button1 = document.querySelector('[data-select="1"]');
        const button2 = document.querySelector('[data-select="2"]');

        vm.clickItemNumberButton(button1);
        vm.clickItemNumberButton(button2);
      })
      test('상품번호를 두 자리로 클릭하면 값이 합산된다', () => {

        expect(vm.setTimeoutItemNumber.number).toBe('12');
      });

      test('상품 번호 측정 중에 번호를 다시 클릭하면 타이머가 리셋된다', () => {
        const button1 = document.querySelector('[data-select="1"]');
        const button2 = document.querySelector('[data-select="2"]');

        vm.clickItemNumberButton(button1);
        const firstSetTimeout = vm.setTimeoutItemNumber.current;
        vm.clickItemNumberButton(button2);
        const secondSetTimeout = vm.setTimeoutItemNumber.current;

        expect(firstSetTimeout).not.toBe(secondSetTimeout);
      });
    });
  });
  describe('선택한 상품을 받는다', () => {
    beforeEach(() => {
      vm.selectItemHandler(1);
    });

    test('선택한 아이템 이미지가 출력된다', () => {
      const imageULNode = document.querySelector('.image_list');
      expect(imageULNode.firstElementChild.innerHTML).toContain("js/model/images/coke.png");
      expect(imageULNode.childElementCount).toBe(1);
    })

    test('상품이 나오면 잔돈 반환 타이머가 시작된다', () => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
    });
  });
});