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
            const firstChild = v.firstElementChild;
            if(v.dataset.price <= this.inputMoney){
                firstChild.classList.add("highlight");
                firstChild.nextElementSibling.classList.add("highlight");
            }else{
                firstChild.classList.remove("highlight");
                firstChild.nextElementSibling.classList.remove("highlight");               
            }
        })
    }
}