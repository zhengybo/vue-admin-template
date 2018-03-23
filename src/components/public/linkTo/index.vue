<!-- 一种特殊的链接组件
      会检测链接页面是否被缓存，是则会清除缓存
 -->
<template lang="html">
  <a class="link-to cursor" @click="$root.routerPush(to)"><slot></slot></a>
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
  }
}
</script>

<style lang="css">

</style>
