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

  static throttle(fn,time){ // 缓存函数
    let timer = null;

    return function(){

    }
  }
}
