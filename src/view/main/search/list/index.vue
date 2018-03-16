<template lang="html">
  <div class="">
    列表
    <input type="text">
    <router-link
    :to="'/main/search2/detail?id=2'">
      详情
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name : 'search2',
  destroyed(){
    console.log('----');
  }
}
</script>

<style lang="css">
</style>
