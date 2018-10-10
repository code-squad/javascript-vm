## 목표

테스트 코드를 작성한다

- [jest](https://jestjs.io/) 를 사용
- 유틸리티 함수 및 DOM 과 Event 를 테스트
- MVC 로 구현했다면, M,V,C 를 모두 각각 테스트
- 그외 클래스 형태라면 클래스별 골고루 테스트케이스를 작성

<br/><br/>

## 개발로그

1. **[JEST](https://jestjs.io/) 사용**

   코드스쿼드 강의에서 Mocha 와 Chai 로 Unit Test 를 하는 것을 배웠다. 일단은 Mocha 와 Chai 가 무엇을 하는건지 부터 나눠볼까 :)

   `Mocha`

   JavaScript 프레임워크로서 node, 브라우저, 비동기 테스트까지 할 수 있다. Mocha 테스트는 연속적으로 실행되므로, 유연하고 정확한 보고가 가능하다.

   `Chai`

   Node.js와 브라우저를 위한 BDD/TDD Assertion 라이브러리로, 자바스크립트 테스트 프레임워크와 함께 사용할 수 있다.

   `Jest`

   Jest는 Facebook에서 React 애플리케이션을 포함한 모든 JavaScript 코드를 테스트하는 데 사용되며, Jest의 철학 중 하나는 통합 된 "zero-configuration"경험을 제공하는 것이다. 우리는 엔지니어가 즉시 사용 가능한 도구를 제공받을 때 더 많은 테스트를 작성하게되고 결과적으로 더 안정적이고 건강한 코드 기반을 얻게된다는 것을 알게되었다.

   `npm install --save-dev jest`

   일단 Jest 를 사용하려면 install 을 해주어야 한다.

   그리고 presets 에서 es2015 를 사용하기 위해서는 `npm install babel-cli babel-preset-es2015` 명령어를 이용해 node_module 에 명령어들을 추가해줘야 된다.

   `package.json`

   "scripts" 부분에 "test" 를 "jest" 로 설정한다.

2. **일단은 Utility 부터 테스트 해보자**

   Utility 를 import 해야하는데 import 하는 과정에서 에러가 난다. 

   ![](https://i.imgur.com/MSPkCA3.png)

   JavaScript 에서는 CoffeeScript 처럼 **<u>비슷한 부류의 언어를 JavaScript 로 바꿔주는 것</u>**을 `트랜스파일` 이라고 한다.

   ES2015 의 트랜스파일러는 대표적으로 Traceur 과 [Babel](https://babeljs.io/) 이 존재한다. Bable 을 사용하고 싶다면 [Babel Preset](http://babeljs.io/docs/en/babel-preset-es2015) 을 참고하여, 설정을 해주어야 하는데 `npm install` 과 `.babelrc`  파일을 생성하는 것이다. 그러면 ES6(ES2015) 에서 사용하는 import 를 정상적으로 사용할 수 있을 것이다.

   그리고 import 할 때, export 를 Utility 로 명시하고, import 는 util 로 하려니 당연히 안받아진다는 것을 기억하자. as 를 사용하는 것 아니면 export 한 네이밍을 그대로 가져올 것을 명심하자.

3. **왠지 node_modules 폴더가 걸린단 말이지**

   `npm install` 을 통해서 모듈들을 설치하니 몇천개의 파일이 git 으로 수루룩 흘러들어갈 것만 같았다. 난 그것을 모른채 `git push` 를 진행했고, 이후 크롱한테 물어봤더니 gitignore 를 통해서.. 제외시켜야 했다.

   그래서 git을 한단계 무르고 `git reset HEAD^` 강제로 commit 을 날려주어서 node_modules 이 push 된 커밋을 무효화시킬 수 있다.

4. **test**

   querySelector 함수를 어떻게 테스트해야할지 잘 감이 안온다. HTML 연계가 되어있지 않아서, querySelector 을 날려도 undefined 만 출력된다. 

   snodeList를 만드는 방법이 있다. 노드는 `document.createElement` 를 사용해서 만들면 된다 (ex. div)

   ```javascript
   var list = singleNode(노드); // for example
   
   list instanceof NodeList; // true
   ```

   그리고 expected 에 배열을 새로 생성해서 push 해주었는데, 분명 똑같은 값이 나오는데 toBe 대신 toEqual 을 사용하라고 경고문이 출력된다.

   ![](https://i.imgur.com/DYuMpHz.png)

   나중에 Jest 개발문서를 참고해서 toBe 와 toEqual 의 차이점도 기술해야겠다.

   `toEqual`

   두 객체의 값이 같은지 확인하려는 경우에 사용한다. 객체 동일성을 검사하는 것이 아닌 모든 필드의 동등성을 재귀적으로 검사한다. 기본적으로 `toBe` 와 `toEqual` 은 다르게 동작한다.

5. **함수 테스트**

   함수테스트가 굉장히 어렵다. mock 이라는 객체(?)를 이용해야 하는데, 이것을 이해하기가 좀 힘들다. dummy data 를 만들어주는 것(?) 이라고만 인식하고 있는데, 조금 더 찾아보고 코드를 많이 봐야할 것 같다.

   `.toHaveBeenCalled()` `.not.toHaveBeenCalled()`

   모의 함수가 호출되었는지 확인하는데 사용한다. 

   `.toHaveBeenCalledTimes(number)`

   모의 함수가 정확한 횟수만큼 호출되었는지 확인하는데 사용한다.

   `.toHaveBeenCalledWith(arg1, arg2, ...)`

   모의 함수가 특정 인수로 호출되었는지 확인하는데 사용한다.

   `.dispatchEvent(event)`

   event 는 Event Object 로써 디스패치될 이벤트입니다. 

   `.event.preventDefault()`

   이벤트를 취소할 수 있는 경우, 이벤트 전파를 막지 않고 해당 이벤트를 취소합니다.

   테스트할 때 막히는 것을 차근차근 정리해보자.

6. **Log.test.js**
   - 일단 로그 관련된 부분은 `logView` 와 `logPresenter` 가 존재한다. `logPresenter` 는 `model` 과 연관되어 있으므로 전부 import 를 일단 진행하기로 했다.
   - 그리고 전역에 new 키워드를 사용해서 mainView, model, presenter, logView 를 선언하였다. (괜찮은 방법인지는 모르겠다, 왠지 안좋은 것 같긴한데 테스트라서 상관없나?)
   - beforeEach 함수는 `it` 으로 시작하는 함수가 시작될 때마다 실행하는 함수이다.
   - 특정 함수에 `jest.fn()` 을 설정하면, 모의함수가 생성된다.
   - `.mockReturnValue(value)` 는 `jest.fn()` 함수에서 적용 가능한 명령어이다.
   - 해당 함수의 반환값을 `toHaveReturnedWith(true, false)` 로 테스트 할 수 있다.
   - 이전에, 한번 해당 `jest.fn()` 함수를 호출해야한다.

7. **Control.test.js**

   - 클릭이벤트 등록 이벤트를 어떻게 테스트해야하는지 감이 잘 안온다.

   - expect(controlView.registerClickEventToProductClickNumBtn).toHaveReturned()

   - expect(controlView.registerClickEventToProductClickNumBtn.mock.calls.length).toBe(1)

     - 함수가 호출되는 카운트가 하나씩 체크됨

   - controlPresenter 의 생성자에서 버튼이벤트를 등록하는데, `TypeError: Cannot read property 'addEventListener' of null` 이라는 에러를 만날 수 있었다.

     - 해당 에러를 해결하는 방법은 생성자(constructor) 을 mock 형태로 만드는 것인데
     - jest.mock('해당 js 파일위치'); 로 상단부분에 선언해주면 된다.

     - `jest.mock('../Presenter/VendingMachineControlPresenter.js');`

   - 해당 ControlPresenter 에 mock 함수를 적용하니, 모든 함수들이 mock 함수로 바뀌었다.

   - 호출 후 `toHaveBeenCalledTimes(1)` 로 테스트를 진행하면, 정상적으로 통과한다.

   - 그런데, 이 호출횟수가 의미가 있는것인가?

   - 생성자에서 새로운 코드를 삽입하였다

   ```javascript
   const itemPanelDiv = this.util.getNodeData('#item-selector-panel');
   // if(!itemPanelDiv) throw new Error('NO EXIST NODE');
   if(!itemPanelDiv) return true;
   ```

   - 클릭이벤트를 등록하는 부분인데, 해당 `itemPanelDiv` 가 존재하지 않을 경우, 리턴시켜주는 코드로 동작하게 하였다.
   - jest 에서 테스트할 때, 정상적으로 진행되었다. 그래서 mock 함수로 대체된 함수들이 정상적으로 돌아왔고
   - model의 데이터를 통해 데이터를 지정하는 부분들이 정상적으로 진행되었다.

8. **describe**

   - `describe(name, fn)` creates a block that groups together several related tests in one "test suite".
   - 비슷한 테스트들을 그룹화 할 수 있는 함수
   - 맨 위에 `what is describe means?` 로 테스트 항목들에 대한 그룹을 지정할 수 있다

   ![](https://i.imgur.com/ejq2tS7.png)

9. **displayLog 함수를 제대로 테스트해보자**

   - displayLog 함수는 `로그 창에 로그를 표시(출력)합니다` 기능을 제공

   ```javascript
   // then
       expect(logView.createLogSenetence).toHaveBeenCalled();
       expect(logView.insertLogDivToLogWindow).toHaveBeenCalled();
       // expect(logView.displayLog).toHaveReturnedWith(true);
       expect(logView.displayLog.name).toEqual("displayLog");
   ```

   - 해당 테스트코드에서 displayLog 함수를 통해서 추가할 타겟이 없음

   - jest 의 beforeEach, beforeAll 메서드를 통해서 document 를 생성하는 것인가?

   - `console.log(document.body)` 를 출력해보면 `undefined` 가 출력됨

   - 이게 왜그러냐면, displayLog 함수는 아래와 같이 구성되어 있다.

     ```javascript
     displayLog(logData, mode) {
         logData = this.createLogSenetence(logData, mode);
         this.insertLogDivToLogWindow(logData);
     }
     ```

   - 여기서 logData 를 createLogSentence 함수를 통해서 바꾸는데, mock 함수로 지정되기 때문에 리턴값이 따로 정해지지 않아서 undefined 가 출력된다.

   - 해당 logData(undefined) 가 다음 insertLogDivToLogWindow 함수의 인자로 넘어가게 되는데, undefined 니까 함수가 제대로 동작할리 없음 + insertLogDivToWindow 함수도 mock 함수임

   - 그러니 둘다 동작할리 없음, mock 함수로 정의된 부분들을 잘 살펴야 함

   - 그러나, beforeAll 이든 beforeEach 던 document 에 노드들을 추가하는 과정은 정상적으로 됨

10. **test Code 의 beforeEach 던, beforeAll 이던, 여기에서 body 객체들을 추가하는 과정**

    - 기존 beforeEach

      ```javascript
      beforeAll(() => {
          const htmlData = '<div class="status-panel"></div>';
          document.body.insertAdjacentHTML('beforeend', htmlData);
      });
      ```

      자 여기서 `insertAdjacentHTML` 메서드가 호출될 수 있는 객체는 `element` 이다

      ![](https://i.imgur.com/HhbBHpt.png)

      자, 그러면 `querySelector` 은 어떨까

      ![](https://i.imgur.com/o0NomxI.png)

      jest 문제인지, javascript의 문제인지 무튼 beforeAll 구문에서 에러가 발생해도 에러문을 출력해주질 않음

      똑같은 구문을 크롬 개발자도구에서 실행했을 때, 에러가 출력됨

      ```javascript
      VM158:1 Uncaught TypeError: Failed to execute 'insertAdjacentElement' on 'Element': parameter 2 is not of type 'Element'.
      ```

      자, htmlData가 Element가 아니라는 뜻인데.. 일단 저 html data 구문은 틀렸다. (따옴표가 틀렸는지 뭐가 틀렸는지는 아직 모른다. 출처는 [여기](https://stackoverflow.com/questions/42628635/element-insertadjacenthtml-api-throws-error-in-chrome-55-0-2883-87))

      그럼 안전하게 Document.createElement로 생성해보자

      ```javascript
      const tempElement = document.createElement('div');
      // 그리고 class 를 추가할것이므로
      tempElement.classList.add('status-panel');
      // 그리고 tapElement 를 찍어보면 <div class="status-panel"></div> 출력되는것을 확인
      ```

      그리고 querySelector 에서의 구문자 중 `#` 은 **아이디**를 뜻하며, `.` 은 **클래스**를 뜻한다. (Comma-Class)

      결정적으로 Jest 에서는 insertAdjacentElement 메서드가 동작하지 않는다 [Why?](https://stackoverflow.com/questions/45833331/jest-can-not-deal-with-insertadjacentelement)

      그러므로 `document.querySelector('.status-panel')` 를 이용해서 Element 를 찾는 과정을 진행해야 한다.

      `console.log(JSON.stringify(element, ["id", "className", "tagName"]));`

      Element 들을 보기좋게 출력하는 방법. 여기서 classList 를 출력해보면, 아까 classList.add 를 통해서 추가한 'status-panel' 를 확인할 수 있을것이다.

      `appendChild` 를 통해서, 노드를 추가한 후 `childNodes[idx]`를 통해 노드를 가져온 후 해당 classList 든, innerHTML 을 이용해서 데이터를 출력하면 된다.



<br/>
<br/>

## 디버깅

<br/>
<br/>

## 피드백

1. bable은 무엇이고, 왜 필요한지?
   1. `"presets": ["es2015"]` 해당 옵션은 무엇을 뜻하는지 알아둘 것
2. 모델에 모든 getter/setter 이 필요하진 않음
3. prototype 에 대한 특징과 메모리효율 측면에서 알아둘 것
4. jest 는 Jest의 철학 중 하나는 통합 된 "zero-configuration"경험을 제공하는 것
5. jest 에서 테스트할 때, model, view, controller 같은 것들을 전역으로 선언해도 되지만 beforeAll 이나 jest의 공식 doc에 존재하는 함수들을 이용하는 편이 좋을 수 있음
6. describe 메서드 사용해보기 (모든 테스트 코드에서 공통적으로 사용되는 함수)
7. magic number 의 사용을 자제하자
   - 한자리나 두자리 정도의 상수들은 변수를 통해서 잘 처리하는 것 같은데, 천단위가 넘어가는 부분들은 그대로 magic number 의 사용을 하는 것
8. mock 함수의 사용을 자제할 것
   1. 진짜 테스트 할 수 있는 것은 진짜로 테스트 할 것
      - node 의 classList 확인
      - element 의 변경된 데이터 (innerText 등) 확인

<br/>
<br/>

## 질문

1. displayLog 함수를 분리하기 위해서 2개의 메소드로 나눴습니다.

   그러면 displayLog 함수대신 안에 존재하는 각각의 메소드를 테스트하면, displayLog 함수는 굳이 테스트를 할 필요가 없다고 생각되는데요. 옳은 방향인가요?

2. clickEvent 같은 경우는 어려운 테스트인가요? 대부분 인터넷을 찾아보니까 Jest.mock 함수로 대체하고 몇번 불렸는지 테스트하는 식으로 하던데 이런 방법으로 하면 되는건가요?

   ```javascript
   import React from 'react';
   import { shallow } from 'enzyme';
   import Button from './Button';
   
   describe('Test Button component', () => {
     it('Test click event', () => {
       const mockCallBack = jest.fn();
   
       const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
       button.find('button').simulate('click');
       expect(mockCallBack.mock.calls.length).toEqual(1);
     });
   });
   ```


<br/>
<br/>