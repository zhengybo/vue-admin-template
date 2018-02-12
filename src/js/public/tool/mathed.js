/**
 * 扩展数学函数
 */

export default class Mathed{
  static random(min , max){
    return Math.floor(Math.random() * (max - min) + min);
  }

  static getRamdoms(n,min,max){
    return new Array(n).fill('').map(()=>Mathed.random(min,max))
  }
}
