<!-- 一种特殊的链接组件
      会检测链接页面是否被缓存，是则会清除缓存
 -->
<template lang="html">
  <a class="link-to" @click="link"><slot></slot></a>
</template>
<script>
export default {
  props : {
    to : {
      type : Object,
      default(){
        return {}
      }
    }
  },
  methods : {
    async link(){
      let dispatch = this.$store.dispatch,
          to = this.to;
      await dispatch('delCacheView',to.name);
      /**
       * 缓存标记被删除后 ,
       * 组件的destroyed是一个异步过程 需要等待下一步操作
       */
      this.$nextTick(() => {
        this.$router.push(to);
        dispatch('addCacheView',to.name)
      })
    }
  }
}
</script>

<style scoped lang="css">
.link-to{
  cursor: pointer;
}
</style>
