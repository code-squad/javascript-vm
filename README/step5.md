# 목표

- 자판기에 돈이 투입되면
  - 얼마나 투입됐는지 화면에 표시 
  - (동시에) 내 지갑의 잔금 표시

<br/>

<br/>

## 개발 LOG

갑자기 메서드에 설명을 달고싶어졌다.

![](https://i.imgur.com/UW8bTgB.png)

일단은 내 지갑에 돈을 넣는 부분을 구현하자

`id = money-amount-window` `div`

Model 에 돈에 대한 데이터를 관리하고 (get/set)

VIEW 에서 조작하자

Controller 에서는 돈을 넣는 메서드를 호출하자 (VIEW에서)

돈이니까 3자리마다 콤마를 찍어주는것도 괜찮을 것 같군 `numberWithComas`

현재 돈이 투입되는 부분의 노드는 `money-display` `div`

버튼 이벤트를 수정하자 (돈을 투입하는 메서드를 구현)

네이밍을 수정했다. currentMoney 보다 walletMoney 가 지갑에 있는 돈이라는 것을 더 확실히 느낄 수 있을 것 같아서..

사실, 투입된 돈을 구현하려고 보니까 네이밍이 헷갈려서 그지같았다. ㅠㅠ

돈을 투입하려면

- 버튼을 클릭한다
- 해당 버튼의 가격을 알아낸다
- 돈을 투입한다
  - 자판기에 표시되는 DIV 텍스트를 증가시킨다
- 내 지갑의 돈을 감소시킨다

음, VIEW 이렇게 구성하는거 맞나? 싶다.. VIEW의 덩치가 너무 커지고, 독자적인 코드로 느껴진다. 데이터를 받는 부분이 거의 없는데 ?

controller 의 의미가 없어지는 듯한?

음, 버튼을 눌러서 돈을 투입할 때, 내 지갑의 돈을 표시하는 DIV 와 자판기에 투입된 돈을 표시하는 DIV 를 수정하는데 로직이 똑같다. 그냥 어떤 노드인지 넘겨주고 한 메서드로 합치면 될 것 같다.

controller 에서 하려 했으나, 이벤트를 등록한곳이 VIEW 라서 =_ =;;

일단 중복되는 부분을 한 메서드로 따로 빼긴했다.. `changeMoneyNodeTextContent`

```javascript
this.changeMoneyNodeTextContent(
    vendingMachineInvestedMoneyDivNode, this.model.getInvestedMoney());
```

아니 네이밍이 너무 가로로 코드가 가려지길래, 이런 코드를 적용했는데 괜찮은지 모르겠다 크롱한테 물어봐야겠다

돈이 마이너스 되는 부분을 처리해야겠다

<br/>

<br/>

## 설명

- **Event 사용**

  - event가 발생하면 이벤트핸들러는 event 관련 정보를 담은 이벤트 객체를 파라미터로 받게됨
  - 이 이벤트 객체에 어떤 것들이 들어있는지 확인해볼 것
  - 크롬 개발자도구의 source 탭을 이용해 break point 를 걸고, 그때의 이벤트객체에 어떤 정보가 담겨오는지 확인할 것

  ![](https://i.imgur.com/FChBac2.png)

  - Scope

    - Block

      - node: button.grid.ui-item-base

      ![](https://i.imgur.com/n30x7TK.png)

      - classList ["grid", "ui-item-base"]
      - clientHeight : 33
      - clientWidth:81
      - nodeName: "BUTTON"
      - outerHTML:"<button class="grid ui-item-base">10원</button>"
      - outerText:"10원"
      - parentElement:div.ui-column-base
      - parentNode:div.ui-column-base
      - tagName:"BUTTON"
      - textContent:"10원"
      - 등등..

- **HTML Templating**

  - DOM 변경시에는 querySelector를 써서 원하는 DOM노드를 찾아야 함
  - 찾은 후에는 다양한 DOM API를 활용해 원하는 DOM Node에 추가하면 됨
  - DOM 추가시에 html 형태로 미리 구조를 만들어서 추가할 수 있음
  - HTML template 를 만들고 데이터와 결합과정을 통해 완성된 HTML 문자열을 넣을 수 있음
  - 이런 HTML Templating 과정을 별도의 라이브러리 없이 시도해보자
  - 간단한 String 조작으로 가능함

  ```javascript
  var base = document.querySelector("div");
  base.insertAdjacentHTML("afterbegin", "<h1>HELLO WORLD</h1>");
  /* innerHTML과 똑같이 HTML 형식으로 넣을 수 있음 */
    
  var base2 = document.querySeletor("p:nth-child(2)");
  base2.insertAdjacentHTML("beforebegin", "<p>나는 가운데 끼었어요.</p>");
  ```

  ![img](https://imgur.com/LTuRZ7U.png)

  가장 간편한것이 `insertAdjacentHTML ` 을 사용하면 될 것 같다

<br/>

## 피드백

- 네이밍이 긴건 문제가 아닌데, 네이밍이 길다는 게 함수의 역할이 많다는 거라 그게 문제같습니다.

- 클래스(객체)의 역할정의를 잘하는 것이 중요합니다. controller 은 필수가 아니라 필요 없을 수 있는거죠.

- 조금더 수정해보세요. 그리고 view가 커지는건 문제가 아니고요. view가 꼭 하나일필요는 없습니다. 의미적으로 콘텐츠가 여러개로 나뉠수 있다면 분리할 수도 있는거죠. 분리의 필요성이 있을지도 고민해보세요.

- 주석으로 함수 정의를 하는것은 나쁘지 않습니다만, 단지 함수를 설명하려고 넣을필요는 없습니다. 코드로 의도를 드러내는게 좀 더 나아요. 형식을 맞추려면 jsdoc 이라는 것도 시간될 때 살펴보세요

  - [JSDoc 사용하기](http://usejsdoc.org/about-getting-started.html)

  - [JSDoc Index](http://usejsdoc.org/index.html#block-tags)

    ![](https://i.imgur.com/7JLOBYQ.png)

    꽤 괜찮은 기능인 것 같다. 내가 작성한 부분이 메서드를 호출할 때 나온다 헤헿

- 약간 길지만 이름에서 의도가 잘 드러나서 좋네요 ㅎ `registerClickEventToInsertMoneyBtn()`

- Indent 항상 줄이려고 노력할 것 :9

- 모델에 몇몇 메서드들의 크기가 작은데요. 이런건 혹시라도신경쓰지 마세요. 메서드를 여러개 만들어두는 건 좋습니다.

- console.log로 디버깅하지 말고, debugger 를 통해서 디버깅하세요~

- 반복적인 document.queryselector 메서드같은경우 유틸리티로 간단한이름의 함수를 만들어서 써보세요.