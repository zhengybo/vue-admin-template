<template lang="html">
  <div class="">
    详情
    <search>
      <template>
        <div reset >2123</div>
      </template>
    </search>
    <div>{{time}}</div>

    <router-link
    :to="'/main/active-manage?_=2'">
      激活管理2
    </router-link>
    <link-to
    :to="{
      name : 'activeManage',
      query : {_ :'我是新的'}
      }"
    >
      激活管理3
    </link-to>
    <!-- <router-link
    :to="'/main/active-manage?_=3'">
      激活管理3
    </router-link> -->
    <!-- <link-to
    :to="{
      name : 'search2-detail',
      query : {_ :'我是新的'}
      }"
    >
      重新加载
    </link-to> -->
    <div @click="clear">清理</div>
    <a @click="link">重新加载</a>
  </div>
</template>

<script>
export default {
  name: 'search2-detail',
  updated(){
  },
  created(){

  },
  data(){
    return {
      time : this.$route.query._
    }
  },
  mounted(){

  },
  methods : {
    clear(){
      this.$store.dispatch('delCacheView','search2-detail').then(r => {
        // console.log(this.$store.state.tabNavigation.cacheViews);
      });
    },
    link(){
      // this.$router.replace({
      //   path : '/main/search2/detail',
      //    query : {
      //      _ : new Date().getTime()
      //    },
      //    force: true
      // })
      this.$root.routerPush({
        name : 'activeManage',
        query : {_ :'我是新的'},
        _ : new Date().getTime()
      })
    }
  }
}
</script>

<style lang="css">
</style>
