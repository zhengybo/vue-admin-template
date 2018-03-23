import store from '@/store'
import { AsyncRouter } from '@/router/route'
import { Obj } from '@/js/public/tool'
function getPermissionRouter(routers = [],rights = [],noRights = [],deep = 0){
  return routers.filter(route => {
    Obj.cover(route.meta = route.meta || {},{ //初始化部分默认数据 菜单数据
      menu : true,
      grider : true,
      cache : true,
      // tooltip : deep == 1,
      libRights : false
    })
    if(route.meta.libRights) return true;
    // if(~special.indexOf(route.name))return true;
    let children = route.children;
    if(children){
      route.children = getPermissionRouter(children,rights,noRights,deep + 1);
      if(route.children.length)return true;
    }
    if(~rights.indexOf(route.name))return true;
    noRights.push(route.path)
    return false;
  })
}
export default {
  state : {
    noRights : [], //无权限路由
    permissionRouter : [], //权限路由
    noPermissionRouter : []
  },
  mutations : {
    PRUDOCT_ROUTER : (state , routers) => { //产生有权限路由
      state.permissionRouter = routers;
    },
    PRUDOCT_NO_ROUTER : (state) => { //产生无权限路由
      state.noPermissionRouter = state.noRights.map(path => ({
        path: path,redirect: '/403',hidden: false
      }))
    }
  },
  actions: {
    productRouter({commit,state},payload){
      let { rights } = payload;
      commit(
        'PRUDOCT_ROUTER',
         getPermissionRouter([AsyncRouter],rights,state.noRights)
      );
      commit('PRUDOCT_NO_ROUTER');
      return {
        permissionRouter : state.permissionRouter,
        noPermissionRouter : state.noPermissionRouter
      };
    }
  }
}
