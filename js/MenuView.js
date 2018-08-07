/*
    자판기 menu들의 view를 담당하고 있는 클래스!
*/

class MenuView{
    constructor(){
        this.inputMoney = null;
        this.items = Array.from(document.querySelectorAll('.items-box'));
    }
    highlightMenu(){
        this.items.forEach( v=> {
            const firstElementChild = v.firstElementChild;
            if(v.dataset.price <= this.inputMoney){
                firstElementChild.classList.add("highlight");
                firstElementChild.nextElementSibling.classList.add("highlight");
            }else{
                firstElementChild.classList.remove("highlight");
                firstElementChild.nextElementSibling.classList.remove("highlight");               
            }
        })
    }
}