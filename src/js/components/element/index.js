/**
 * 加载需要的emui
 */
// import 'element-ui/lib/theme-chalk/index.css'
import common from './common'
import prototype from './prototype'

export default vue => {
  Object.entries(common).forEach(v => vue.use(v[1]))
  Object.entries(prototype).forEach(v => vue.prototype[v[0]] = v[1])
}
