import { Cookie, Obj } from '@/js/public/tool';
import {http} from '@/js/public/http'
import { Loading } from 'element-ui'
import md5 from 'js-md5';
import apis from '@/js/api'

const enterPage = '/main' //进入路由
const user = {
  state: {
    username: Cookie.getCookie('username'),
    token: Cookie.getCookie('token'),
    userInfo : Cookie.getCookie('userInfo'),
    firstHint : false //首次登陆提示
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      token ? Cookie.setCookie('token',token)
            : Cookie.deleteCookie('token');
      state.token = token || '';
    },
    SET_USERNAME: (state, username) => {
      username ? Cookie.setCookie('username',username)
               : Cookie.deleteCookie('username');
      state.username = username || '未登录';
    },
    SET_USERINFO : (state,userInfo) => {
      userInfo ? Cookie.setCookie('userInfo',JSON.stringify(userInfo))
               : Cookie.deleteCookie('userInfo');
      state.userInfo = userInfo || {};
    },
    SET_HINT : (state,value) => {
      state.firstHint = value;
    }
  },

  actions: {
    login({ commit }, userInfo) {
      // console.log(userInfo);
      let data = {
        password : md5(userInfo.checkPassword),
        userName : userInfo.checkUser
      }
      $_Vue.loading('正在登录');
      this._vm.$http({
        url : apis.login,
        // '/api/login',
        data : {
          ...data
        },
        publicFn(){
          $_Vue.closeLoading();
        },
        success(json){
          // _Vue.closeLoading();
          let {username ='',token =''} = json || {};
          if(!username)username = data.userName;
          commit('SET_TOKEN',token);
          commit('SET_USERNAME',username);
          commit('SET_HINT',true);
          this.$router.replace(enterPage);
        }
      })
    },
    // 登出
    logOut({ commit, state ,dispatch }) {
      $_Vue.loading('正在退出');
      this._vm.$http({
        url :apis.logout,
        notify : false,
        data : {
          // username : state.username
        },
        publicFn(res){
          if(Obj.isObject(res) && res.returnSuccess){
            return;
          }
          dispatch('clearInfo').then(() => {
            $_Vue.$notify.error({
              title: '提示',
              message: '退出异常，强制退出',
              position : 'bottom-right'
            });
            setTimeout(() => location.reload(),1000)
          })
        },
        success(){
          dispatch('clearInfo').then(() => location.reload());
        },
        catchFn(){
        }
      })
    },
    getUserInfo({ commit, state }){ //获取用户信息

      return http({ //调用全局的 异常 会被catch捕捉
        url :apis.userinfo,
        loading : {
          text : '权限检验中...'
        },
        data : {
          username : state.username,
          token : state.token
        },
        success : (data) => commit('SET_USERINFO',data.data),
        fail : () => {

        }
      }).then(res => res.data);
    },
    clearInfo({ commit, state }){ //清理信息
      return new Promise((resolve,reject) => {
        commit('SET_TOKEN');
        commit('SET_USERNAME');
        commit('SET_USERINFO');
        resolve();
      })
    }
  }
};

export default user;
