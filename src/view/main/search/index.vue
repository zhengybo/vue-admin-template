<template lang="html">
  <div class="">
    查询节点
    <input type="text">
    <keep-alive :include='cacheViews'>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name : 'search',
  computed  : {
    cacheViews(){
      return this.$store.state.tabNavigation.cacheViews
    }
  }
}
</script>

<style lang="css">
</style>
