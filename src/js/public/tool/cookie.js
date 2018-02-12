/**
 * Cooike类
 */
export default class Cookie {
  static getCookie(name){
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    return (arr=document.cookie.match(reg)) ? unescape(arr[2]) : null
  }

  static setCookie(name , value , days){
    let exp = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    document.cookie = `${name}=${escape (value)};${days ? (";expires="+ exp.toGMTString()) : ''};`;
  }

  static deleteCookie(name){
    document.cookie = `${name}='';expires=${new Date().toGMTString()}`;
  }
}
