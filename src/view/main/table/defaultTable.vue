<template lang="html">
  <div class="">
    <input type="text" name="" value="123213">
  </div>
</template>

<script>
export default {
  name : 'defaultTable',
  activated (){
    console.log('defaultTable当前缓存被激活');
  },
  deactivated (){
    console.log('defaultTable当前缓存停止激活');
  },
}
</script>

<style lang="css">
</style>
