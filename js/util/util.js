const Util = {
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  changeAlgorithm(money) {
    const unit = [10000, 5000, 1000, 500, 100, 50, 10];
    const change = {};
    for (let v of unit) {
      if (money === 0) break;
      if (money / v >= 1) {
        change[v] = Math.floor(money / v);
        money = money % v;
      } else {
        money = money % v;
      }
    }
    return change;
  }
}

export { Util }