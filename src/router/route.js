/**
 * 路由初始值
 */
const special = ['login','locking']; // 需要进行特殊判定的router
const _import = require('./import/import_' + 'development');
const AsyncRouter = require('./modules/main').default(_import); // 登录状态的
const contantRouter = require('./modules/lib').default; //未登录状态也能访问的路由
const basisName = contantRouter.filter(t => !~special.indexOf(t.name))
                               .map(t => t.path); // 未登录状态一定能访问的路由
export { AsyncRouter, contantRouter, basisName }
