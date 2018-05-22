// template
const template = {
  snackTemplate: (snackList)=>{
    return snackList.reduce((ac,c)=>{
      return ac+=`<li data-id="${c.id}"
                      data-price="${c.price}" 
                      class="snack-list-item">
          <div class="snack-name-container">
              <span class="snak-name">${c.name}</span>
          </div>
          <div class="label-price">
              <span class="snack-number">${c.id}</span>
              <span class="snack-price">${c.price}</span>
          </div>
        </li>`
    },'')
  },
  selectButtonTemplate: (buttonTextList)=> {
    return buttonTextList.reduce((ac,c)=>{
      return ac+=` <li><button class="select-button">${c}</button></li>`
    }, '');
  },
  walletMoneyButtonTemplate: (moneyObj)=> {
    return  Object.keys(moneyObj).reduce((ac,moneyKind)=>{
      return ac+=`<li class="wallet-money-button">
                    <button data-money="${moneyKind}" data-unit="원">${moneyKind} 원</button>
                    <span class="money-count" data-count="${moneyObj[moneyKind]}">${moneyObj[moneyKind]}개</span>
                  </li>`
    },'')
  }
};

const vendingMachine = new VendingMachineModel(snackList);
const wallet = new WalletModel(myMoney);
const vendingMachineView = new VendingMachineView();
const vendingMachineController = new VmController(vendingMachine,wallet, vendingMachineView);

// bind Controller 
vendingMachine.controller = vendingMachineController;
wallet.controller = vendingMachineController;
vendingMachineView.controller = vendingMachineController;


/// domLoad

document.addEventListener("DOMContentLoaded", (e)=> {
  console.log("DOM fully loaded and parsed");
  // rendering 
  const renderingData = {
    snackList,
    buttonTextList,
    myMoney,
  }
  vendingMachineView.initRender(template, renderingData)
  vendingMachineView.bindEvents()
});

 










