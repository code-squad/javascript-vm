const Util = {
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  toggleClass(node, targetClass, option) {
    if (!node.classList.contains(targetClass)) {
      node.classList.add(targetClass);
    }
  }
}