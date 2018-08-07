function displayItemList(){
    const itemList = templateItemList(itemData);
    const itemListElement = document.querySelector(".beverage-menu > ul");
    itemListElement.insertAdjacentHTML("beforebegin",itemList);
}