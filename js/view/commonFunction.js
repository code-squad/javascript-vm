class CommonFunction {
  constructor() {

  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  createListByClassName(parentClass, childClass) {
    const list = document.createElement('ul');
    list.className = childClass;
    document.querySelector(`.${parentClass}`).appendChild(list);
  }

}