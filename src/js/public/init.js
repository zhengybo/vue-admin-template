/**
 * 初始化需要生成一些固有参数
 */
import {Obj} from './tool'
function forRouter(arr = [],record = {},temp = []){
  arr.forEach(item => {
    let copyTemp = [...temp];
    let cld = item.children,
        scld = item.subChild;
    copyTemp[copyTemp.length] = {
      name : item.name,
      path : item.link,
      link : !!scld //有子节点才能跳转
    }
    record[item.link.toLocaleLowerCase()] = copyTemp;

    let condition = cld && cld.length || scld && scld.length
    if(condition){
      forRouter(cld || scld,record,copyTemp)
    }
  })
  return record;
}

function getRouterName(arr = [],record = {}){
  arr.forEach(item => {
    record[item.link.toLocaleLowerCase()] = item.name;
    if(item.children){
      getRouterName(item.children,record)
    }
  })

  return record;
}

function concat(arr = [],parent,result = []){ //计算同级的 节点属性
  let i = 0,
      length = arr.length;
  while(i++ < length){
    let temp = arr[i-1],
        node = temp.meta.node;
    // i++;
    if(node !== undefined && node == parent){
      let {name,path,meta} = temp;
      result.unshift({
        name : name,
        path : path,
        link : meta.link !== undefined ? meta.link : true
      });
      concat(arr,meta.parent,result);
      break;
    }
  }
  return result;
}
 //计算同级属性节点 同时清理节点
function transform(arr = [],temp = [],records = {},routes = []){
  let copyTemp = [...temp]
  arr.forEach(item => {
    let meta = item.meta = item.meta || {};
    Obj.cover(item.meta,{ // 对于不在主菜单中的route 默认不缓存
      menu : false,
      cache : false
    })
    copyTemp.push({
      name : item.name,
      path : item.path,
      link : meta.link !== undefined ? meta.link : true
    })
    records[item.path] = copyTemp;
    let children = meta.children;
    if(children){
      transform(children,copyTemp,record);
    }
    routes.push(item); // 调整引用
    delete meta.children;
  })
  return {records,routes};
}

function forNavGrider(arr = [],record = {},temp = []){ //计算导航信息
  arr.forEach(item => {
    let copyTemp = [...temp],
        cld = item.children,
        meta = item.meta = item.meta || {};
    // Obj.cover(item.meta,{
    //   menu : true,
    //   cache : true
    // })
    let {menu, link, children} = meta,
        t = {
          name : item.name,
          path : item.path,
          link : link !== undefined ? link :!cld //菜单栏 子节点 默认不需要链接
        }
    copyTemp[copyTemp.length] = t;
    if(children){
      let {records,routes} = transform(children,copyTemp);
      Object.assign(record,records)
      arr.push(...routes);
    }
    // if(!menu){ //不需要 渲染菜单栏的
    //   copyTemp.push(...concat(arr,parent,[t]));
    // }else {
    //   console.log(copyTemp);
    //   copyTemp[copyTemp.length] = Object.assign(t,{
    //     link : link !== undefined ? link :!cld
    //   })
    // }
    record[item.path] = copyTemp;
    let condition = cld && menu;
    if(condition){
      forNavGrider(cld,record,copyTemp)
    }
  })
  return record;
}

 /* 生成导航的state数据 */
export const navData = (data) => {
  return forRouter(JSON.parse(JSON.stringify(data)));
}

export const getName = (data) => {
  return getRouterName(JSON.parse(JSON.stringify(data)));
}

export const navGrider = (data) => {
  return forNavGrider(data);
}
