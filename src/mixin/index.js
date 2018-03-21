import { Loading } from 'element-ui'
import { getCaches } from '@/js/public/init'
let $LoadingServer = null;
export default {
  methods: {
    loading (text){
      $LoadingServer = Loading.service({
        fullscreenLoading : true,
        spinner : "el-icon-loading",
        background : "rgba(0, 0, 0, 0.8)",
        customClass : 'fllLoading',
        text
      });
    },
    closeLoading(){
      $LoadingServer.close();
    },
    // 因为对 router深度 查找 需要多余的耗时 这没做判断  需要自行判定
    async routerPush(to){
      let { name, query } = to;
      if(!name){
        console.warn('必须有一个 ‘name’ 值');
        return;
      }
      let cache = !!~getCaches().indexOf(name),
          dispatch = this.$store.dispatch;
      if(cache) await dispatch('delCacheView',to.name);
      await dispatch('delCacheView',to.name);
      this.$nextTick(() => {
        this.$router.push(to);
        if(cache){
          dispatch('updateQuery',{ query, name });
          dispatch('addCacheView',to.name);
        }
      })
    }
  }
}
