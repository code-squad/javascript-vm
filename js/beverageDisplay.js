class Display {
  constructor(beverage) {
    this.beverage = beverage;
  }
  displayBeverage() {
    const beverageList = document.createElement('ul');
    beverageList.className = 'beverageListContainer';
    document.querySelector('.beverageDisplay').appendChild(beverageList);
    this.beverage.forEach((ele, idx) => {
      let item = document.createElement('li');
      let list = beverageList.appendChild(item);
      const beverageContainer = document.createElement('div');
      beverageContainer.className = 'beverageContainer';
      list.appendChild(beverageContainer);
      let beverageName = document.createElement('div');
      beverageName.className = 'beverageName';
      let beveragePrice = document.createElement('div');
      beveragePrice.className = 'beveragePrice';
      beverageName.innerHTML = ele.name;
      beveragePrice.innerHTML = `${idx + 1}. ${ele.price}`;
      beverageContainer.appendChild(beverageName);
      beverageContainer.appendChild(beveragePrice);
    })
  }
}

const displayItem = new Display(beverage);
displayItem.displayBeverage();