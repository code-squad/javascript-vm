/*
    자판기 menu들의 view를 담당하고 있는 클래스!
*/

class MenuView{
    constructor(itemList){
        this.itemList = itemList;
        this.addList();
        this.inputMoney = null;
        this.items = Array.from(document.querySelectorAll('.items-box'));
    }
    addList(){
        const itemListElement = document.querySelector(".beverage-menu > ul");
        itemListElement.insertAdjacentHTML("beforebegin",this.itemList);
    }
    highlightMenu(){
        this.items.forEach( v=> {
            if(v.dataset.price <= this.inputMoney){
                v.firstElementChild.classList.add("highlight");
                v.firstElementChild.nextElementSibling.classList.add("highlight");
            }else{
                v.firstElementChild.classList.remove("highlight");
                v.firstElementChild.nextElementSibling.classList.remove("highlight");               
            }
        })
    }
}