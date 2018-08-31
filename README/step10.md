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





<br/>
<br/>

## 디버깅

<br/>
<br/>

## 학습

<br/>
<br/>

## 질문

<br/>
<br/>