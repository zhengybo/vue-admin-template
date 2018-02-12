// Created by zhengyibo in 2017-11-23
// import prefix from './prefix'
export default  {
  ...require('./modules').default,
  ...require('./public').default
}
// Object.keys(result).forEach(key => {result[key]=result[key]})
