## 목표

- 잔돈버튼은 별도로 구성하지 않음
- 상품이 선택되면 3초뒤에 자동으로 잔돈이 반환됨
- 3초안에 다른상품을 고르거나 추가금액이 투입되면 반환되지 않음

<br/>

<br/>

## 개발LOG

1. alert 대체

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

2. setTimeout 잔돈기능 구현

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

3. exception class 생성

<br/>

<br/>

## 기타