/**
 * 转接所有配置
 */

import baseConfig from './baseConfig'
import interConfig from './interConfig'
import {Obj} from '@/js/public/tool'
let res = {};
Object.keys(interConfig).forEach(k => {
  res[k] = (options,config) => {
    let result = interConfig[k](Obj.merge(options,{
      //补全通用 配置项 
      toolbox: { //工具栏
        feature: {
            saveAsImage: {
              name :  config.savename || undefined
            }
        }
      }
    }));
    //取得options中的基础配置 再合并到result中 result中优先级最高
    return Obj.cover(result,Obj.selectMerge(baseConfig,options));
    // return Object.assign(result ,Object.assign({},baseConfig,result));
  }
});
export default res;
