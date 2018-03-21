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
/**
 *  解析 导航路径 ，赋予节点初值
 */
 //计算meta节点信息
const caches = [],
      menus = [];
let defaultMata = () => ({ menu : false, cache : false, grider : true, cacheViews : [] })
function forNavMetaGrider(arr = [], temp = [],cacheTemp = [], records = {}, routes = []){
  arr.forEach(item => {
    let copyTemp = [...temp],
        copyCacheTemp = [...cacheTemp],
        meta = item.meta = item.meta || {},
        { name, path, children : cld } = item;
    Obj.cover(item.meta,defaultMata());
    if(meta.cache)caches[caches.length] = name; // 记录需要缓存的路由
    let { children, link = true, grider, cacheViews } = meta;
    // cacheViews = copyTemp.map(item => item.name)
    copyCacheTemp[copyCacheTemp.length] = item.name;
    if(grider){
      copyTemp[copyTemp.length] = { name, path, link };
    }
    item.meta.cacheViews.push(...copyCacheTemp);
    records[path] = copyTemp;
    if(children){
      forNavMetaGrider(children,copyTemp,copyCacheTemp.slice(0,-1),records,routes);
    }
    if(cld){
      forNavGrider(cld,copyTemp,copyCacheTemp,records);
    }
    routes.push(item); // 调整引用
    // delete meta.children;
  })
  return {records,routes};
}

//计算路由导航信息
function forNavGrider(arr = [], temp = [],cacheTemp = [], record = {} ){ //计算导航信息
  arr.forEach(item => {
    let copyTemp = [...temp],
        copyCacheTemp = [...cacheTemp],
        { name, path, children : cld } = item,
        meta = item.meta = item.meta || {};
    Obj.cover(item.meta,defaultMata());
    if(meta.cache)caches[caches.length] = name; // 记录需要缓存的路由
    let { menu, link =  !cld, children, grider, cacheViews } = meta;
    if(item.name != 'main'){
      copyCacheTemp[copyCacheTemp.length] = item.name;
    }

    if(grider){
      copyTemp[copyTemp.length] = { name, path, link };
    }
    if(children){
      let { records, routes } = forNavMetaGrider(children,copyTemp,copyCacheTemp.slice(0,-1));
      Object.assign(record,records);
      arr.push(...routes);
      delete meta.children;
    }
    item.meta.cacheViews.push(...copyCacheTemp);
    record[path] = copyTemp;
    // if(cld && menu){
    if(cld){
      forNavGrider(cld,copyTemp,copyCacheTemp,record);
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

/********************
 * 场景---> vue版本  截止 2.5.16 均出现
 * 在keep-active 缓存多级路由，在子路由和父路由切换时，出现切换混乱情况。
 * 比如a, b, c, 三个同级路由, d, e... 是a(节点)的子集路由。 当前路由设置为d，
 * 且a,b,c,d,e..都已经被缓存。
 * 路由由d切换为b，再由b切换到e时.当前路由视图显示为d路由的视图而不是e路由的视图。
 * 解决--->
 *   将菜单的二以上级路(及存在menu为true 且在二级以上路由)由全部转化为 一级路由
 */
function generateRouter(arr,store = [],deep = 0){ //将菜单的多级路由转化为一级路由
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if(item.meta.menu){
      if(!item.children){
        if(deep > 1){
          store[store.length] = item;
          arr.splice(i--,1);
        }
      }else if(item.children){
        generateRouter(item.children,store,deep + 1);
      }
    }
  }
  return store;
}
/* ************* */

export const navGrider = (data) => {
  let record = forNavGrider(data); //同时对data进行了 修改 为正常router形式
  /* *********** 转换路由形式 */
  menus.push(...JSON.parse(JSON.stringify(data[0].children))); //保留菜单形式
  let router = generateRouter(data);
  data[0].children.push(...router);
  /* *********** */
  // console.log(JSON.parse(JSON.stringify(router)));
  return record;
}
export const getCaches = () => {
  return caches;
}

export const getMenus = () => {
  return menus;
}
