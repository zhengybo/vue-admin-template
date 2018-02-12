<!-- 欢迎界面(初始化数据参数) -->
<template lang="html">
  <div id="welcome">
    <CustromLoading class="welLoading"/>
    <div>{{status[progress]}}</div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      status : {
        0 : '正在初始化',
        1 : '加载中···',
        2 : '加载完成'
      },
      progress : 0,
    }
  },
  created(){
    // this.$root.dispatch('INIt_DATA');
  }
}
</script>

<style lang="css">
#welcome{
  position: fixed;
  width: 100%;
  height: 100%;

}
</style>
