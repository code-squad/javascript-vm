class Display {
  constructor(beverage) {
    this.beverage = beverage;
  }
  createBeverageListContainer() {
    const beverageList = document.createElement('ul');
    beverageList.className = 'beverageListContainer';
    document.querySelector('.beverageDisplay').appendChild(beverageList);
  }
  createCoinButtontDiplay() {
    const coinButtonList = document.createElement('ul');
    coinButtonList.className = 'coinButtonListContainer';
    document.querySelector('.coinButtonContainer').appendChild(coinButtonList);
  }
  displayBeverage() {
    this.createBeverageListContainer();
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
  displayCoinButton() {
    this.createCoinButtontDiplay();
    let coinButtonHTML = '';
    for (let i = 1; i <= 10; i++) {
      coinButtonHTML +=
        `<li class="coinButtonItem">
          <div class="coinButton">${i === 10 ? 0 : i}</div>
        </li>
        `
    }
    document.querySelector('.coinButtonListContainer').innerHTML = coinButtonHTML;
  }
}

const vmDisplay = new Display(beverage);
vmDisplay.displayBeverage();
vmDisplay.displayCoinButton();