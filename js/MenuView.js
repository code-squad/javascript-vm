/*
    자판기 menu들의 view를 담당하고 있는 클래스!
*/

export default class MenuView {
  constructor(itemList) {
    this.itemList = itemList;
    this.displayItemList();
    this.items = Array.from(document.querySelectorAll('.items-box'));
  }
  displayItemList() {
    const itemListElement = document.querySelector(".beverage-menu > ul");
    itemListElement.insertAdjacentHTML("beforeend", this.itemList);
  }
  highlightMenu(inputMoney) {
    this.items.forEach(v => {
      const firstElementChild = v.firstElementChild;
      if (v.dataset.price <= inputMoney) {
        firstElementChild.classList.add("highlight");
        firstElementChild.nextElementSibling.classList.add("highlight");
      } else {
        firstElementChild.classList.remove("highlight");
        firstElementChild.nextElementSibling.classList.remove("highlight");
      }
    })
  }
}