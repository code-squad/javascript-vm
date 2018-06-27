const beverage = [{
  name: '콜라',
  price: 500
}, {
  name: '사이다',
  price: 1000
}, {
  name: '파인애플맛 환타',
  price: 400
}, {
  name: '포도맛 환타',
  price: 300
}, {
  name: '레몬에이드',
  price: 900
}, {
  name: '봉봉',
  price: 1200
}, {
  name: '코코아주스',
  price: 1000
}, {
  name: '콜라제로',
  price: 1000
}, {
  name: '파워에이드',
  price: 2000
}, {
  name: '초코우유',
  price: 1000
}, {
  name: '초코우유2',
  price: 7000
}, {
  name: '초코우유3',
  price: 600
}, {
  name: '딸바주스',
  price: 1000
}, {
  name: '바나나우유',
  price: 500
}, {
  name: '커피우유',
  price: 1000
}, {
  name: '알로에',
  price: 1200
}, {
  name: '콘칩',
  price: 1000
}, {
  name: '새우깡',
  price: 1000
}, {
  name: '감자칩',
  price: 2000
}, {
  name: '칸쵸',
  price: 1000
}, {
  name: '아몬드',
  price: 450
}, {
  name: '다크초콜릿',
  price: 1500
}, {
  name: '가나초콜릿',
  price: 1200
}, {
  name: '견과류',
  price: 900
}, {
  name: '육포',
  price: 1000
}, {
  name: '오징어포',
  price: 900
}, {
  name: '미니땅콩',
  price: 4000
}, {
  name: '오징어',
  price: 2300
}, {
  name: '{고장}',
  price: 1000
}, {
  name: '신라면',
  price: 700
}, {
  name: '진라면',
  price: 800
}, {
  name: '포도맛 환타',
  price: 1000
}]

class Display {
  constructor(beverage) {
    this.beverage = beverage;
  }
  displayBeverage() {
    const beverageList = document.createElement('ul');
    beverageList.className = 'beverageListContainer';
    document.querySelector('.beverageDisplay').appendChild(beverageList);
    this.beverage.forEach((ele, idx) => {
      let item = document.createElement('li');
      let list = beverageList.appendChild(item);
      const beverageContainer = document.createElement('div');
      beverageContainer.className = 'beverageContainer';
      list.appendChild(beverageContainer);
      let beverageName = document.createElement('div');
      beverageName.className = 'beverageName';
      let beveragePrice = document.createElement('div');
      beveragePrice.className = 'beveragePrice';
      beverageName.innerHTML = ele.name;
      beveragePrice.innerHTML = `${idx + 1}. ${ele.price}`;
      beverageContainer.appendChild(beverageName);
      beverageContainer.appendChild(beveragePrice);
    })
  }
}

const displayItem = new Display(beverage);
displayItem.displayBeverage();