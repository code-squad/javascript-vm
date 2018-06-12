
export const snackTemplate = (snackList)=>{
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
}
  
export const selectButtonTemplate = (buttonTextList)=> {
    return buttonTextList.reduce((ac,c)=>{
      return c.type==="normal" ? ac+=`<li><button class="select-button">${c.buttonText}</button></li>`
              : ac+=`<li><button class="select-button" id="${c.type}">${c.buttonText}</button></li>`
    }, '');
  }

export const walletMoneyButtonTemplate = (moneyObj)=> {
    return  Object.keys(moneyObj).reduce((ac,moneyKind)=>{
      return ac+=`<li class="wallet-money-button">
                    <button class="money-button" data-money="${moneyKind}" data-unit="원">${moneyKind} 원</button>
                    <span class="money-count" data-count="${moneyObj[moneyKind]}">${moneyObj[moneyKind]}개</span>
                  </li>`
    },'')
}
