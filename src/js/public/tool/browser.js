/**
 * 扩展bom
 */
export default class Browser {

  static getStyle(elem , attr, value){
    let res = getComputedStyle ? getComputedStyle(elem)[attr] :elem.currentStyle[attr];
    return value === true ? parseInt(res) : res;
  }

  static $(name,more){
    if(!name.indexOf('#')){
      return document.querySelector(name);
    }
    return more ? document.querySelectorAll(name) : document.querySelector(name)
  }
}
