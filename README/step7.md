## 목표

- 자판기의 숫자패드를 눌러서 상품을 선택할 수 있음
- 상품이 선택되면, 상품이 나왔다는 메세지가 로그영역에 출력
- 투입금액영역에 잔돈 반영
- 3초간 아무런 번호선택이 없으면 현재 번호를 기준으로 상품이 나옴
- 없는 번호라면 에러메세지가 노출되며 다시 입력을 받을 수 있는 상태로 전환

<br/>

<br/>

## 개발LOG

- 번호판에 대한 클릭 이벤트를 등록

  - button 태그임

  - `btn-num` 이라는 class 를 지내고 있음

  - 일단 뽑아내긴 했는데, 1~9 까지 `btn-num` 클래스를 가지고 있고

  - 0 이 독자적인 클래스를 가지고 있음 `btn-zero-num`

  - 그래서 전부 가상의 class 를 추가해주고 한번에 뽑아낼지

  - 그냥 0번에 btn-num 클래스 넣고, btn-zero-num 클래스에 우선순위를 적용해서 btn-num 으로 전부 뽑아내도 괜찮았을 것 같다

  - 아니면, 1~9 까지 querySelectorAll 을 통해 뽑아낸 후 nodeList 를 array 로 변환해서 0 의 노드를 넣어줄지

    ![](https://i.imgur.com/P3m7gC2.png)

    정상적으로 넣어진다 굳

  - 이벤트가 잘 동작되는지 보기위해 alert 메서드 이용

    ![](https://i.imgur.com/JMXCfOH.png)

  - 현재 선택된 번호를 Model 쪽에서 관리하는게 좋을 듯 함

    `getCurrentSelectedNumTxt` `getCurrentSelectedNumTxt` `currentSelectedNumTxt`

  - 모델을 만들면서 느낀건데 1단위 10단위 구분도 필요하구나 ;0 - 문자열 포맷으로 해결

  - 일단은 2자리로 제한하면 될듯함 - 굳이, 필요없을 듯 함. 어차피 없는 번호로 인식할것 같음

  

- 있는 번호인지 없는 번호인지 체크

  - 있는 번호라면 (존재하는 상품이라면)
  - 상품의 금액을 알아내고
  - 투입된 금액에서 상품의 금액을 마이너스하고
  - 선택할 수 있는 상품을 다시 표시하고
  - 오 개이득, 이전에 model 에서 배열로 관리해서 인덱스로 접근하면 바로나옴 개꿀
    - 그런데 가격이 투입되기 전까지는 배열이 비어있음
    - `undefined` 가 반환됨
    - undefined 와 숫자를 비교하면 어떻게 되는가?
      - undefined > 0 : false
  - string 이 들어와도 string 으로 비교하는것이 아닌 number 로 비교해줘야 함

- 3초간 번호 선택이 없음을 체크하는 시간(?) 함수 알아보기

  - setTimeout(function() { }, 3000) 와 같이 사용하는데..
  - 동작중인것을 어떻게 알지?
  - 아 그냥 함수가 호출(= 상품이 선택)될때마다 clearTimeout 을 호출하면 될듯함
  - clearTimeout 을 호출하려면 setTimeout 메서드를 동작시킨 변수가 존재해야 함
  - 해당 변수를 View 에 productVerificationTimer 라고 만들었는데 Model 쪽으로 옮김
  - 상품확인 타이머?
  - 타이머가 number 로 반환된다 진짜 number 1 이렇게..

- 와우.. git을 이번에 완벽하게 꼬아버렸다.

  나중에 시간되면 rebase와 fetch merge 차이점좀 익혀두어야 겠다

- 구현할 때, 일단 막 구현하고 나중에 정리하려니 죽을맛이네

<br/>

<br/>

## 설명

[자바스크립트 타이머 - setTimeout, setInterval, clearInterval 함수](http://ooz.co.kr/194)

[nodeList to Array](https://developer.mozilla.org/ko/docs/Web/API/NodeList)

[setTimeout - MDN](https://developer.mozilla.org/ko/docs/Web/API/WindowTimers/setTimeout)

<br/>

<br/>
