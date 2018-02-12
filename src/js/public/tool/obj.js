/**
 * 扩展Object 函数 继承Object
 *
 */

export default class Obj extends Object{
    /**
     * 兼容性 Object assign
     */
  static assign(){
    function _merge(target,obj){
      for (var attr in obj) {
        target[attr] = obj[attr]
      }
      return target;
    }
    var result = arguments[0];
    Array.prototype.slice.call(arguments).splice(1).forEach(function(obj){
      _merge(result , obj);
    });
    return result;
  }
    /**
     * 判断是不是一个 普通对象({}) 对象
     */
  static isObject(obj){
    return !!~Object.prototype.toString.call(obj).indexOf('Object');
    // const itf = (t , a) => a.some(v => !(t instanceof v));
    // return typeof obj == 'object' &&
    //        itf(obj , [Date , Error , Array , RegExp , String , Math , Event]);
  }

    /**
     * 深度遍历对象并合并 merge(obj1 , obj2 , obj3 ....) (数组等会直接覆盖)(右->左)
     */
  static merge(){

    const _merge_ = (target,obj) => { //单独合并方法
      Object.keys(obj).forEach(key => {

        if(Obj.isObject(obj[key]) && Obj.isObject(target[key])){ //两个都是对象
          Obj.merge(target[key],obj[key]);
          return ;
        }
        if(Obj.isObject(obj) || Obj.isObject(target)){ //其中一个是对象
          target[key] = obj[key];
          return;
        }
      })
      return target;
    }

    let result = arguments[0];
    [...arguments].splice(1).forEach((obj) => _merge_(result , Obj.isObject(obj) ? obj : {}));
    return result;
  }

  /**
   * 清理为空的项
   * self 表示是否是操作自身
   */

  static clear(obj,self){
    obj = !self ? JSON.parse(JSON.stringify(obj)) : obj;
    Object.keys(obj).forEach(key => obj[key] === '' && delete obj[key])
    return obj;
  }

  /**
   * 合并一个目标到指定目标里 并保存 自身引用 自身属性的优先级最高
   */
  static cover(){
    return Object.assign(arguments[0],Object.assign({},...[...arguments].splice(1),arguments[0]))
  }

  /**
   * 从target里面选取obj的属性进行深度拷贝
   */

  static selectMerge(obj , target){
    Object.keys(obj).forEach(key => {
      if(Obj.isObject(target) && Obj.isObject(obj)){
        Obj.merge(obj[key],target[key]);
        return;
      }
      obj[key] = target[key];
    })
    return obj;
  }

  /**
   * 对一个对象进行特殊转义
   */

  static escape(obj){
    Object.keys(obj).forEach(key => {
      if(typeof obj[key] === 'string'){
        obj[key] = encodeURIComponent(obj[key]);
      }
    })
    return obj;
  }
}
