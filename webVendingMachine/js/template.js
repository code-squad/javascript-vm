
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

export const logtemplate = {
    nowSelectedNumber: (nowSelectedNumber)=> `<p class="selected-one">${nowSelectedNumber}</p>`,
    displaySelectedOne: (selectedOne)=>`<p class="selected-one">${selectedOne.name} 가 나왔습니다</p>` ,
    notifyCanNotBuy: ({money})=>`<p class="notify">${money} 원으로 살 수 없는 스낵입니다</p>`,
    notifyChoseWrongNumber: ({id})=>`<p class="notify">${id}는 선택할 수 없는 번호입니다.</p>`,
    notifyBreakdown: ({id})=>`<p class="notify">죄송합니다 ${id}는 고장으로 선택할 수 없습니다</p>`,
    notifyNoneSelect: ()=>`<p class="notify">선택하기 전에 <br>선택할 번호를 입력해주세요</p>`,
    notifySecondOrder: ()=>`<p class="notify">추가 선택이 3초 동안 안 이뤄질 시<br>입력한 돈을 반환 합니다</p>`,
    notifyReturnMoney: ({money})=>`<p class="notify">${money} 이 반환 되었습니다</p>`,
    notifyHasNoMoney: ()=>`<p class="notify">상품 선택 전에 돈을 먼저 넣어주세요</p>`,
    insertMoney: ({latestHistorys})=>latestHistorys.reduce((ac,c,ci)=>{
        return latestHistorys.length-1===ci ? 
        ac+=`<p class="log now">${c}원이 입력되었습니다</p>`
         :ac+=`<p class="log ">${c}원이 입력되었습니다</p>`

    },'')
}