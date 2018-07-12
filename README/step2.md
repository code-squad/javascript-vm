# 요구사항

구조화설계에서 만들었던 HTML을 활용해서, 자판기의 좌측 상품진열 UI만 CSS를 적용해보자.

배치하는 방법을 제대로 배우지 않았으니, 우선 배치는 신경쓰지 않고 스타일적용에만 집중한다.

<br/>

<br/>

# 개발 log

일단은, 전체 판의 크기를 정해야 될 것 같다.

갑자기 생각난건데 나중에 `float 속성`을 이용해서 배치를 해도 괜찮을 것 같다 (네이버 모바일 웹 처럼)

![](https://i.imgur.com/HXqU8X8.png)

상품과 상품명의 div 크기는 일단 `width 100px, height 50px` 으로 정해보면 전체 판의 크기는 `width 400px, height 400px` 이 적용된다.

![](https://imgur.com/ApIvya0.png)

이런식으로 환타(파인애플맛) 부분이 잘리기 때문에 `width` 간격을 조정해야겠다. (width 100px >> 150px)

![](https://imgur.com/ylknBpl.png)

Grid Layout 을 적용해서, 4x8 의 블럭을 구성한 후, 나중에 width는 똑같이 맞춰놓은 상태로 상품명의 height를 70% 가격의 height를 30% 정도로 배치하면 될 것 같다.

![](https://imgur.com/ylknBpl.png)

Grid Layout 을 적용해서, 4x8 의 블럭을 구성한 후, 나중에 width는 똑같이 맞춰놓은 상태로 상품명의 height를 70% 가격의 height를 30% 정도로 배치하면 될 것 같다.

![](https://i.imgur.com/FpCQUTe.png)

몇가지 버그(아이템 하나 빠트린 것)와 스타일(색깔, 간격)을 조정한 후 완성된 모습

Grid Layout 대신 position 과 float 를 이용해보자

일단은 Grid 형태를 내기 위해서 8개의 div가 다시 필요할 듯 함, 이 8개의 div 를 block 형태로 떨어트리고 안에 아이템과 가격을 담은 div(table) 를 inline-block 형태로 (형태를 유지해야 하므로) 옆으로 배열시키는 것부터 해보자

display 속성으로만 대체할 수 있을 것 같아서, 4개의 item 씩 한 div 로 묶어버림 (=총 8개의 div)

그리고 div 안의 4개의 item 의 position 을 inline-block 형태로 주고 간격을 맞춰주기 위해서 margin 을 지정함

- Grid Layout

  - [W3 School](https://www.w3schools.com/css/css_grid.asp)
  - [MDN](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/%EA%B7%B8%EB%A6%AC%EB%93%9C_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%EC%9D%98_%EA%B8%B0%EB%B3%B8_%EA%B0%9C%EB%85%90)

  ![](https://i.imgur.com/9VtB4aN.png)

  ```HTML
  <!-- 그리드 트랙 -->
  <div class="wrapper">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
  </div>
  ```

  ```CSS
  .wrapper {
    display: grid;
    grid-template-columns: 200px 200px 200px; /* 이 부분이 가로테이블의 갯수를 뜻함 */
  }
  ```

  ![](https://i.imgur.com/0O8T7J4.png)

  ```HTML
  <!-- 경계 여백 -->
  <div class="wrapper">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
  </div>
  ```

  ```css
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 1em;
  }
  ```

  `grid-colunm-gap` 속성과 `grid-row-gap` 속성으로 **가로-세로의 테이블 간 간격을 조정**할 수 있음

  <br/>

  <br/>

  # 피드백

  1. Grid Layout (=Grid 문법) 은 최신 문법이라 편하고 막강하다. 하지만, float 와 position 속성을 잘 이해하고 사용하길 바란다. grid 는 현재에도 브라우저 제약때문에 많이 사용하는 편은 아니다.

     chrome 과 edge 에서 테스트 했을 때는 원하던 결과 (Grid Layout) 가 적용되었지만, IE11 에서는 아래와 같은 참사가 펼쳐졌다.

     ![](https://imgur.com/x22tlWS.png)

     

  2. caniuse.com 같은 사이트에서 css속성의 브라우저 호환성 확인을 가끔씩 해보는 것도 좋다!