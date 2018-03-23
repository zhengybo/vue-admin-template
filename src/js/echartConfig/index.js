/**
 * 转接所有配置
 */

import interConfig from './interConfig'
import { baseConfig, baseExConfig } from './base'
import { Obj } from '@/js/public/tool'
const res = {};
Object.keys(interConfig).forEach(k => {
  res[k] = (options, config) => {
    return Obj.merge(
      Obj.selectMerge(baseConfig(), options),
      baseExConfig(config),
      interConfig[k](options,config)
    );
    // return Object.assign(result ,Object.assign({},baseConfig,result));
  }
});
// console.log(res['mapEchart']);
export default res;
