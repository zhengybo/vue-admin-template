<template lang="html">
  <el-card class="right-menu">
    <div class="right-menu-item">关闭当前页面</div>
    <div class="right-menu-item">关闭其他页面</div>
    <div class="right-menu-item">关闭右边页面</div>
</el-card>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.right-menu{
  width: 110px;
  cursor: pointer;
  text-align: center;
  .el-card__body{
    padding: 0px;
  }
}
.right-menu-item{
  font-size: 14px;
  line-height: 30px;
  &:hover{
    background-color: rgba(150,150,150,.1);
  }
}
</style>
