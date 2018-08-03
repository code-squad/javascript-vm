class SelectItemView{
    constructor(){
        this.itemId = "";
        this.showNoItemHandler = null;
        this.selectItemHandler = null;
        this.clickItemIdBtn();
    }
    clickItemIdBtn(){
        const itemIdBtn = document.querySelector('.select-button-part > ul');
        let setTimeoutId = 0;
        itemIdBtn.addEventListener('click', ({target})=>{            
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
            this.showNoItemHandler();
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