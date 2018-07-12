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