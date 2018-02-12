
<template lang="html">
  <div class="swaper-contain">
    <el-submenu
    v-for='(item,index) in data'
    v-if="item.children && item.meta.menu"
    :key="index"
    :index="item.name">
      <template slot="title">
        <icon v-if="item.meta.icon" :icon-class="item.meta.icon || ''" />
        <span >{{lang[item.name]}}</span>
      </template>
      <select-tree :data="item.children"></select-tree>
    </el-submenu>
    <el-menu-item
    v-else-if="item.meta.menu"
    class="menuLink"
    :key="index"
    :route="item.path"
    :index="item.name">
    <icon v-if="item.meta.icon" :icon-class="item.meta.icon || ''" />
    <!-- <span v-if="!isCollapse" class="link-menu">{{lang[item.name]}}</span> -->
    <!-- <span  class="link-menu">{{lang[item.name]}}</span> -->
    <template slot="title"><span>{{lang[item.name]}}</span></template>
    </el-menu-item>
  </div>
</template>

<script>

import lang from '@/unit/lang'
import { mapState } from 'vuex'
export default {
  name : 'select-tree',
  props : {
    deep : {
      type : Number,
      default : 0
    },
    data : {
      type : Array,
      default(){
        return []
      }
    }
  },
  computed: {
    isCollapse(state){
      return this.$store.state.switch.collapse;
    }
  },
  created(){
    // console.log(this.data);
  },
  data(){
    return {
      lang : lang
    }
  }
}
</script>

<style lang="css">
</style>
