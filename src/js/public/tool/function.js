/**
 * 扩展通用 函数
 */
export default class Functioned {

  /* 一次执行函数 */
  static once (fn) {
    let called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    }
  }

  /* 奇偶函数 默认奇次执行 */
  static parity (fn, odd = true) {
    let flag = odd;
    return function(){
      flag = flag ? (fn.apply(this, arguments), false) : true
    }
  }
  
  /* 缓存函数 在减少没有必要的连续执行函数的次数 */
  static throttle(fn,interval,immediate = false){
    let timer = null;
    return function(){
      if(timer)return;
      timer = setTimeout(() => {
        fn();
        timer = null;
      }, interval);
      if(immediate){
        fn();
        immediate = false;
      }
    }
  }
}
