<template lang="html">
  <el-main class="warp-contain">
    <scrollbar scrollbar="always">
      <div class="warp-main-inner">
        <keep-alive :include='cacheViews'>
          <router-view v-if="reload"></router-view>
        </keep-alive>
      </div>
    </scrollbar>
  </el-main>
</template>

<script>
export default {
  computed  : {
    cacheViews(){
      return this.$store.state.tabNavigation.cacheViews
    },
    reload(){
      return this.$store.state.action.reload
    }
  }
}
</script>

<style lang="scss">
#AsideBar{
  width: auto;
}
.warp-contain{
  overflow: hidden;
  padding: 0;
  .el-scrollbar{
    height: 100%;
    overflow-x:hidden;
  }
  .warp-main-inner{
    padding: 20px;
  }
}
.warp-main{
  overflow: auto;
  overflow-y: scroll;
  max-height: 100%;
}

.el-scrollbar{
  height: 100%;
  .warp-main{
    height: 100%;
    .el-scrollbar__view{
      height: 100%;
    }
  }
}
</style>
