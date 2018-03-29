<!-- 刷新 -->
<template lang="html">
  <div class="reloadFrame">
    <div :style="{
      'backgroundImage': `url('${bg}')` }" 
      :class="['reloadIcon']"  @click="reload"></div>
  </div>
</template>

<script>
export default {
  name : 'reload',
  data(){
    return {
      bg : require('@/assets/images/reload.png')
    }
  },
  methods : {
    reload(){
      this.$store.dispatch('reloadRouter',this.$route.name);
    }
  }
}
</script>

<style lang="scss">
.reloadFrame{
  position: relative;
  width: 30px;
  height: 100%;
}
.reloadIcon{
  @include transform(rotate(180deg),rotate(180deg) scale(0.8));
  width: 30px;
  height: 100%;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  left: 0px;
  top: 0;
  transition: all 0.5s ease ;
  background-repeat: no-repeat;
  background-position: center center;
  // background: url('/src/assets/images/reload.png') no-repeat center center;
  background-size: 20px 20px;
}

</style>
