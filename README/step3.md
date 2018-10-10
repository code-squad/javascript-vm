# 목표

- 자판기의 전체 레이아웃을 CSS로 만든다.
- 엘리먼트간 간격이 일정하고 고르게 적용한다. 
- 지나치게 예쁜 디자인을 하려고 노력하지 말자.
- **position속성을 잘 활용**하고, **float를 이용해서 좌/우 배치를 하는 것을 추천**한다. 
- flex속성은 지금 사용하지 않고 **position과 float사용에 집중**한다.

<br/>

<br/>

# 개발 log

- 네이밍이 약간 어렵다

- 아직은 id, class 의 개념이 모호하다

  - id 는 태그들을 감싸고 있는 최종 바깥의 녀석에게 주로 사용한다고 배웠다
  - class 는 약간 공통적으로 사용될 수 있는 태그에 적용하고 있다

- 글자를 세로로 배치하는 방법이 여러가지인데 무엇을 사용하는게 좋을까?

  - 금액을 표시해주는 부분에서 글씨 크기를 키워놨는데, 아무래도 세로로 배치하는 방법을 익혀두면 좋을 것 같다

- 크기(px)를 설계해놓고, 직접 코딩을 하면 내가 원하는 모양과 다르게 나온다

  - 몇 px씩 어긋나는것이 일단은 border 때문인 것 같다.
    - border가 어느부분에 영향을 끼치는지 정리할 필요가 있을 듯 하다
    - margin과 padding 부분도
  - 그래서 고치고-새로고침-고치고-새로고침 방식을 채택했다
    - 좋은 방식같지는 않다. 아직 잘 모르고 있다는 것이니까
    - crong한테 조언을 한번 구해야겠다

- **function Panel (금액표시, 번호선택, 상태창)**

  > 네이밍 functionPanel

  - 이녀석도 itemList 와 같이 div 태그로 한줄 씩 만든다음에 `display: block` 속성을 이용해 위에서 아래로 떨어트릴 예정이다
  - 한줄 씩 만든 div 태그 안의 녀석들은 `display: inline-block` 형태로 배치할 예정이다.

- 스타일이 중첩되는 것 같다

  - LESS 를 사용해볼까
  - 중복되는 것을 처음부터 잡지 않으면 나중에 고치기 더 힘들어질 것 같다
  - 어느정도의 재사용성으로 구현해야 할까?

- **UI Panel (금액 투입, 표시, 잔액표시)**

  > 네이밍 moneyPanel

  - 위에서 겪었던 width, height px 오차를 여기서 테스트 할 예정

    - margin 만 적용 (top: 10px, left: 10px)

      ![](https://i.imgur.com/GaDnwHv.png)

    - border 까지 적용

      ![](https://imgur.com/jFfsJnq.png)

      - border 까지 적용하면 height가 조정됨 (원래 445px)
      - 당연히 border 를 줄이면 height가 줄어듬

    - height-margin 적용

      ![](https://imgur.com/cJjSYPx.png)

      - 가운데로 옮기려면 height 를 줄이고, margin 을 계산하는 식으로 구성해야함

  - moneyPanel 의 크기는 200px, 435px (가로, 세로)

    - border 3px
    - margin-top, left, bottom 10px
    - ~~안에 위치한 패널~~ 은 굳이 없어도 될 듯함
    - ~~크기 185px~~

  - 총 8개의 금액 (10, 50, 100, 500, 1000, 5000, 10000, 내 금액)

    - 한개 줄의 크기는 

  - CSS naming은 `-` 로 구분하는게 좋을까? `대문자` 로 구분하는게 좋을까?

  - Button 과 Div 가 Div로 묶여있는 상황이고, 두개의 태그를 같은 높이(33px)를 줬지만 시작지점이 다르다 왜일까..?

    ![](https://imgur.com/EAQXFFs.png)

    - 디버깅을 하다가 갯수를 표시하는 div tag 의 padding 을 줌으로써 해결했다
    - **그러나 아직도 글자의 세로 영역에서 가운데를 맞추기가 힘들다**

  - **정말 이 Layout 들의 size 를 아직도 모르겠다**

    ![](https://imgur.com/HNl1w12.png)

    - 높이를 줄이고, padding 을 줌으로써 글자의 가운데를 맞추긴 했으나
    - button 과 div를 정렬할 때, div의 글씨크기를 아래로 내려버리면 button과 높이가 틀려진다.

  <br />

  <br />

  # 리팩토링

  금액 투입하는 Layout 을 position 속성을 이용해서 바꿔볼 것이다

  - position: relative
    - `margin-left` 대신 `left` 속성을 이용하였다
  - position: absolute
    - 안의 아이템들을 해당 속성으로 설정하였다
      - 금액 투입 button
      - 금액 표시 div
      - 내 지갑 잔액 div
    - 이렇게 되면, 하나하나씩 top, left 속성을 주어야 하는데 효율적인가?
    - 반복문이 너무 필요해보임
  - 역시나 button과 div정렬은 할 수가 없음
    - height 와 padding-top 값 조정

<br />

<br />

# 피드백

```css
.UI-ColumnBase > button:nth-of-type(1) {
    top: 10px;
}

.UI-ColumnBase > button:nth-of-type(2) {
    top: 50px;
}

.UI-ColumnBase > button:nth-of-type(3) {
    top: 90px;
}

.UI-ColumnBase > button:nth-of-type(4) {
    top: 130px;
}

.UI-ColumnBase > button:nth-of-type(5) {
    top: 170px; 
}

.UI-ColumnBase > button:nth-of-type(6) {
    top: 210px; 
}

.UI-ColumnBase > button:nth-of-type(7) {
    top: 250px; 
}
```

1. 아 이건 좀 이상한데요. 10-50-90 이렇게 반복적으로 서로 의존하면서 쓰는 것이 좀 이상합니다. 하나가 수정되면 주르륵 영향을 받는 코드라서요 . 이렇게 나열하지 않는 방법을 찾아보면 좋겠어요.
   - position 을 사용하기 위해서.. 자체적인 리팩토링 과정에서 발생한 코드다. 음.. 그냥 display 로 배열하는게 더 좋은 방법일까? position 속성을 다르게 사용할 수 있는 방법을 찾아봐야겠다

2. id를 부여하는것도 좋은데요. **고유한 (html안에 유일하게 존재하는 영역)에 쓰이는 게 일반적**이에요. 참고하세요.

```css
<button class="UI-item-base">50원</button>
<div class="UI-item-base">0개</div>
<button class="UI-item-base">100원</button>
<div class="UI-item-base">0개</div>
```

3. class 이름이 대소문자가 섞여 있어서 별로에요.

```css
.UI-ColumnBase > div {
.UI-ColumnBase > div:nth-of-type(1) {
.UI-ColumnBase > div:nth-of-type(2) {
...
```

4. UI라는 이름은.. 다 UI라 안붙혀도 좋을 듯.

<br />

<br />

# HTML Class 네이밍

> 제가 자주 쓰는 서비스 및 좋아하는 회사의 웹페이지에서 class 부분에 대한 네이밍을 조사한 것 입니다.
>
> 각 회사마다의 코딩컨벤션에 의거하여 작성되어서 '이것이 표준이다' 라고 할 수는 당연히 없지만, 그래도 제가하는 네이밍보다는 훨씬 나을 것 같습니다 :)

1. ### Github

![](https://i.imgur.com/W69cqkM.png)

```HTML
<!-- div class 부분만 발췌함 (완벽한 태그가 아님) -->
...
<div class="position-relative js-heaer-wrapper">
<a ... class="p-3 bg-blue text-white show-on-focus js-skip-to-content">
<div class="footer container-lg px-3"
<haeder class="Header f5"
<div class="d-flex flex-justify-between px-3 container-lg">
<div class="Popover js-hovercard-content position-absolute">
<div class="h-card col-3 float-left pr-3">
<div class="u-photo d-block tooltipped tooltipped-s">
...
```

- class 에서 대부분 `-` 기호를 통해서 구분함
  - header 는 `class="Header"` 를 적용함
    - 다른데서는 class="header-logo-invertocat" 라는 태그도 있음
      - invertocat 가 그 깃허브 고양이 이름인가봄
  - footer 는 `div` 태그에서, class로 `footer` 을 적용함
  - `d-flex` 이런것은 Bootstrap 문법(?) 인가보다

<br/>

2. ### MDN web docs

   ![](https://imgur.com/5OYImoM.png)

   ```HTML
   <body id="home" class>
   <header id="main-header class="header-main">
   <div class="nav-toolbox-wrapper">
   	<nav id="main-nav class="nav-main">
   	<div id="toolbox" class="toolbox">
   		<li class="nav-log">
   <form id="nav-main-search">
   	<div class="search-wrap">
   		<span class="search-trigger">
   			<svg class="icon icon-search">
   <main id="content">
   	<div class="home-masthead">
   		<div class="center">
   	<div class="center clear">
   		<div class="home-callouts">
   			<div class="column-container center">
   				<div class="column-callout callout-standard callout-survey">
   				<div class="column-callout callout-newsletter">
   					<div class="newsletter">
   						<div id="newsletterForm">
   		<div class="home-hacks">
   		<div class="home-contribute">
   <footer id="nav-footer class="nav-footer">
   ```

   - 확실히 아직 HTML을 개발한지 얼마 되지 않은 입장에서 MDN web site 가 더 보기 편한 듯 함
   - 근데 id와 class 를 바꿔서 사용하는 경우가 조금 있는 것 같음
     - `id="main-header"` `class="header-main"` 이렇게?
   - 맨 외부를 감싸는 부분을 id로 지정해놓는 경우가 대다수임
     - 도중도중 id 가 쓰이는 부분들이 있는데 (id="newsletterForm")
     - @crong의 피드백을 기억하자
       - **고유한 (HTML안에 유일하게 존재하는 영역) 곳에 쓰이는게 일반적!**

<br/>

<br/>

# STEP 3 질문 사항

1. display ? position ?
2. 내가 설계한 size 와 다르게 나온다
   - 크롬 개발자도구를 이용해서 계속 수치를 고치는것이 정상인가?
3. button 과 div 를 한 div로 묶고 정렬하면 다르게 나온다
   - 아무래도 button 의 가운데 정렬 속성 때문인가?
4. CSS를 작성하면서 스타일 코드가 중첩된다는 것을 느꼈다
   - 처음부터 잡지 않으면 나중에 더 고치기 힘들어 질 것 같은데.. 조언?
5. github 네이밍에 관련해서
   - 왜 id와 class 를 바꿔쓰는지?..









































