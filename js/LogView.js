class LogView{

    constructor(){
        this.logingBox = document.querySelector('.print-action');
    }
    insertCoinLog(coin){
        const logMessage = `<p>${coin}원이 투입됐음.</p>`;
        this.logingBox.insertAdjacentHTML("beforeend", logMessage);
    }
    showLackYourMoney(coin){
        const logMessage = `<p>넣을 ${coin}원의 갯수가 부족합니다.</p>`;
        this.logingBox.insertAdjacentHTML("beforeend", logMessage);        
    }
    showNoItem(){
        const logMessage = `<p>해당 번호의 물품이 존재하지 않습니다.</p>`
        this.logingBox.insertAdjacentHTML("beforeend", logMessage);
    }
    selectItemLog(itemId, itemName){
        const logMessage = `<p>${itemId}번 ${itemName}가(이) 뽑혔습니다.</p>`
        this.logingBox.insertAdjacentHTML("beforeend", logMessage);
    }
    showLackInputMoney(){
        const logMessage = `<p>돈이 부족합니다. 자판기에 돈을 더 넣어주세요.</p>`
        this.logingBox.insertAdjacentHTML("beforeend", logMessage);
    }
}