import MachineModel from '../js/model/machineModel.js';

const itemList = [{
  name: '콜라',
  price: 500,
  stock: 5,
  imageName: 'coke.png'
}, {
  name: '사이다',
  price: 1000,
  stock: 5,
  imageName: 'cider.png'
}, {
  name: '파인애플맛 환타',
  price: 400,
  stock: 5,
  imageName: 'fanta_pineapple.png'
}];

describe('MachineModel Test', () => {
  const machineModel = new MachineModel(itemList);
  describe('MachineModel을 초기화한다', () => {
    test('ItemList를 가져온다', () => {
      const expected = itemList;
      expect(machineModel.getItemList()).toEqual(expected);
    })

  })
})