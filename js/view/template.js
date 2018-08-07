const Temp = {
  itemListTemp(itemList) {
    let itemListString = itemList.reduce((acc, ele, idx) => {
      acc +=
        `<li class="item">
      <div class="item_container">
      <div class="item_name">${ele.name}</div>
      <div data-price=${ele.price} data-number=${idx + 1} class="item_price">${idx + 1}. ${ele.price}</div>
      </div>
      </li>`;
      return acc;
    }, '');
    return itemListString;
  },

  moneyListTemp(moneyList) {
    const moneyUnitList = Object.keys(moneyList);
    const moneyNumberList = Object.values(moneyList);
    const moneyListString = moneyUnitList.reduce((acc, ele, idx) => {
      acc +=
        `<li class= "money_item">
        <div class="money_container">
          <span class="money" data-money="${ele}">${Util.numberWithCommas(ele)}원</span>
          <span class="number_of_money">${moneyNumberList[idx]}개</span>
        </div>
      </li>
      `
      return acc;
    }, '');
    return moneyListString;
  },

  itemImageTemp(imageName) {
    const itemImageString =
      `<li>
    <img class = "item_image" alt="No Image" src="js/model/images/${imageName}">
    </li>`;
    return itemImageString;
  },

  selectedItemLog(number, itemName) {
    const selectedItemLogString = `<li class="log_item">
              <span>${number}번 ${itemName}가 선택됨</span>
            </li>`;
    return selectedItemLogString;
  },

  insertMoneyLog(money) {
    const insertMoneyLogString = `<li class="log_item">
              <span>${Util.numberWithCommas(money)}원이 투입됐습니다</span>
            </li>`;
    return insertMoneyLogString;
  }
}