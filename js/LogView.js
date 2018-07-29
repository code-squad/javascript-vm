class LogView{

    constructor(){
        this.logingBox = document.querySelector('.print-action');
    }
    insertCoinLog(coin){
        const logMessage = `<p>${coin}원이 투입됐음.</p>`;
        this.logingBox.insertAdjacentHTML("beforeend", logMessage);
    }
    showNoMoney(coin){
        const logMessage = `<p>넣을 ${coin}원의 갯수가 부족합니다.</p>`;
        this.logingBox.insertAdjacentHTML("beforeend", logMessage);        
    }
}