## 목표

- 자판기에 돈을 투입시
- 처리결과를 화면에 표시
  - 로그를 쌓듯이
- 구입 가능한 음료를 하이라이트

<br/>

<br/>

## 개발LOG

- 처리결과를 화면에 표시

  일단은 DIV에 텍스트를 추가하는 식으로 진행

  content 를 받아서 저장한 후, += 형태로 할 것인가

  **아니면 메서드를 사용해서 text 를 추가할 것인가**

  p 태그보다는 div 태그를 사용

  한줄에 하나씩 div 태그를 사용하면 될 것 같음

  insertAdjacentHTML 메서드를 이용해서 태그를 삽입

  Model 에서는 배열에 하나씩 넣으면 될 듯 함

  만약 많이 쌓이면, 어떻게 할것인가? 스크롤을 구현하면 될 것 같음

- classList 사용할 때, 인자안에 클래스 표시한다고 점(.) 찍으면 안됨!

- insertAdjcentHTML 과 createElement ?

- 구입 가능한 음료를 하이라이트

  하이라이트 시킬 부분을 CSS에 클래스로 만들어보자ㅏ

  배경색하고 텍스트를 반전시켜줌 (background-color, color)

- 그러면 금액이 투입될 때 마다, 금액 하나씩 검사하면서 classList 를 사용해야 하는데

  금액이 투입될 때 마다 반복문이 최소 32개씩 돌아감 괜찮은가? 일단 구현하자

  금액이 같은것끼리 묶어놓을까?

  400 - 3, 4

  450 - 21

  500 - 1, 14

  600 - 12

  700 - 11, 30

  800 - 31

  900 - 5, 24, 26

  1000 - 2, 7, 8, 10, 13, 15, 17, 18, 20, 25, 29, 32

  1200 - 6, 16, 23

  1500 - 22

  2000 - 9, 19

  2300 - 28

  4000 - 27

  이게 더 복잡할 것 같긴함.. 일단은 querySelectorAll 로 가져온다

  그냥 반복문으로 처리, 정규식을 이용해서 각 아이템의 금액만 뽑아낸 다음 투입된 금액보다 작으면

  해당 DIV 에 classList 로 high-light 클래스를 지정해줌

  

  그런데 high-light의 background-color 속성이 지정이 안되는 것임

  크롬개발자 도구로 열어보니, 취소선이 적용되어 있었음

  

  2가지 해결방법을 찾음

  javaScript에서 CSS를 조작 `node.style.color, node.style.backgroundColor`

  CSS 에서 `!important` 를 맨뒤에 작성 (최우선으로 적용됨)

  

  클래스 내에서도 우선순위가 있는것인가?

  

  일단 불필요한 작업들을 최소화 시켰다

  예를들어, node 를 반복해서 찾고, 해당 node 에서 innerText 를 계속해서 뽑아내고 이런 부분들을

  Model에 아이템 가격 배열을 만들어서, 처음 찾을 때 저장시킨다음, 다음에 찾을때는 해당 인덱스로 가격이 있다면 모델의 배열에서 바로 받아왔다.

  이것을 작성하면서, 이미 하이라이트 클래스가 적용된 부분에 대해서도 검사할 수 있을 것 같다.

  `node.classList.contains('high-light')` 를 이용해서 true/false 를 받을 수 있으며, 원천적인 부분에서 바로 반복문을 끝내버릴 수 있을 것 같다

  

<br/>

<br/>

## 설명

- **로그 남기기**
  - 소프트웨어는 동작에 대한 기록을 남기는 것이 일반적
  - 어떠한 문제가 생겼을 때, 기록을 찾아보고 원인을 파악할 수 있음
  - 소프트웨어를 어떻게 많이 사용하고 있는지 통계를 추출할 수 있음
  - 진행상태마다 로그함수를 호출해 인자로 전달
- **CSS Style**
  - CSS 를 넣었다 뺐다 하는것이 좋은 방법임
  - 자바스크립트에 CSS코드가 들어가는 것 보다는
  - CSS Class 를 만들고 이를 활용하는것이 좋음
  - Class List 가 무엇인지 찾아보고 활용할 것

<br/>

<br/>

## JavaScript 로 Class 제어하기 (Class List)

[HTML DOM classList Property](https://www.w3schools.com/jsref/prop_element_classlist.asp)

[Adding, Removing & Toggling Classes with classList in JavaScript](https://alligator.io/js/classlist/)

```html
<div class="cool new shades">
//...
</div>
```

```javascript
let shadesEl = document.querySelector('.cool');

console.log(shadesEl.classList);
// ["cool", "new", "shades", value: "cool new shades"]

console.log(shadesEl.classList[1]); // new
```

<br/>

- **add**

  ```javascript
  /* JS */
  shadesEl.classList.add('make', 'me', 'look', 'rad');
  
  /* HTML */
  <div class="cool new shades make me look rad">
    🕶️
  </div>
  ```

- **contains**

  ```javascript
  console.log(shadesEl.classList.contains('look')); // true
  ```

- **item**

  ```javascript
  console.log(shadesEl.classList.item(3));  // make
  ```

- **remove**

  ```javascript
  shadesEl.classList.remove('cool', 'make', 'me');
  ```

- **toggle**

  ```javascript
  coolButton.addEventListener('click', () => {
    shadesEl.classList.toggle('cool');
  });
  ```

  add 되면 true 를 리턴하고, remove 되면 false 를 리턴함

<br/>

<br/>

## VIEW를 나눠보자

refreshWalletMoney() `갱신`
refreshInvestedMoneyInVendingMachine() `갱신`
changeMoneyNodeTextContent(node, money) `갱신`

<br/>

numberWithCommas(x) `유틸`
sortOutNumber(data) `유틸`
checkWalletMoneyMinus() `유틸`
alertErrorMessage(message) `유틸`

<br/>

getNodeData(data, mode) `획득`
registerClickEventToInsertMoneyBtn() `등록`
insertMoneyToWallet(money) `삽입`
insertMoneyToVendingMachine(money) `조작`

<br/>

<br/>

## 질문 리스트

1.  HTML 태그를 만들어서 추가하는게 나은가요? 아니면, createElement 메서드와 innerText 등을 통해서 추가하는게 나은가요? 개발자가 편한대로 하면 되나요?

   동적 상태에서의 문자열 조작이라면 보통 문자열방식이 보통 편하고 빠르다고 알려져 있습니다. 하지만 그때그때 성능비교가 필요하고요. 대체로 그 차이는 미미합니다

2. node 에 class 와 id 를 적용할 때, score 가 매겨져서 적용되는 우선순위가 다른것으로 알고있는데요.
   class 내에서도 우선순위가 적용되나요? class를 classList.add 로 적용시켜줬는데, 적용이 안되서
   크롬 개발자도구를 보니까 해당 속성에 취소선이 그어져있어서요

<br/>

<br/>

## CSS Class 가 여러개 적용되었을 때의 우선순위를 알아보자

![](https://i.imgur.com/xnzY3GH.png)

```css
.high-light {
    /* background-color: #212121 !important; */
    background-color: #212121;
    color: #FFF;
}
```

간단한 원리는 투입된 금액에 맞춰 선택할 수 있는 상품들을 표시해 주는건데, 현재 CSS high-light 클래스에서 background-color: #212121 이 적용되지 않는 결과이다.

![](https://i.imgur.com/gOjgzdG.png)

해당 노드에 대한 Styles 이다. 내가 classList로 add한 CSS의 class (high-light) 가 맨 하위에 적용되있는 것을 확인할 수 있다. 그리고 background-color 도 모두 취소선으로 적용이 `.grid` 에 의해 밀린 것 같다.

자 그럼 HTML에서 `<div class="grid d-item">`  으로 되어있던 태그를 `<div class="d-item grid">` 로 바꿔보자

아니다. 선언순서가 문제가 아닌것 같다. 그래도 최상위에는 `.grid` 가 위치해 있다. 내가 놓친것이 있는건가?

검색을 해보니 잘 나온다 [CSS class prioirty](https://stackoverflow.com/questions/3066356/multiple-css-classes-properties-overlapping-based-on-the-order-defined)

스타일 시트에서 마지막으로 선언된 스타일에 따른다고 한다

순서를 확인해보니 가장 맨 처음으로 선언한 것은 `.high-light` 그 다음은 `.d-item` `.grid` 순이였다.

음, 이제 알겠다. CSS에서 내가 만든 클래스들을 맨 아래로 위치시켜보겠다.

![](https://i.imgur.com/86CIQkR.png)

정상적으로 출력된다. 굳..