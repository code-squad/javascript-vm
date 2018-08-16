## 목표

- 잔돈버튼은 별도로 구성하지 않음
- 상품이 선택되면 3초뒤에 자동으로 잔돈이 반환됨
- 3초안에 다른상품을 고르거나 추가금액이 투입되면 반환되지 않음

<br/>

<br/>

## 개발LOG

1. **alert 대체**

   맨 아래 footer 태그를 삽입 가운데 div를 놓고 가운데 정렬

   - 옆으로 나열되는 속성이 `inline` 임 (헷갈리지 말 것)

   - css 에서는 `visiblity: hidden;` 으로 적용 `visibility: 'hidden';` X

   - [visibility 속성](https://ofcourse.kr/css-course/visibility-%EC%86%8D%EC%84%B1)

   - div 가운데 정렬

     `margin: 0 auto;`

   - [div 안에서 텍스트 세로정렬](https://zetawiki.com/wiki/DIV_%EC%84%B8%EB%A1%9C_%EC%A4%91%EC%95%99_%EC%A0%95%EB%A0%AC)

     ```css
     .middle {
         display: flex;
         align-items: center;
         justify-content: center;
     }
     ```

   - 그 다음에 자바스크립트 단에서 객체 찾고

   - 해당 객체 innerText 바꿔주는 식으로 구현

   - 그 과정 중, show, hide 구현

     ```javascript
     setNodeVisibility(node, mode) {
         node.style.visibility = (mode === 'hidden') ? 'hidden' : 'visible'
     }
     ```

     노드 스타일의 visibility 속성을 `hidden` 아니면 `visible` 로 지정해주면 됨

   - alertMessage 함수를 개편하자


<br/>

2. **setTimeout 잔돈기능 구현**

   - 상품이 선택되면 3초뒤에 자동으로 잔돈이 반환
   - setTimeout 함수를 전달받아 작동시키고 싶은데 작동을 안함 (나중에 연구가 필요해 보임)
   - 타이머 설계
     - 상품을 선택한 메서드에서 현재 1초간 타이머가 작동하고 있음 (상품 선택)
     - 타이머 안에 타이머를 넣어야 하나?
     - startProductSelectAfterHandler 메서드에 넣으면 될 것 같음
     - updateView 쪽에 Timer 를 하나 만들어 놓고
     - 뭐부터 해야하지
     - 잔돈 반환
       - 현재 투입된 금액 알아내기
       - 현재 투입된 금액 Model 에서 받아오기
       - 현재 투입된 금액 초기화 (0)
       - 현재 투입된 금액을 Model 로 접근해서 지갑에 더하기
       - refresh View
         - 투입된 금액
         - 현재 지갑
       - 로그찍기
     - 잔돈 반환 추가기능
       - 3초안에 다른 상품을 고르거나 추가금액이 투입되면 반환 X
         - 그러면 돈 투입 버튼에 메서드 하나 만들어서 넣고 (clearTimer)
         - 상품고를 때 메서드 하나 만들어서 넣으면 될듯 함
       - 반환될 금액이 존재하지 않으면 타이머 취소

<br/>

3. **exception class 생성**

<br/>

<br/>

## 공사

```
현. view관련 클래스가 점점 늘어나고 있군요. 공사를 한번 하면 어떨까 제안합니다.
view가 여러가 나눈 단위가 '기능' 이거든요. 유틸, 업뎃,예외처리 등 이렇게 할 수 있다고 생각해요.
하지만 view가 많아지면 그때마다 (view마다) 이렇게 여러개의 기능이 나눠질거 같고요.
좀 혼란스러워질 수 있어요.
view를 동작중심으로 나누는 건 어때요?
지금은 응집도가 떨어져버리고 있어요.
물품리스트view, 지갑view 등 실제 화면을 바라보고(자판기를 바라보고) 동작의 경계점이 있는데 그걸 가지고 각각 view를 만들어보는거죠. 유틸,업뎃,에외처리는 각 뷰안에서 처리하고요.
그 뷰들간의 공통점이 있다면 그건 공통으로 뺄수는 있을텐데요. 이건 나중에 리팩토링 할 꺼리에요.
네 지금구현하거랑 앞으로 구현할거랑 스스로 차이도 느낄거고.
시간이 좀 걸려도 좋은 시도일거 같아요.
지금 코드에 리뷰는 약간 남겼는데, 참고하시고 전체 방향은 제가 제안한 것으로 현재 스텝을 다시 구현해보세요.
```

- 현재의 View를  `기능` 중심에서 `동작`중심으로 바꿔보자
  - 물품리스트 View
  - 지갑 View
  - 실제 화면(자판기)을 바라보고 동작의 경계점을 가지고 각각 View 를 만들어 볼 것
  - 유틸, 업뎃, 예외처리는 각 뷰안에서 처리
  - 각 뷰들 간 공통점이 있는것은 일단 나중에 리팩토링
- Model
  - Model.js
- Presenter
  - Presenter.js
- View
  - FunctionView.js
  - ItemView.js
  - WalletView.js

<br/>

<br/>

## 공사 개발LOG

- View 를 나누는 과정이 조금 혼란스럽다
- 동작의 경계점?
- 번호를 선택(Click Event)하는 부분과 동전을 투입(Click Event)하는 동작이 비슷하다
- 투입된 금액을 표시하고, 상품을 선택하고, 로그를 표시하는게 한 View(Function View)로 묶여있다

![](https://i.imgur.com/yfjmpB0.png)

- ItemView, SelectorView, LogView, RepresentView
- ItemView, FunctionView, WalletView
- 고민스러운 부분이 맞음. 객체가 무엇인지 찾아보는 것도 좋음
- 그런 점에서 2가지 중 고르라면 1번(동작기반)이 좀 더 어울림
- 2번째도 어찌보면 비슷한데, FunctionView는 하나의 객체로 보기 어려워보임
- 구분이 모호한 것 같다
- ItemView, moneyView, refreshView
  - view 를 한 곳에 모아놓고 상위구조로 view 를 선언하면 어떻게 될까
- Presenter 도 하나만 선언했다가.. 메서드를 옮기는 도중에 뭔가 크기가 엄청 불어날 것 같아서 View와 똑같이 분류했다
- STEP4 부터 다시 구현
  - 초기화
  - 지갑에서 돈 선택
- Presenter 에서 Event 를 관리할 것
- Model
- View
- Presenter
- View 에서 presenter 를 호출해야 함
- 뷰를 생성할 때, 메인뷰 (this) 를 인자로 넘겨서, presenter 을 호출하는 식으로 진행
- 와.. 진짜 엄청꼬여있다.
- 계속 View와 Model을 해제하는데 느끼는건데 Model에서 재사용성을 엄청느낌
- 이게 구조패턴을 적용하는 이유인가? 뭔가 딱 분리되어 있다는 느낌을 확실히 받음
- 아주 에러가 -_-;;;;
- javaScript 의 함수는 지정을 하지 않으면 undefined 를 반환한다
  - return false 만 있는건 아닌지 확인할 것
- export 할때는 HTML 에서 `<script type="modlue" src="경로"/>` 로 지정하면 됨
- [call, apply, bind](http://anster.tistory.com/165) 에 대해서 다시 명확하게 짚고갈 것
- .bind(this, 인자) => 해당 함수는 this가 해당 bind를 호출한 부분의 this로 바뀌며, 인자로 node를 받을 수 있음 (node 라는 변수가 있다면)

<br/>

<br/>

## 실제화면을 바라보고 동작의 경계점

- Model

  - 여기도 나눌 수 있을 것 같은데 일단은 하나로 통일 `model.js`
  - Model 은 Presenter 에게 필요한 데이터를 응답함

- View

  > 이벤트는 일단 View에 선언되며, 예를들어 클릭됬을 때 presenter 로 접근한다
  >
  > presenter 에서는 다시 view로 접근한다.

  - View 로 사용자의 입력을 받음
  - View 는 Presenter 에게 작업요청
  - View 는 Presenter 에게 받은 데이터로 화면에게 보여줌

- Presenter

  > View 에서 선언되는 Presenter 이며, 자기자신을 넘겨준다.

  - View 의 작업을 받음
  - 필요한 Model 에게 데이터를 요청

<br/>

<br/>

## MVP, Model-View-Presenter

- **특징**
  - Model과 View는 Presenter과 동일
  - 사용자 입력을 View에서 받는다
  - Model과 View는 각각 Presenter과 상호동작을 하게됨
  - 그러므로 View와 Model은 서로 알 필요가 없음
  - Presenter만 알면됨
  - 그래서 MVC의 단점인 View와 Model간 의존성이 없어짐
- **문제점**
  - 단점으로 View와 Presenter가 1:1로 강한 의존성을 가지게 됨
  - 컨트롤러처럼 프리젠터에도 시간이 지남에 따라 추가 비즈니스 로직이 모이는 경향이 있습니다. 시간이 흐른 후 개발자는 거대하고 다루기 어려운데다 문제가 발생하기 쉽고 분리하기도 어려운 프리젠터를 발견하게 돼죠.
- **Presenter**
  - View에서 요청한 정보를 Model로 부터 가공해서 View로 전달하는 부분
  - View 하나당 하나의 Presenter 가 붙는다
  - 

<br/>

<br/>

## [응집도](https://terms.naver.com/entry.nhn?docId=3532986&cid=58528&categoryId=58528)

응집도(cohesion)는 모듈 내부에 존재하는 구성 요소들 사이의 밀접한 정도를 나타낸다. 즉 하나의 모듈 안에서 구성 요소들 간에 똘똘 뭉쳐 있는 정도로 평가한다. 응집도가 높을수록 구성 요소들이 꼭 필요한 것들로만 모여 있고, 응집도가 낮을수록 서로 관련성이 적은 요소들이 모여 있다. 응집도가 가장 높은 것은 모듈 하나가 단일 기능으로 구성된 경우이다. 반대로 응집도가 가장 낮은 것은 기능들이 필요에 의해 모듈 하나에 존재하는 것이 아니라 우연에 의해 함께 묶이게 되는 경우이다.

![](https://i.imgur.com/aG7E2kl.png)

<br/>

<br/>

## 피드백

- [ ] Utility 는 클래스를 통해서 어떠한 객체를 만드는 역할을 만들기보다, 서로 연관성 없는 개별 함수들의 묶음이라, 객체리터럴로 만들어도 됩니다. 

  - 만들긴 만들었는데, 이것을 다른 JavaScript 의 Class 에서 어떻게 사용할지가 잘 안풀림
  - HTML 과 연계되어 있는 JavaScript 에서의 import 는 어떻게 해야되는가 ?
  - 자꾸 최상단에서 import 하려고 하면 `Uncaught SyntaxError: Unexpected token {` 에러만 출력됨 (import 지원이 안되는 것인가?)
  - 전체 JavaScript (app.js) 에서 호출한 다음에 인자로 넘겨주어야 하는가?

- [ ] 참고로 실제 서비스는 여러가지 js를 1-2개로 합쳐서 빌드하고 배포해요. http request 수를 줄이려고요. 

  - LUMI 의 답변 : 요청을 줄이고 싶은 목적이라면, 빌드 툴 같은 것으로 압축을 해서 넣어야 할 것 같고 script태그를 줄이고 싶으신 거라면 es module 형식을 적용해서, entry point가 되는 JS만 HTML에 넣는 방식이 있을거 같습니다
  - Crong 의 답변 : 이런 검색키워드는 어때요? `concatenate javascript file npm`

- [x] 이벤트핸들러를 별도 함수로 선언해두면 여기코드가 더 가독성이 있을겁니다. 
  node.addeventlistener("click", this.nodeClickHander.bind(this)); //bind는 필요하면 사용.

- [x] Utility 는 사용하는 클래스 안에서 매번 객체를 만들지말고, 바깥쪽에서 객체를 생성해서 주입받아서 쓰면 불필요한 객체중복생성이 안될 듯. 

  - 첫번 째 피드백과 연관있는 피드백인 듯 하다. 이 방식으로 적용해봐야 할 듯 함
  - 아니다.. app.js 에서 Utility 를 새로 생성하고, 이것을 mainView 와 mainPresenter 로 넘겨줌

- [x] 이 클래스(VendingMachineMainView)의 필요성이나 장점은 뭐에요? 

  - 제가 생각했을때에는 두가지 목적이 존재합니다.

    1. 다른 Presenter 에서 각 View로 접근할 때 사용합니다. 

       각각의 View를 각자 new 키워드로 생성하는 것이 아닌 mainView 에서 한꺼번에 생성해서 get/set 메서드로 재사용을 하기 위해서 사용합니다.

    2. 각 View에서 Presenter 로 접근할 때 사용

       모든 JavaScript가 로드되고 나서, mainView는 MainPresenter를 받습니다. 이후 각 View들은 MainView를 this 인자로 받게되는데, 각 View에서 mainView로 접근해 MainPresenter를 받아오고, MainPresenter에서 각 Presenter 를 호출하게 되는 방식을 채택하였습니다.

- [x] 이름이 controller 라는 걸 쓰다보니, 이게 MVC의 controller 와 헷갈리네요. 

  - 뭔가 자판기를 조작(?) 하는 것을 나타내기 위해서 'Control' 이라는 단어를 사용했는데, Operate 가 더 괜찮은가요?

- [x] this.mainView.getPresenter() 이걸 자주 부르지 말고, 한번 불러서 변수에 캐시하고 쓰면 될 듯. 

  - 생성자에서 this.mainView 까지만 선언해놓고, 불러올 때 캐시하는 방식으로 바꿔봐야 겠다.

- [x] 각각 코드에서 쓰이지 않는 변수가 여러개 선언되어 있었다.

  - 코딩할 때 무슨생각한거지.. :(



## 질문

1. 객체 리터럴로 만들어서, 다른 Class 에서 어떻게 사용하는가?
2. [require is not define](https://stackoverflow.com/questions/10166324/how-to-include-nodejs-modules-in-html-files)



