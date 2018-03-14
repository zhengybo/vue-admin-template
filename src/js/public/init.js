/**
 * 初始化需要生成一些固有参数
 */
import { Obj } from './tool'
// function forRouter(arr = [],record = {},temp = []){
//   arr.forEach(item => {
//     let copyTemp = [...temp];
//     let cld = item.children,
//         scld = item.subChild;
//     copyTemp[copyTemp.length] = {
//       name : item.name,
//       path : item.link,
//       link : !!scld //有子节点才能跳转
//     }
//     record[item.link.toLocaleLowerCase()] = copyTemp;
//
//     let condition = cld && cld.length || scld && scld.length
//     if(condition){
//       forRouter(cld || scld,record,copyTemp)
//     }
//   })
//   return record;
// }

// function getRouterName(arr = [],record = {}){
//   arr.forEach(item => {
//     record[item.link.toLocaleLowerCase()] = item.name;
//     if(item.children){
//       getRouterName(item.children,record)
//     }
//   })
//
//   return record;
// }
//
// function concat(arr = [],parent,result = []){ //计算同级的 节点属性
//   let i = 0,
//       length = arr.length;
//   while(i++ < length){
//     let temp = arr[i-1],
//         node = temp.meta.node;
//     // i++;
//     if(node !== undefined && node == parent){
//       let {name,path,meta} = temp;
//       result.unshift({
//         name : name,
//         path : path,
//         link : meta.link !== undefined ? meta.link : true
//       });
//       concat(arr,meta.parent,result);
//       break;
//     }
//   }
//   return result;
// }
 //计算meta节点信息
const caches = [];
let defaultMata = {  menu : false, cache : false, grider : true, };
function forNavMetaGrider(arr = [], temp = [], records = {}, routes = []){
  arr.forEach(item => {
    let copyTemp = [...temp],
        meta = item.meta = item.meta || {},
        { name, path, children : cld } = item;
    Obj.cover(item.meta,defaultMata);
    if(meta.cache)caches[caches.length] = name; // 记录需要缓存的路由
    let { children, link = true, grider } = meta;
    if(grider){
      copyTemp[copyTemp.length] = { name, path, link };
    }
    records[path] = copyTemp;
    if(children){
      forNavMetaGrider(children,copyTemp,records,routes);
    }
    if(cld){
      forNavGrider(cld,copyTemp,records);
    }
    routes.push(item); // 调整引用
    delete meta.children;
  })
  return {records,routes};
}

//计算路由导航信息
function forNavGrider(arr = [], temp = [], record = {} ){ //计算导航信息
  arr.forEach(item => {
    let copyTemp = [...temp],
        { name, path, children : cld } = item,
        meta = item.meta = item.meta || {};
    Obj.cover(item.meta,defaultMata);
    if(meta.cache)caches[caches.length] = name; // 记录需要缓存的路由
    let { menu, link = !cld, children, grider } = meta;
    if(grider){
      copyTemp[copyTemp.length] = { name, path, link };
    }
    if(children){
      let { records, routes } = forNavMetaGrider(children,copyTemp);
      Object.assign(record,records);
      arr.push(...routes);
    }
    record[path] = copyTemp;
    // if(cld && menu){
    if(cld){
      forNavGrider(cld,copyTemp,record);
    }
  })
  return record;
}


//计算路由导航信息


 /* 生成导航的state数据 */
// export const navData = (data) => {
//   return forRouter(JSON.parse(JSON.stringify(data)));
// }

// export const getName = (data) => {
//   return getRouterName(JSON.parse(JSON.stringify(data)));
// }
export const navGrider = (data) => {
  return forNavGrider(data);
}
export const getCaches = () => {
  return caches;
}
