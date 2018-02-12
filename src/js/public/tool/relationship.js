/**
 * 关系类
 */
export default class Relationship {
  // 目前不支持私有变量
  // #name;
  // #children;
  // #parent;
  static initRelation(arrRelate){ //将数组关系转化为链表关系
    const creates = (arr,i = 0,resultArr = [],obj = {},next) => {
      let p = i ? resultArr[i - 1] : null,
          n = arr[i + 1] ? new Relationship(arr[i+1]) : null;
      if(arr[i]){
        let r = (i ? next : new Relationship(arr[i])).setRelative(n , p)
        obj[arr[i]] = r;
        resultArr.push(r)
        creates(arr , i + 1,resultArr,obj,n);
      }
      return obj;
    }
    return creates(arrRelate);
  }
  constructor(name) {
    this.name = name;
  }
  setRelative(children = null,parent = null){ //设置关联关系
    this.children = children;
    this.parent = parent;
    return this;
  }
  getName()  {return this.name;}
  getChild() {return this.children;}
  getParent(){return this.parent;}
}
