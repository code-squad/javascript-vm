class Display {
  constructor(beverage) {
    this.beverage = beverage;
  }
  createBeverageContainer() {
    const beverageList = document.createElement('ul');
    beverageList.className = 'beverageListContainer';
    document.querySelector('.beverageDisplay').appendChild(beverageList);
  }
  displayBeverage() {
    this.createBeverageContainer();
    let beverageListHTML = '';
    this.beverage.forEach((ele, idx) => {
      beverageListHTML +=
        `<li class="beverageItem">
        <div class="beverageContainer">
        <div class="beverageName">${ele.name}</div>
        <div class="beveragePrice">${idx+1}. ${ele.price}</div>
        </div>
        </li>`;
    })
    document.querySelector('.beverageListContainer').innerHTML = beverageListHTML;
  }
}

const displayBeverage = new Display(beverage);
displayBeverage.displayBeverage();