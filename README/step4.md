# 목표

- 우측 지갑영역에서 동전이나 지폐를 선택하면 크롬개발자도구-콘솔에 선택금액을 출력한다
- MV* 를 적용한다
  - 역할을 정의하고, 각각의 역할을 Class로 구현
  - ES6 에서 제시한 Classes 문법을 사용
  - Model 부분과 View 부분을 분리
  - Model 과 View 관계를 느슨하게 만들기

<br/>

<br/>

# 개발 LOG

button은 각 div 안에 구성되어 있으며 class 로 ui-item-base 를 가지고 있다.

className 으로 ui-item-base 를 찾게되면, node list 로 7개가 나올텐데 여기에 각각 이벤트를 달아줘야 하는것인가 ?

- 일단 다른방법이 생각 안난다. 7개의 버튼에 이벤트를 달자

- 아 이런, 옆쪽에 수량을 표시하는 div 도 ui-item-base class 를 적용받고 있어서 같이 출력댐
- 그래도 순차적으로 나오기 때문에 짝수(0-2-4 ...)만 골라서 하면 될 듯
- 아니면, 더 가독성이 쉽도록 nodeName 을 이용해도 될듯 ("BUTTON" 와 "DIV" 로 구분되기 때문에)

View 에서 이벤트를 등록하는 방법으로 구현해볼까?

- Model
  - 지갑의 총액
- View
  - 이벤트 등록
  - 일단은 Console Log 출력
  - 지갑의 총액 바뀌도록 (추후)
- Controller
  - 버튼 눌리면 지갑의 총액에 돈 넣어주는 것

HTML Collection 에서 forEach 를 쓰고싶은데..? [HTML Collection Elements 에서 Foreach 에 대한 Update Log](https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements)

![](https://i.imgur.com/pEBWzs9.png)

크롬 개발자도구는 최고다. 잘 이용해서 속성들을 알아낸 다음 (innerHTML, innerText) 코드로 구현하는 방식을 채택하는데 너무 편하다.

<br/>

<br/>

# [ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

- 클래스는 호이스팅(Hosting)되지 않음

  - 그러므로, 클래스를 선언하고 액세스 해야 함

- Class명.name : 해당 클래스의 이름을 출력함

- 클래스 내에서는 자동으로 엄격 모드로 선언됨

- Getter

  ```javascript
  class Rectangle {
      constructor(height, weight) {
          this.height = height;
          this.width = width;
      }
      // Getter
      get area() {
          return this.calcArea();
      }
      calcArea() {
          return this.height * this.width;
      }
  }
  
  const suqare = new Rectangle(10, 10);
  
  console.log(square.area); // 100
  ```

- Static method 는 응용 프로그램의 유틸리티 함수를 만드는데 자주 사용됨

  ```javascript
  class Point {
      constructor(x, y) {
          this.x = x;
          this.y = y;
      }
      
      static distance(a, b) {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          
          return Math.hypot(dx, dy);
      }
  }
  
  const p1 = new Point(5, 5);
  const p2 = new Point(10, 10);
  
  console.log(Point.distance(p1, p2)); // 7.0710678118654755
  ```

- Boxing with prototype and static methods

  ```javascript
  class Animal {
      speak() {
          return this;
      }
      static eat() {
          return this;
      }
  }
  
  let obj = new Animal();
  obj.speak(); // Animal {}
  
  let speak = obj.speak;
  speak(); // undefined
  
  Animal.eat() // class Animal
  let eat = Animal.eat;
  eat(); // undefined
  ```

  obj.speak 처럼 메소드가 값이 없이 어떤 변수에 담겼을 때는 `undefined` 가 반환됨

  ```javascript
  function Animal() { }
  
  Animal.prototype.speak = function() {
      return this;
  }
  
  Animal.eat = function() {
      return this;
  }
  
  let obj = new Animal();
  let speak = obj.speak;
  speak(); // global object
  
  let eat = Animal.eat;
  eat(); // global object
  ```

- instance properties ?

  ```javascript
  class Rectangle {
    constructor(height, width) {    
      this.height = height;
      this.width = width;
    }
  }
  ```

  ```javascript
  Rectangle.staticWidth = 20;
  Rectangle.prototype.prototypeWidth = 25;
  ```

  클래스 특성 및 프로토타입 데이터 특성은 Class 외부에서 정의되어야 함 (왜 그런지는 모르겠음)

- extends 를 이용한 Sub Class

  ```javascript
  class Animal { 
    constructor(name) {
      this.name = name;
    }
    
    speak() {
      console.log(this.name + ' makes a noise.');
    }
  }
  
  class Dog extends Animal {
    constructor(name) {
      super(name); // call the super class constructor and pass in the name parameter
    }
  
    speak() {
      console.log(this.name + ' barks.');
    }
  }
  
  let d = new Dog('Mitzie');
  d.speak(); // Mitzie barks.
  
  /* Function */
  function Animal (name) {
    this.name = name;  
  }
  
  Animal.prototype.speak = function () {
    console.log(this.name + ' makes a noise.');
  }
  
  class Dog extends Animal {
    speak() {
      console.log(this.name + ' barks.');
    }
  }
  
  let d = new Dog('Mitzie');
  d.speak(); // Mitzie barks.
  ```

- extends 상속으로 부모의 메서드를 호출할때는 `speak.부모메소드명()` 를 사용한다

- Mix-ins (뭔지 모르겠음)

  ```javascript
  let calculatorMixin = Base => class extends Base {
    calc() { }
  };
  
  let randomizerMixin = Base => class extends Base {
    randomize() { }
  };
  ```

  ```javascript
  class Foo { }
  class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
  ```

- [Mix-ins](https://javascript.info/mixins)