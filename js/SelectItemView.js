class SelectItemView{
    constructor(){
        this.items = document.querySelectorAll('.items-box');
        this.itemIdBtn = document.querySelector('.select-button-part > ul');
        this.itemId = "";
        this.setTimeoutId = 0;
        this.showNoItemHandler = null;
        this.selectItemHandler = null;
        this.clickItemIdBtn();
    }
    clickItemIdBtn(){
        this.itemIdBtn.addEventListener('click', ({target})=>{
            if(target.tagName !== "LI")return ;
            clearTimeout(this.setTimeoutId);
            this.combineItemId(target);
            this.setTimeoutId = setTimeout(()=>{
                if(this.lackItem())return ;
                const itemName = this.searchItem().itemName;
                const itemPrice = this.searchItem().itemPrice;
                this.selectItemHandler(this.itemId, itemName, itemPrice);
                this.resetItemId();
            },'3000');
        })
    }
    lackItem(){
        if(this.items.length < this.itemId){
            this.showNoItemHandler();
            this.resetItemId();
            return true;
        }
    }
    searchItem(){
        const item = this.items[this.itemId-1];
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