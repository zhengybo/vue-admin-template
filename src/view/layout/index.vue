<template lang="html">
  <el-container id="frame">
    <aside-bar width="200px"  class="el-aside"></aside-bar>
    <el-container id="contain-root">
      <el-header  id="header">
        <nav-bar></nav-bar>
        <sub-nav></sub-nav>
        <pull-switch class="pull-contain"></pull-switch>
      </el-header>
      <show-main ></show-main>
    </el-container>
    <custrom-tool v-if="tool"></custrom-tool>
  </el-container>
</template>

<script>
import AsideBar from './AsideBar.vue'
import NavBar from './NavBar'
import SubNav from './SubNav'
import showMain from './showMain'
import {PullSwitch} from '@/components/self'
import cvs from '@/js/public/lib/animation'
export default {
  computed : {
    tool (){
      return this.$store.state.tool.show
    }
  },
  mounted(){
    // cvs({
    //   c : "255,255,0",
    //   l : 3,
    //   n : "200",
    //   o : "0.9",
    //   z :"-2",
    //   d : document.getElementById('contain-root')
    // })
  },
  components : {
    PullSwitch,
    AsideBar,
    NavBar,
    SubNav,
    showMain
  },
  methods : {

  }
}
</script>

<style lang="scss">
  #frame{
    height: 100%;
    #header{
      height: auto!important;
    }

    .el-header{
      padding: 0;
    }

    .NavHeader .NavBar{
      padding: 0;

    }

    .NavHeader {
      // height: 84px!important;

      .el-container{
        height: 100%;
      }

    }
  }
</style>
