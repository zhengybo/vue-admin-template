/**
 * 正则验证
 */


export default class Reg {
  /* 邮箱验证 */
  static isEmail(str){
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str.trim())
  }
  /* 用户名验证 */
  static userName(str){
    return /^[\w]{4,12}$/.test(str.trim());
  }
  /* 密码验证 */
  static password(str){
    return /^[\w\s]{6,20}$/.test(str)
  }
}
