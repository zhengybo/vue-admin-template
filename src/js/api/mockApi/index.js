/* 本地模拟 需要拼接pathname */
const p = location.pathname.slice(0,-1); // 配置pathname
const result = {
  ...require('./modules').default,
  ...require('./public').default
}
Object.keys(result).forEach(key => result[key] = p + result[key]);
export default result;
