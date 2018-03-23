/**
 *  扩展 array
 */
export default class Arrayed extends Array{
   /* 计算数组交集 (arr1,arr2,arr3....) */
  static intersection(){
    return [...arguments].reduce((pre , next) =>{
      let p = new Set(pre),
          n = new Set(next);
      return [...p].filter(v => n.has(v));
    })
  }

  /* 增加不同的值在数组里面 */
  static add(arr,values = []){
    values.forEach(value => {
      if(!~arr.indexOf(value))arr[arr.length] = value;
    })
    return arr;
  }

  static remove(arr,value){
    return arr.splice(arr.indexOf(value),1);
  }

  /**
   * 对比含有n对象的数组 合并其中key值相同的
   * 参数必须2个以上 最后一个参数为alias 配置项
   */
  static assign(){
    let arg0 = arguments[0],
        argn = arguments[arguments.length-1],
        argi = null;
    if(Obj.isObject(argn)){
    // if(!Array.isArray(argn) && typeof argn == 'object'){
      if(arguments.length <3)return;
      argi = [...arguments].slice(1,-1);
    }else {
      if(arguments.length <2)return;
      argn = {};
      argi = [...arguments].slice(1);
    }
    argn = Object.assign(argn,{
      name : 'name',
      value : 'value'
    })
    argi.forEach(arr => {
      arr.forEach(item => {
        let res = arg0.find(list => list[argn.name] == item[argn.name]);
        if(res){res[argn.value] = item[argn.value]}
        else{arg0[arg0.length] = item;}
      })
    })
    return arg0;
  }

  /**
   * 解构多层的数组嵌套变为一层 [{},[[],{}]] =>[{},[],{}]
   */
  static deconstruction(arr,fn,result = []){
    let isArray = Array.isArray;
    arr.forEach(item => {
      if(isArray(item)){
        fn && fn(item);
        Arrayed.deconstruction(item,fn,result);
        return ;
      }
      result.push(item);
    })
    return result;
  }

  static remove(arr,key){
    let index = arr.indexOf(key);
    if(~index){
      arr.splice(index,1);
    }
  }
}
