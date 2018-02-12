import { Loading } from 'element-ui'
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
    async routerPush(to){
      let dispatch = this.$store.dispatch;
      await dispatch('delCacheView',to.name);
      this.$nextTick(() => {
        this.$router.push(to);
        dispatch('addCacheView',to.name);
      })
    }
  }
}
