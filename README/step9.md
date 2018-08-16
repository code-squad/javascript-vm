## e목표

1. localhost server / import-export 적용

2. Prototype 패턴으로 변경

3. Event Delegation 방식 적용

   반복문을 통해서 등록했던 Event 등록방식을 Delegation 방식으로 적용한다.

4. DOMContentLoaded 적용

<br/>
<br/>

## 개발로그

1. **[Localhost server with nodeJS](http://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server)**

   엄청 간편하다. node JS 를 설치하고, 해당 HTML 폴더에 접근해서 `http-server` 만 해주면 동작이 된다. 아래와 같이 접속하면 Header 정보가 출력됩니다.

   ![](https://i.imgur.com/DbsFhll.png)

   뭔가 코드를 수정할 때마다, 서버는 바뀌는데 Chrome이 Cache때문에 그런가, 값이 바뀌지 않는다. 그래서 Private Mode를 이용하면서 계속 껐다켰다 하고 있는데 불편하다. 방법이 있을것 같은데... 하면서 찾아보니 역시 방법이 있었다. Chrome에서 `Disable cache (while DevTools is open)` 이라는 속성이 있었다. 크롬 개발자도구에서 F1을 누른다음 Network 항목에서 찾을  수 있었다.

   <br/>

2. **Import-export 적용**

   이 부분은 MVP 구조를 적용하면서 많이 늘어난 View와 Presenter가 script 태그를 통해서 여러개로 호출되는 것을 수정하기 위함이다. 내 코드에서는 14줄의 script 태그가 존재했으며, 이것을 1줄의 script 태그로 바꿀것이다. 그 과정에는 import와 export를 사용할 것인데, ES6 Module 라는 키워드를 가지고 있다.

   ![](https://i.imgur.com/8C6gVBd.png)

<br/>

3. **Prototype 패턴으로 변경**

   특정 클래스 한가지만 prototype으로 변경할 것이다. 클래스를 정하기 전에 prototype 이 필요한 클래스를 잘 선별해야 할 것 같다. prototype의 역할은, 계속해서 new 키워드를 사용할 때, 안에 존재하는 함수가 메모리 측면에서 불이익을 얻기 때문에(= 계속 생성됨), prototype 으로 연결하는 것이라고 간단하게 말할 수 있을 것 같다.

   나의 웹 자판기 코드에서는 VendingMachineWalletPresenter 을 prototype 패턴으로 변경해볼 것이다. 일단 Class의 구조를 해체하고, 변수 타입을 const로 지정하였다. Class 내에서 존재하는 생성자(Constructor) 을 해당 변수에 객체형태로 담았다.

   ```javascript
   const VendingMachineWalletPresenter = (util, model, view) => {
       this.model = model;
       this.util = util;
       this.itemView = view.getItemView();
       this.walletView = view.getWalletView();
       this.logView = view.getLogView();
       this.walletView.registerClickEventToInsertMoneyBtn();
   }
   ```

   그리고 나머지 함수들은 .prototype 으로 선언해주었다.

   ```javascript
   VendingMachineWalletPresenter.prototype = {
       /**
        * 자판기에 돈을 투입합니다
        * @param {number} money - 금액 데이터
        */
       insertMoneyToVendingMachine: () => {
           this.model.decreaseWalletMoney(money);
           if (!this.isPossibleInvestMoney(money)) return false;
           this.model.increaseInvestedMoney(money);
           this.walletView.refreshWalletMoney(this.model.getWalletMoney());
           return true;
       },
       ...
   ```

   이렇게 변경 후에, 상위 JavaScript 에서의 선언을 변경해주었다. Class 에서 new가 아닌 import 명으로 해야되는 것인 줄 알았는데 아니였다. 객체를 새로 생성하는 것이니까 new 키워드가 필요하다. 아니면 Object.create 함수를 사용해야 한다.

   [객체 리터럴의 ECMASCript 2015 표기법](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer) 을 참고하면 좋을 것 같다. 기존은 `함수명: function() {}` 이였다면, `함수명() {}` 으로 축약할 수 있다. 확실히 가독성도 좋아지는 것 같다.

   ```javascript
   // 단축 속성명 (ES6)
   var a = "foo", b = 42, c = {};
   var o = { a, b, c };
   
   // 단축 메서드명 (ES6)
   var o = {
     property([parameters]) {},
     get property() {},
     set property(value) {},
     * generator() {}
   };
   
   // 속성 계산명 (ES6)
   var prop = "foo";
   var o = {
     [prop]: "hey",
     ["b" + "ar"]: "there",
   };
   ```

   <br/>

4. **Event Delegation 방식 적용**

   반복문을 통해서 등록했던 Event 방식을 교체해보자. 아래는 현재 내가 WalletView 에서 금액을 투입하는 버튼에 대해 이벤트를 적용한 코드이다.

   ```javascript
   // Delegation 방식 적용 전
   registerClickEventToInsertMoneyBtn() {
       const moneyInputBtnList = this.util.getNodeData('.ui-item-base', 'all');
   
       for (let node of moneyInputBtnList) {
           if (node.nodeName !== "BUTTON") continue;
           node.addEventListener("click", this.insertMoneyBtnHandler.bind(this, node));
       }
   }
   ```

   현재에는 money-panel 이라는 id 를 가진 section 태그에 각 금액의 div가 배치되어 있다. 그러니까 `section > div >  button` 이다. 그런데 금액 버튼 옆에 돈을 표시하는 div 도 배치되어 있기 때문에 `section > div > div` 버블링을 통해서 nodeType을 구분하고, 각 버튼에 이벤트를 등록할 예정이다.

   일단 상위 section 을 찾고, debugger을 걸어본 후, 인자로 들어오는 e 의 정보를 좀 살펴보겠다.

   ![](https://i.imgur.com/uwpqNk7.png)

   e 는 MouseEvent 라는 속성을 가지고 있다. 여기서 `e.target` 과 `e.currentTarget` 정보를 확인할 수 있는데, `e.target` 을 통해서 내가 클릭한 버튼을 알아낼 수 있는 것 같다. section 태그에 존재하는 하위태그들에 대한 이벤트는 전부 동작하므로, nodeName 타입을 통해서 BUTTON 만 걸러 이벤트를 등록해야겠다.

   ```javascript
   // Delegation 방식 적용 후
   registerClickEventToInsertMoneyBtn() {
   
       const walletSection = this.util.getNodeData('#money-panel');
   
       walletSection.addEventListener("click", (e) => {
           if (e.target.nodeName !== 'BUTTON') return;
           this.insertMoneyBtnHandler(e.target);
       });
   }
   ```

   위와 같이 선택한 객체 (e.target) 을 넘겨주어, handler 에서 이후의 작업을 진행하는 식으로 구현하였다.

   <br/>

   다음은 Item 버튼인데, 이것 역시 배열을 만들어서 이벤트를 등록하고 있다. nodeList 를 또 array 로 만들기 때문에 성능상에서도 약간의 불이익이 존재한다. 이것을 Delegation 방식을 이용해서 하면 확실히 성능 부분에서 이득을 볼 수 있을 것 같다. 바로 시작해보겠다.

   일단 HTML 구조부터 파악하면 item-selector-panel (div) 태그 안에 각각의 번호를 담는 column div가 존재하고 안에 3개씩 버튼이 존재한다. 

   

5. **DOMContentLoaded 적용**

   이미 app.js 에서 적용했으므로, 해당 부분은 건너뛰어도 될 듯 하다.

   

<br/>
<br/>

## 디버깅

```
the server responded t with a status of 404 (Not Found)
```

해당 에러는 말 그대로 404 에러다. 무엇인가를 찾을 수 없다는 것인데, 경로가 잘못되었거나 파일명이 잘못되었을 확률이 매우 크다. 코드를 수정 후 새로고침을 반복해서 해도 똑같은 에러가 출력될 때가 있다. 그럴 때는 크롬을 Private mode 로 동작시키거나 캐시를 날려주면 된다. 여기서 계속 껐다켜야 하는 부분에 대한 해결책은 개발로그 1번을 참고하면 된다.

<br/>

```javascript
// VendingMachineMainPresenter.js
...
[v] this.walletPresenter = new VendingMachineWalletPresenter(util, model, view);
...
```

```javascript
// VendingMachineWalletPresenter.js
const VendingMachineWalletPresenter = (util, model, view) => {
    this.model = model;
    this.util = util;
    this.itemView = view.getItemView();
    this.walletView = view.getWalletView();
    this.logView = view.getLogView();
    this.walletView.registerClickEventToInsertMoneyBtn();
}
...
```

[v] 로 표시한 코드에서 `VendingMachineWalletPresenter is not a 'VendingMachineMainPresenter' constructor` 라는 에러를 출력한다. 생성자를 가지고 있지 않다는 얘기이다. 분명 new 키워드를 사용했으므로 생성자를 가지고 있어야 하는데 (생성자의 자격이 있어야 함) 생성자가 없다는 것인가? 그래서 찾아보았다.

![](https://i.imgur.com/UMAYg3K.png)

[화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98) 표현은 기존의 function 을 대체하는 부분에서 짧으면서도 막강한 기능들을 가지고 있지만, 자신의 this, arguments, super 또는 new.target 을 바인딩 하지 않는다. 그리고 화살표 함수는 항상 익명이기 때문에, 생성자로서 사용할 수 없다.

<br/>

루프가 돌지 않은곳에서 `continue` 를 쓴다면 `Illegal continue statement: no surrounding iteration statement` 와 같은 에러를 만날것이다. 내가 헷갈렸던 것은 addEventListener 을 등록하는 부분이였는데, 뭔가 여러개가 이벤트리스너에 의해 동작해서 반복(?) 한다고 착각했다. 끝내고 싶다면 `return` 으로 동작시켜야 한다. 뭐, Error 문에서 쉽게 고칠 수 있었지만, 항상 인지하고 코딩할 것! (에러를 줄이자)

<br/>
<br/>

## 학습

1. **DOMContentLoaded 이벤트**

   > 우리가 웹사이트를 접속했을 때, 컨텐츠가 서버로부터 계속 내려온다(HTML Parsing)
   >
   > HTML Parsing -> CSS -> JS -> Image -> HTML, CSS 분석 (배치결정, layout) -> 렌더링 -> 화면에 뿌려줌

   브라우저가 무엇인가를 하고있는데, 중간에 JavaScript가 노드를 추가한다던가, 삭제하는 작업을 일어나게 하면 여러가지 에러가 발생할 수 있는 경우가 많아진다. 그래서 HTML코딩을 진행하고 맨 아래쪽에 JavaScript를 위치시켜놓는 것이 일반적이다. 보통 body 태그가 닫히기 전에 위치시킨다. 그래서, 브라우저가 DOM Tree를 그리고 나서 해당 시점을 개발자가 알 수 있다면 JavaScript와 HTML의 충돌(에러)없이 작업을 할 수 있다. 가장 일반적인 방법이다.

   ```javascript
   function init () {
       // 작업내용들
   }
    
   document.addEventListener('DOMContentLoaded', init);
   ```

   addEventListener 은 document 에 존재하는 메서드이다. document 객체를 이용해 이벤트를 장착시키는 방식으로 생각하면 된다. 이벤트핸들러 메서드를 상단에 따로 선언하는 이유는 DOM을 접근하는데 안전한 방식이기 때문이다.

   Load이벤트 이후에 작업하는 것들은 이미지가 다 보이고 나서 사용자에게 알람을 보여주는 작업 등 이 있을 수 있으나, JavaScript는 DOMContentLoaded를 사용하는 것에 중점을 맞추면 될 것 같다.

   HTML의 script 태그에는 async 와 defer 라는 속성이 존재하는데, 이를 이용하면 DOM 로딩을 방해하지 않고 JavaScript를 다운로드 받고 실행할 수 있다. ([참고](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html))

   <br/>

2. **JS 이벤트 위임**

   [코드스쿼드 MV* 역할 나누기](https://antaehyeon.github.io/devlog/2018/07/14/%EC%BD%94%EB%93%9C%EC%8A%A4%EC%BF%BC%EB%93%9C-MV%EC%97%AD%ED%95%A0%EB%82%98%EB%88%84%EA%B8%B0/) 글에서 `Event Delegation` 이라는 부분을 학습했었는데, 그 때는 HTML을 본격적으로 다루기 전이라 어떤내용인지 와닿지 않았다. 그런데 DOM과 Event부분을 조금 다루고 나니, 확실히 이벤트 위임을 어떤 방식으로 해야 더 효율적인지에 대해서 생각할 수 있게 되었다.

   ```javascript
   ul.addEventListener("click",function(evt) {
       console.log(evt.currentTarget, evt.target);
   });
   ```

   **Event Delegation** 은 하위 요소에 각각 이벤트를 붙이지 않고, 상위요소에서 하위요소의 이벤트를 제어하는 방식이다. 그 방식의 중점은 target 정보이다. HTML 구성이 `ul > li > img` 형태로 되어있다면 **이벤트 버블링** 에 의하여 하위 엘리먼트에서 상위 엘리먼트로 올라가면서 이벤트 리스너가 있는지 찾는 과정을 진행한다. 

   비슷하게 **이벤트 캡쳐링** 도 존재하는데, 이벤트가 반대로 발생하는 것이다. 상위 엘리먼트에서 하위 엘리먼트로 내려가면서 이벤트 리스너가 있는지 찾는 과정을 진행하는 것이다. 캡쳐링 단계에서 이벤트를 발생시키고 싶다면, addEventListener 메서드의 3번째 인자에 값을 true 로 주면 된다.

   <br/>

3. **Prototype Design Pattern (ES5)**

   함수를 new 키워드로 호출하면 객체를 반환하는데 이것을 생성자(Constructor)라고 부른다. 해당 생성자를 통해서 동적으로 변경되는 객체를 만들 수 있다. 

   ```javascript
   function Health(name, lastTime) {
     this.name = name;
     this.lastTime = lastTime;
     this.showHealth = function(){...}
   }
   const h = new Health("달리기", "10:12");
   ```

   위와 같이 사용할 수 있지만, 인스턴스가 여러개 생성될 때 매번 중복된 showHealth 메서드가 여러개 생성된다. 메모리 효율성 측면에서 좋지 않은 방법이여서 뒤에 나오는 prototype은 이런 문제를 개선했다.

   ```javascript
   function Health(name, lastTime) {
     this.name = name;
     this.lastTime = lastTime;
   }
    
   var healthObj = {
     showHealth : function() {
       console.log(this.name + "님, 오늘은 " + this.lastTime + "에 운동을 하셨네요");
     }
   }
    
   Health.prototype = healthObj;
   ```

   생성자의 prototype 객체(Health.prototype)에 다른 객체(healthObj)를 연결한 코드이다.

   ```javascript
   var myHealth = new Health("달리기", "20:00");
   myHealth.showHealth();
    
   var myHealth2 = new Health("자전거", "18:11");
   myHealth2.showHealth();
    
   var myHealth3 = new Health("수영", "19:25");
   myHealth3.showHealth();
   ```

   new 키워드를 통해서 this 에 할당된 속성과 prototype 속성을 하나의 객체로 묶어서 반환한다.

   ```javascript
   myHealth => 
       name : "달리기", 
       lastTime : "23:10", 
       > __proto__ : Object
           showHealth: ()
           > __proto__: Object
   ```

   **\__proto__** 는 prototype 객체를 표현한 것이고, 모든 객체는 prototype 으로 연결되어 있어서 prototype 안에 있는 어떤 메서드를 사용하면 prototype을 타고 올라가면서 찾는다. 이것을 prototype 체인이라고 한다.

   ```javascript
   myHealth.__proto__ === myHealth2.__proto__  //true
   myHealth2.__proto__ === myHealth3.__proto__  //true
   //__proto__ 객체는 자바스크립트 내부에서만 사용되는 속성이다.
   ```

   prototype은 효과적으로 동작한다. new 를 통해 생성된 객체(인스턴스)들이 여러개 존재한다 하더라도, prototype에 연결된 객체들은 동일한 메모리 공간에서 효율적으로 재사용된다. 즉, 두 객체의 prototype 은 같으며, prototype 객체는 최상위 객체까지 연결되어 있어서, prototype 연결고리를 통해 객체간의 상속관계를 만들 수 있다.

   자바스크립트에서의 new는 보통 Class에 사용하는데, 이것을 함수에 사용하고 prototype을 이어버리니 어색한 부분이 존재한다. 생성자와 new 키워드 없이 순수한 JavaScript 객체생성 방법을 소개한다.

   ```javascript
   var healthObj = {
     showHealth : function() {
       console.log(this.name + "님, 오늘은 " + this.lastTime + "에 운동을 하셨네요");
     }
   }
    
   var myHealth = Object.create(healthObj);
    
   myHealth.name = "달리기";
   myHealth.lastTime = "23:10";
   
   ```

   

   위와 같이 Object.create 메서드를 통해서 new 키워드 없이 사용할 수 있다. 뭐 따로 makeObject 함수를 만들어서 범용적으로 사용해보는 것도 좋을 듯 하다.

   ```javascript
   var fum = new Fum();
   // ...
    
   if (Fi.prototype.isPrototypeOf(fum)) {
     // do something safe
   }
   ```

   

   위와 같이 prototype 관계를 확인하는 API 를 확인할 수 있다.

   ```javascript
   var dict = Object.setPrototypeOf({}, null);
   ```

   ES6 에서 프로토타입을 지정하는 새로운 방식을 살펴볼 수 있다. [setPrototypeOf](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 함수를 통해서 지정할 수 있는데 아래 예제를 통해서 이해하도록 하자.

   ```javascript
   function Mammal() {
     this.isMammal = 'yes';
   }
   
   function MammalSpecies(sMammalSpecies) {
     this.species = sMammalSpecies;
   }
   
   MammalSpecies.prototype = new Mammal();
   MammalSpecies.prototype.constructor = MammalSpecies;
   
   var oCat = new MammalSpecies('Felis');
   
   console.log(oCat.isMammal); // 'yes'
   
   function Animal() {
     this.breathing = 'yes';
   }
   
   Object.appendChain(oCat, new Animal());
   
   console.log(oCat.breathing); // 'yes'
   ```

   프로토타입에 Chain을 설정하는 흐름이다. 

   ```javascript
   var healthObj = {
     showHealth : function() {
       console.log(this.name + "님, 오늘은 " + this.lastTime + "에 운동을 하셨네요");
     }
   }
   
   function Health(name, lastTime) {
     return {
       name : name,
       lastTime, lastTime
     }
   }
   
   var myHealth = Health("달리기","23:10");  //객체를 받고,
   Object.setPrototypeOf(myHealth, healthObj);  //prototype객체에 추가하고
   
   myHealth.showHealth();
   ```

   위와 같이 prototype의 사용성을 개선할 수 있다.

   우리가 자주 겪고, 보았던 객체지향적인 언어의 문법에 익숙한 Class 형식을 ES표준에 포함시켰다. 그러나, JavaScript의 Class도 결국 prototype chain을 활용해서 동작한다는 것을 알고있어야 한다.

   <br/>

4. **테스트코드 작성법**

<br/>
<br/>

## 질문

1. Class 는 prototype chain 이용하여 구성된 형식인데, 이것에 대해 prototype 으로 변경하려면, Class 구조를 해제하고 함수 형식으로 가는게 맞는가?



















