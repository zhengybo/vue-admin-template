<template lang="html">
  <div class="">
    <keep-alive :include='cacheViews'>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name : 'search-main',
  computed  : {
    cacheViews(){
      return this.$store.state.tabNavigation.cacheViews
    }
  }
}
</script>

<style lang="css">
</style>
