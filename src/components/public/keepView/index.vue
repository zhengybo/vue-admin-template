<template lang="html">
  <keep-alive :include='cacheViews'>
    <router-view v-if="reload"></router-view>
  </keep-alive>
</template>

<script>
export default {
  computed  : {
    cacheViews (){
      return this.$store.state.tabNavigation.cacheViews;
    },
    reload(){
      return this.$store.state.action.reload
    }
  }
}
</script>
