import MenuView from '../js/MenuView.js'
import { templateItemList } from '../js/Template.js'

document.body.insertAdjacentHTML('beforeend', '<div class=beverage-menu><ul></ul></div>');

describe('MenuView TEST', () => {
  //given
  const itemData = [{ id: 1, name: "콜라", price: 500 }, { id: 2, name: "사이다", price: 1000 }]
  const itemList = templateItemList(itemData);
  const menuView = new MenuView(itemList);

  test('아이템리스트가 제대로 렌더링 됐는지 확인한다.', () => {
    //when
    const itemListLength = document.querySelectorAll('.items-box').length
    //then
    expect(2).toBe(itemListLength);
  })

  test('자판기에 넣은 금액이 콜라의 가격 500원보다 높을 때 highlight되는지 확인한다.', () => {
    //when
    menuView.highlightMenu(700);
    const checkClassName = menuView.items[0].firstElementChild.classList.contains('highlight');
    //then
    expect(true).toBe(checkClassName);
  })
  test('자판기에 넣은 금액이 콜라의 가격 500원보다 낮을 때 highlight클래스가 제거되는 것을 확인한다.', () => {
    //when
    menuView.highlightMenu(300);
    const firstItemClassName = menuView.items[0].firstElementChild.classList.contains('highlight');
    //then
    expect(true).not.toBe(firstItemClassName);
  })
})