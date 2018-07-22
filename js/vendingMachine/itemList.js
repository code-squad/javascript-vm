/*
아이템들을 다루는 클래스
*/
class ItemList{
  constructor({itemList, template, itemData}){
    this.$itemList = itemList;
    this.oTemplate = template;
    this.items = this.$itemList.childNodes;
    this._render(itemData);
  }

  // @param {Array} itemData - array of objects
  _render(itemData){
    itemData.forEach((item, idx) => {
      item.number = idx + 1;
      this.$itemList.innerHTML += this.oTemplate.itemList(item);
    })
  }

  // @param {number} money
  highlight(money){
    this.items.forEach(item => {
      this._isAvailableItem(item, money) ? this._highlightItem(item) : this._deHighlightItem(item);
    })
  }

  // @param {Element} item
  // @param {number} money
  _isAvailableItem(item, money){
    return Number(item.dataset.price) <= money;
  }

  _highlightItem(item){
    item.querySelector('.item_name').classList.add('highlight');
  }

  _deHighlightItem(item){
    item.querySelector('.item_name').classList.remove('highlight');
  }

  // @param {number} number - Number(vendingMachine.selectedNumber)
  getItem(number){
    let item = this._getItemByNumber(this.items, number);
    
    return this._isValidItem(item) ? item : null;
  }

  // @param {NodeList} items
  // @param {number} number
  _getItemByNumber(items, number){
    return items[number-1];
  }

  _isValidItem(item){
    if(item && this._isHighlight(item)) return true;
    return false;
  }

  _isHighlight(item){
    return item.querySelector('.item_name').className.includes('highlight');
  }
}

export {ItemList};