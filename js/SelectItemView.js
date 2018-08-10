/*
    자판기에서 원하는 메뉴를 뽑기위한 버튼을 담당하는 view입니다.
    - 버튼을 클릭해서 메뉴를 고르게 되면 3초후에 선택한 메뉴가 나오게 됩니다.
*/
export default class SelectItemView{
    constructor(){
        this.itemId = "";
        this.lackItemHandler = null;
        this.selectItemHandler = null;
        this.stopReturnMoneyHandler = null;        
        this.clickItemIdBtn();
    }
    clickItemIdBtn(){
        const itemIdBtn = document.querySelector('.select-button-part > ul');
        let setTimeoutId = 0;
        itemIdBtn.addEventListener('click', ({target})=>{
            this.stopReturnMoneyHandler();
            if(target.tagName !== "LI")return ;
            clearTimeout(setTimeoutId);
            this.combineItemId(target);
            setTimeoutId = this.delaySelectItemHandler();
        })
    }
    delaySelectItemHandler(){
        const items = document.querySelectorAll('.items-box'); 
        const setTimeoutId = setTimeout(()=>{
            if(this.lackItem(items))return ;
            const itemName = this.searchItem(items).itemName;
            const itemPrice = this.searchItem(items).itemPrice;
            this.selectItemHandler(this.itemId, itemName, itemPrice);
            this.resetItemId();
        },'3000');
        return setTimeoutId;
    }
    lackItem(items){
        if(items.length < this.itemId){
            this.lackItemHandler();
            this.resetItemId();
            return true;
        }
    }
    searchItem(items){
        const item = items[this.itemId-1];
        const itemName = item.getAttribute('data-name');
        const itemPrice = item.getAttribute('data-price');
        return { itemName : itemName, itemPrice : itemPrice}
    }
    resetItemId(){
        this.itemId = "";
    }
    combineItemId(target){
        this.itemId += target.innerText;
    }
}