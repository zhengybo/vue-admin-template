<!-- 向导栏 -->
<template lang="html">
  <div id="SubNav" :style="{backgroundColor:theme}" class="">
    <el-breadcrumb class="breadcrumb" separator=">">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(tag,index) in navigation" :key="index" >
          <router-link
          v-if="(index != length-1) && tag.link"
          class="tabs-view"
          :to="tag.path">
            {{lang[tag.name]}}
          </router-link>
          <span v-else>{{lang[tag.name]}}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <!-- 切换效果2 -->
    <!-- <transition-group name="breadcrumb">
      <span v-for="(tag,index) in nav" :key="index">
        <span class="n_blank" v-if="index">&gt;</span>
        <router-link
        v-if="(index != length-1) && tag.link"
        class="tabs-view"
        :to="tag.path"
        :key="index">
          {{lang[tag.name]}}
        </router-link>
        <span v-else>{{lang[tag.name]}}</span>
      </span>
    </transition-group> -->
    <sub-nav-tools></sub-nav-tools>
  </div>
</template>

<script>
import lang from '@/unit/lang'
import { mapState,mapGetters } from 'vuex'
import { SubNavTools } from '@/components/self'
import { Str } from '@/js/public/tool'
export default {
  computed: {
    ...mapState({
      navigation(state){
        // let fastNav = state.fastNavigation.data;
        // this.nav = fastNav[this.$route.name];
        console.log();
        return state.fastNavigation.data[this.$route.path];
      },
      open(state){
        return state.switch.open
      },
      theme(state){
        return `rgba(${Str.changeRGB(state.theme.theme).join(',')},0.02)`
      }
    }),
    length () {
      return this.nav.length
    }
  },
  data(){
    return {
      nav : [],
      lang : lang,
      reloadIcon : require('@/assets/images/reload.png')
    }
  },
  watch : {
    $route(){
      // this.nav = this.navigation[this.$route.path] || [];
    }
  },
  created(){
    // this.nav = this.navigation[this.$route.path] || [];
    // console.log(this.nav);
  },
  methods : {
  },
  components : {
    SubNavTools
  }
}
</script>

<style lang="scss">
#SubNav{
  @include whb(auto,30px,rgba(230,230,230,0.1));
  line-height: 30px;
  padding-left: 20px;
  border-top : 1px solid #dce5f4;
  border-bottom : 1px solid #dfe3ee;
  position: relative;

  .breadcrumb{
    line-height: 30px;
  }

  .n_blank{
    margin: 0 5px;
  }
}
</style>
