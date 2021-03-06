/*
  由于 fetch 不支持 请求中断 而且不能 超时  （请求实际用的superagent,模拟的fetch）

*/
import store from '@/store'
import fetch from 'superagent' // 伪装的fetch
import config from './config'
import { Obj, Cookie } from './../tool'
import { Loading } from 'element-ui'
// 模拟方式
const method = process.env.NODE_MOCK ? 'GET' : void 0;

// window.token = null;
let id = 0,     //记录引用
    reqs = {};  //存储引用
let {timeout,token} = config;
const fetchHttp = function(setting,exist,length=1){//请求
  let {
    url = '',
    type = 'GET',
    data = {}
  } = setting;
  if(exist && exist.length && (length == exist.length)){
    console.log('终止请求');
    exist.forEach(req => req.abort());   //放弃请求
    exist.length = 0;
    // for (let i = exist.length-1; i >= 0; i--) { //清除引用
    //   exist.splice(i,1)
    // }
  }
  // window.token = window.token || localStorage.getItem('token');
  let _data = Obj.clear(JSON.parse(JSON.stringify(data))),//清除空参数
      _f = fetch(method || type, url).timeout(setting.timeout || timeout.during *1000),//默认超时为10s
      result = Object.assign(_data,{//生成参数
        // 特殊的参数全局
        token : store.state.user.token
      });
  Obj.escape(result); //转义特殊字符
  exist &&  exist.push(_f);
  if(~['PUT','POST'].indexOf((type || 'GET').toUpperCase())){
    _f.type('application/json').send(JSON.stringify(result));
  }else {
    _f.query(result);
  }

  // _f.set('token',this.$store.state.user.token);
  return new Promise((resolve, reject) => {
    _f.end((err, res) => {
      // if(exist === true && reqs[id]) delete reqs[id]; //清理引用
      if(err && !!~err.toString().toLocaleLowerCase().indexOf('timeout')){
        reject('timeout')
      }
      (res && res.body && !err) ? resolve(res.body) : reject(err);
    })
  })
}

const checkToken = function(code){
  if(~token.code.indexOf(code)){
    store.dispatch('clearInfo').then(() => {
      this.$notify.error({
        ...token.show
      });
      location.reload()
      // this.$router.push('/login');
    });
    return false;
  }
  return true
}

/**
 * http 默认指向vue实例
 */
const http = function(setting,exist,length){
  let $LoadingServer = null,
      { notify = true, loading, publicFn, fail, success, catchFn } = setting;
  $LoadingServer = loading && Loading.service(Object.assign({
    fullscreenLoading : true,
    spinner : "el-icon-loading",
    background : "rgba(0, 0, 0, 0.8)",
    customClass : 'fllLoading'
  },loading));
  return fetchHttp.call(this,setting,exist,length)
    .then(json => {
      loading && $LoadingServer.close();
      publicFn && publicFn.call(this,json);
      if(!json.returnSuccess){
        if(!checkToken.call(this,json.returnErrCode))return;
        notify && this.$notify.error({
          title: '提示',
          message: json.returnErrMsg || '发生一个未知错误',
          position : 'bottom-right'
        });
        fail && fail.call(this,json);
        return;
      }
      success && success.call(this,json);
      return json;
    })
    .catch(res => {
      publicFn && publicFn.call(this,{});
      let timeout = res === 'timeout';
      loading && $LoadingServer.close();
      this.$notify({
        title: '提示',
        message:timeout ? '请求超时' : '请求失败,网络异常!',
        position :`${timeout ? 'top' : 'bottom'}-right`,
        type : timeout ? 'warning' : 'error'
      });
      // if(!checkToken.call(this,'40002'))return;
      publicFn && publicFn.call(this);
      catchFn && catchFn.call(this);
    })
}

/**
 * 基于单个请求的 Promise.all请求函数
 * @param setting(Array) 请求对象集合
 * @param exist 传入时必须是Array 且 必须唯一 (每次调用https时 exist 引用不能变化)
 * @return Promise
 */
const https = function(settings = [],exist){
  if(exist !== undefined && !Array.isArray(exist)){
    console.warn('https第二个参数必须是个数组且唯一才能起到中断作用')
  }
  return Promise.all(
    settings.map(setting => http.call(this,setting,exist,settings.length))
  ).then(() => {
    exist && (exist.length = 0); //请求结束 请求 记录
  }).catch(() => {
    console.warn('请求中有一个或多个请求发生错误！');
  })
}

export  { http, https }
