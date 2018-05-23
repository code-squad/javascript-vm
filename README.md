# javascript-vm
레벨3


### 01 html 설계 하기 

자판기 
* 상품들 
* 버튼들 
* 디스플레이 창 입력된 금액
* 로그 창 행동들 기록 

지갑 
* 버튼들
* 디스플레이 창 갖고 있는 금액

## 02 css 자판기 상품들만 layout Design

### CSS Text vertical 가운데 정렬 !!!

```css

//부모
position: relative;
//자식
transform: translate(-50%,-50%);
position: absolute;
top: 50%;
left: 50%;

or 하위 지원도 가능함 ! 

//부모
display: table
//자식
display: table-cell;
vertical-align: middle;


```

### MVC 패턴 설계 하기 


1. Model 

VendingMachineModel
WalletModel
View

vendingMachineView 

1. 초기 렌더링 
[O] Dom이 load될 때  snackList, buttonList, .. 정적 template 을 렌더한다 
 -> + myMoney를 바탕으로 -> totalMoney까지 렌더링한다.

2.
[O] 돈 입력 버튼이 클릭 되었을 때 해당 돈이 있으면  토탈 금액이 클릭된 금액 만큼 감소하고 + 해당 금액 갯수가 감소된다. 
질문  
1. 이 처리를 뷰에서만 하고 data로 넘겨줘서 처리 하는지 ->  view->event->viewupdate->controller->model
2. 이벤트를 넘겨주고 data가 업데이트 된다음 뷰를 업데이트 시켜주는지 ?.?
view -event-> controller->model->controller -> view

처음에 1번 방향으로 진행하려 했는데 데이터를 뷰에서 처리해줘야 되는 부분이 어색하다... 
2번으로 다시 선회 


자판기에 돈을 투입하면, 앞서 개발한 부분(지갑의 잔금과 투입금액)이외에 추가로 처리해야할 부분이 있다. 투입이후에는 그 처리결과를 화면에 표시해야하고(log를 쌓는다고 표현한다) 구입가능한 음료를 하이라이트 해야 한다.

스텝7

추가 체크리스트 작성


[]mvc나 구조적인 부분에서 질문 하기 
[] 리팩토링 진행
->
[] 네이밍 네이밍 모델 변수 네임은  Model이 안 붙어 있어서 헷갈릴 수도 있다 Model 붙여놓기
[] 나왔습니다 다음 알림 자동 없애기 
[] 고장이 나왔습니다 => 고장이면 안되도록 설정
[] 메소드들 중복 된 것들 수정 

```js
displaySelectedOne(selectedOne){
    this.displayLogEl.innerHTML = `<p class="selected-one">${selectedOne.name} 가 나왔습니다</p>`;
    this.clearTimer();
  }
  notifyCanNotBuy(money){
    this.displayLogEl.innerHTML = `<p class="notify">${money} 원으로 살 수 없는 스낵입니다</p>`;
    this.clearTimer();
  }
  notifyChoseWrongNumber(wrongNumber){
    this.displayLogEl.innerHTML = `<p class="notify">${wrongNumber}는 선택할 수 없는 번호입니다.</p>`;
    this.clearTimer();
  }
여기도 setButtonState로 바꿔서 true, false만 받아서 하면 훨씬 나을 듯 !
  
  Array.prototype.forEach.call(this.numberButtonListEL,(buttonEl)=>{
  buttonEl.disable=true;
  })
  
  이 부분도 Controller가 처리하도록 하는 편이 좋을 듯!
   vendingMachineView.initRender(template, renderingData)
  vendingMachineView.bindEvents()
```

[] 디자인 적 수정 
--[] 하이라이트 단순 빨간색 ... => 좀 예쁜 ui좀 찾아봐서 바꿔봐 !!! 
--[] 폰트 수정  

### -- 코드 짜면서 이슈
  





