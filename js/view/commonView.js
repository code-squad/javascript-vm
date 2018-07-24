const CommonView = {
  createListByClassName(parentClass, childClass) {
    const list = document.createElement('ul');
    list.className = childClass;
    document.querySelector(`.${parentClass}`).appendChild(list);
  }
}