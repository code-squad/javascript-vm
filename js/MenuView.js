/*
    자판기 menu들의 view를 담당하고 있는 클래스!
*/

class MenuView{
    constructor(itemList){
        this.itemList = itemList;
        this.addList();
    }
    addList(){
        const itemListElement = document.querySelector(".beverage-menu > ul");
        itemListElement.insertAdjacentHTML("beforebegin",this.itemList);
    }
}