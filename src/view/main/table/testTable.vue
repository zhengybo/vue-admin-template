<template lang="html">
  <div class="">
    <input type="text" name="" value="">
  </div>
</template>

<script>
export default {
  name : 'testTable',
  activated (){
    console.log('testTable当前缓存被激活');
  },
  deactivated (){
    console.log('testTable当前缓存停止激活');
  },
}
</script>

<style lang="css">
</style>
