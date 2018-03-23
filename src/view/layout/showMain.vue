<!-- 由于element 一些组件样式变化
    与el-elementbar(基于原生的scroll)有关联固采用elementbar -->
<template lang="html">
<el-scrollbar class="view-scroll h--100">
  <el-main class="warp-contain">
    <!-- <scrollbar scrollbar="always"> -->
      <!-- <div class="warp-main-inner"> -->
      <transition name="fade" >
        <keep-view/>
      </transition>
      <!-- </div> -->
    <!-- </scrollbar> -->
  </el-main>
</el-scrollbar>
</template>

<script>
export default {

}
</script>

<style lang="scss">
// .warp-contain{
//   overflow: hidden;
//   // height: 100%;
//   padding: 20px;
//   .el-scrollbar{
//     height: 100%;
//     overflow-x:hidden;
//   }
//   .warp-main-inner{
//     padding: 20px;
//   }
//
//
// }
.view-scroll{
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
}

</style>
