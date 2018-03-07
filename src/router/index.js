import 'nprogress/nprogress.css'
import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from './../store'
import { Cookie } from '@/js/public/tool'
import { navGrider } from '@/js/public/init'
import { contantRouter, basisName } from './route'
import { Notification, Loading } from 'element-ui'
Vue.use(Router);
const completedRouters = [];
const router = new Router({ routes: contantRouter });
router.beforeEach((to, from, next) => {
  NProgress.start();
  if(~basisName.indexOf(to.path)){
    next();
    return;
  }
  let login = to.path === '/login';
  if(!Cookie.getCookie('token')){
    next(login ? void 0 : '/login')
  }else {
    if(login){
      next('/main');
    }else {
      if(!completedRouters.length){
        store.dispatch('getUserInfo').then(({rights}) => {
          store.dispatch('productRouter',{rights})
          .then(({permissionRouter,noPermissionRouter}) => {
            console.log(permissionRouter);
            store.commit('SET_NAVIGATION',navGrider(permissionRouter));
            completedRouters.push( //增加全部路由
            ...permissionRouter,
            ...noPermissionRouter,
            {path: '*',redirect: '/404',hidden: true});
            router.addRoutes(completedRouters);
            next({ ...to, replace: true });
          }).then(() => {
            if(store.state.user.firstHint){
              Notification.success({
                title: '提示',
                message: '欢迎使用vue后台管理系统管理界面',
                position : 'top-left'
              });
            }
          });
        })
        .catch(() => {
          store.dispatch('clearInfo').then(() => {
            Notification.error({
              title: '提示',
              message: '权限校验异常',
              position : 'bottom-right'
            });
            next('/login');
          })
        })
      }else {
        next();
      }
    }
    // next(login ? '/main' : undefined);
  }
  NProgress.done();
})
router.afterEach(() => NProgress.done());
export default router;
