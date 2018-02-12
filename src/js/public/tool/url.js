/**
 * 地址栏操作类
 */

export default class Url {
  /* 获取全部参数 */
  static getParams(){
     let params = {};
     location.href.replace(/(\w+)=(\w+)/ig, (a, b, c) => (params[b] = decodeURIComponent(c)));
     return params;
  }
  /* 获取指定参数 */
  static getParam(name){
    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
  }
  /* 获取hash（不包括search部分）*/
  static getHash(){
    let hash = location.hash;
    return (~hash.indexOf('?') ? hash.split('?')[0] : hash ).slice(1).toLocaleLowerCase()
  }
}
