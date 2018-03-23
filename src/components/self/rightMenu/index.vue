<template lang="html">
  <div :style="{left : attr.left+ 'px',top : attr.top + 'px'}" class="right-menu">
    <div @click="closeCurrent" class="right-menu-item">关闭当前页面</div>
    <div @click="closeOther" class="right-menu-item">关闭其他页面</div>
    <div @click="closeRight" class="right-menu-item">关闭右边页面</div>
    <div @click="closeAll" class="right-menu-item">关闭所有页面</div>
  </div>
</template>

<script>
export default {
  props : {
    attr : {
      type : Object,
      default(){
        return {}
      }
    }
  },
  methods : {
    closeCurrent (){
      this.$emit('closeCurrent',this.attr.current)
    },
    closeOther (){
      this.$emit('closeOther',this.attr.current)
    },
    closeRight (){
      this.$emit('closeRight',this.attr.current)
    },
    closeAll (){
      this.$emit('closeAll',this.attr.current)
    }
  }
}
</script>

<style lang="scss">
.right-menu{
  width: 110px;
  cursor: pointer;
  background: white;
  box-shadow: 0 0 5px 0 #888;
  text-align: center;
}
.right-menu-item{
  font-size: 14px;
  line-height: 30px;
  &:hover{
    background-color: rgba(150,150,150,.1);
  }
}
</style>
