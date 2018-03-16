<!-- 拉灯 -->
<template lang="html">
  <div class="pull-switch">
    <div :style='{backgroundColor : theme}' class="nail"></div>
    <div :style='{backgroundColor : theme}' @click="pullSwitch" :class="['rope',open ? '' : 'rope-open']"></div>
    <div :style='{backgroundColor : theme}' @click="pullSwitch" :class="['rings',open ? '' : 'rings-open']"> </div>
  </div>
</template>

<script>
import { Str } from '@/js/public/tool'
import { mapState } from 'vuex'
export default {
  name : 'pullSwitch',
  computed : {
    ...mapState({
      open(state){
        return state.switch.open;
      },
      ratio(state){
        return state.theme.ratio;
      },
      theme(state){
        return Str.softColor(state.theme.theme,this.ratio[0],this.ratio[1]);
      }
    })
  },
  data(){
    return {

    }
  },
  methods : {
    pullSwitch(){
      this.$store.dispatch('toggleSwitch').then(() => {
        this.$emit('callback',this.open);
      })
    }
  }
}
</script>

<style scoped lang="scss">
.pull-switch{
  position: fixed;
  z-index: 100;
  right: 20px;
  top:-11px;

  .nail{
    // @include whb(20px,20px,#324e7c);
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .rings{
    // @include whb(10px,10px,#324e7c);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.5s ease;
    position: absolute;
    left: 5px;
    top: 25px;
    &:active{
      top: 27px;
    }
  }
  .rope{
    // @include whb(2px,7px,#324e7c);
    transition: all 0.6s ease;
    position: absolute;
    left: 9px;
    top: 20px;
  }
  .rope-open{
    height: 32px;
  }
  .rings-open{
    top: 45px;
    &:active{
      top: 47px;
    }
  }
}

</style>
