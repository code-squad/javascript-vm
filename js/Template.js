function templateItemList(items){
    const itemList =  items.reduce((prev, item)=>{
        return prev + `<li data-name=${item.name} data-id=${item.id} data-price=${item.price} class = "items-box">
            <div class="item-name"><span class="center-alignment">${item.name}</span></div>
            <div class="item-data">${item.id}. ${item.price}</div>
        </li>`
    },"")
    return itemList;
}