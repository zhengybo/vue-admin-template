/*
  *路径前缀配置
  *api 拼接 由 http部分和 接口地址组成 http://127.0.0.1:8080 + /api/... 类似
  *由于项目可能会按模块来分配服务地址如 联车网关  数据管理 服务管理 登录模块 ...
  *固对没个模块需要单独拼接地址
*/
// const pdAPI_pre = 'http://172.17.13.169:8808';
// const testAPI_pre = 'http://172.17.13.169:8808';
const pdAPI_pre = _lib_ip;
const testAPI_pre = _lib_ip;
// const devAPI_pre =

export default process.env.NODE_ENV == 'production' ? testAPI_pre : pdAPI_pre;
