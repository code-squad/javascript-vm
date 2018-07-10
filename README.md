# 웹 자판기 - HTML, CSS

---

`HTML` `CSS` `JAVASCRIPT` 의 기본기능을 이용한 **웹 개발을 시작**할 수 있으며, 웹에서 동작하는 자판기를 구현할 것입니다. 

<br />

<br />

# 힌트

---

- 먼저 아래 설명을 보고 HTML을 이해한다.
- 디자인(css)를 전혀 고려하지 않고 구현한다.
- 구조화설계는 HTML을 구조대로 구현하는 것이다. 문서를 쓰듯이 HTML의 구조를 잡아나가보자.

<br />

<br />

# 설계

---

![](https://i.imgur.com/K4lv912.png)

- **HTML의 레이아웃을 참고해서, 해당 웹 자판기에 필요한 부분이 무엇인지 생각해보자.**
  - header 은 필요 없어보임 (나중에 필요할지도?)
  - nav 필요 없어보임
  - **section 부분 필요해보임**
    - 여기서 article 을 2 개로 분배 해야 할 듯 함
    - article 1 : 상품 부분
    - article 2 : 금액 투입 표시기, 번호 선택판, 상태 창
    - footer 필요 없어보임
  - **aside 필요해보임**
    - 금액을 투입하는 패널창
  - footer 필요 없어보임
- **section**
  - **article 1. 제품을 선택하는 부분**
    - 이름을 표시할 32개의 항목이 존재함
    - 아래 번호.가격 을 표시할 32개의 항목이 존재함
  - **article 2-1. 투입된 금액을 알려주는 부분**
    - 텍스트를 표시할 수 있는 부분이 필요
  - **article 2-2. 제품을 선택하는 부분**
    - 0~9 까지의 버튼이 존재
  - **article 2-3. 상태창**
    - 입력금액
    - 선택한 상품
    - 반환 정보
- **aside**
  - 금액을 투입할 수 있게 할 창이 필요함
  - 내가 가지고 있는 금액을 표현할 부분이 필요함 With 계산

<br />

<br />

# 피드백

---

- meta 데이터가 의미하는게 무엇인지?

  - HTML 문서에 대한 정보를 표현하는 것

  - `head` 태그 안에 위치하며, 렌더링 과정에서 해석되지 않음

  - [메타 데이터 (metadata)](https://ko.wikipedia.org/wiki/%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0)

    - 데이터(data)에 대한 데이터
    - 정해진 규칙은 없음
    - 어떤 목적을 가지고 만들어진 데이터 (Constructed data with a purpose)
      - 문서의 성격을 파악하는데 사용하기도 함
        - 제공자(author), 저작권(copyright), 키워드(keyword), 언어(language)
      - 사람보다는 기계를 위한 정보들이 주를 이룸

  - [HTML MetaData](https://developer.mozilla.org/ko/docs/Web/HTML/Element/meta)

    - `head`는 페이지를 열 때 웹브라우저에 표시되지 않는다.

      - `head` 는 `title` 이나 `CSS Link` `파비콘(favicon)` `메타데이터` 을 포함
        - 메타데이터 : 작성자, 중요한 키워드와 같은 HTML에 대한 내용

      ![](https://i.imgur.com/NiCvSMa.png)

      ​	해당 `메타데이터` 는 배달의 민족 웹페이지

    - **Specifying your document's character encoding**

      ```html
      <meta charset="utf-8">
      ```

      - 문서의 character incoding에 대해서 간단히 표시함
      - `utf-8` 전세계적인 character set (= 많은 언어 문자들을 포함)
      - 즉, 웹페이지에서 어떤 문자라도 취급할 수 있다는 것을 의미함

    - **Adding an author and description**

      ```html
      <meta name="author" content="Chris Mills">
      <meta name="description" content="The MDN Learning Area aims to provide
      complete beginners to the Web with all they need to know to get
      started with developing web sites and applications.">
      ```

      - 관리자를 정의하고 (author) 머릿말을 요약 (description) 하는데 유용하다
      - 저자를 지정하는 것은 컨텐츠 작성자에 대한 정보를 볼 수 있게 해줌
      - 일부 컨텐츠 관리 시스템에는 페이지 작성자 정보를 자동으로 추출해서 사요할 수 있는 기능이 존재함
      - 페이지 콘텐츠 관련 키워드를 포함시키는 것은 검색엔진에서 해당 페이지가 더 많이 표시 될 가능성이 생기게 할 수 있음 ([Search Engine Optimization, SEO](https://developer.mozilla.org/en-US/docs/Glossary/SEO))
      - `<meta name="keyword" content=""/>` 는 스팸으로 악용사례가 발생했기 때문에, 검색엔진에서 아예 무시하게 됨

    - **Other types of metadata**

      - [Open Graph Data](http://ogp.me/) : Facebook이 웹 사이트에 더 풍부한 메타데이터를 제공하기 위해 발명한 메타데이터 프로토콜

        ```html
        <meta property="og:image" content="https://developer.cdn.mozilla.net/static/img/opengraph-logo.dc4e08e2f6af.png">
        <meta property="og:description" content="The Mozilla Developer Network (MDN) provides
        information about Open Web technologies including HTML, CSS, and APIs for both Web sites
        and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
        <meta property="og:title" content="Mozilla Developer Network">
        ```

    - **맞춤 아이콘 추가하기**

      - 같은 디렉토리에 `.gif` 또는 `.ico` 포맷 파일을 저장

        ```html
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        ```

      - 해당 `link` 태그를 `head` 태그 안에 삽입

    - **기타 참고할 링크들**

      - [HEAD 영역 #2 - META 요소](http://webdir.tistory.com/308)

<br />

<br />

# HTML5 태그 의미 From [HTML 태그사전](https://opentutorials.org/module/552)

---

- #### section : 문서나 응용프로그램의 일반적인 섹션

  - 제목으로 시작하는 Content를 의미적으로 그룹핑하기 위해 사용됩니다.
  - section요소를 사용할 수 있는 예로는 챕터나 탭으로 구분된  **대화상자에서 탭된 페이지**, 또는 논문의 번호가 매겨진 색션이 될 수 있습니다. 홈페이지에서는 소개, 뉴스 아이템, 연락처등이 섹션으로 분리될 수 있습니다.
  - 요소의 컨텐츠를 배포해도 이치에 맞다면 **section요소대신 article요소를 사용할것을 권장**합니다.
  - section요소는 일반적인 컨테이너 요소는 아닙니다. 요소가 단순히 스타일링을 위한 목적이나 스크립팅의 편의를 위해서 필요할때 section요소보다는 div요소를 사용할것을 권장합니다.

- #### article : 문서내에서 독립적인 컨텐츠를 나타냅니다.

  - article요소는 포럼의 글이 될수도 있고, 잡지나 신문의 기사일 수도 있으며, 블로그의 글이나 사용자가 올린 의견이나 상호작용적인 위젯이나 가젯 또는 다른 **어떤 독립적인 아이템**등이 될 수 있습니다.
  - 하나의 문서 안에서 **여러개의 article**가 올 수 있습니다.