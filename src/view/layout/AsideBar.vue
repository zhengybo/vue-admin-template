<!-- 侧边栏 -->
<template lang="html">
  <div id="AsideBar">
    <div
    :style="{backgroundColor : asideBg}"
    :class="`logoMenu ${isCollapse ?  'logo-shrink' : ''}`">
      <div id="logo"></div>
      <span class="shrink" @click="small">
        <icon icon-class="email"></icon>
      </span>
    </div>
    <scrollbar
    ref="scroll"
    id="scroll-aside"
    :class="{
      'aside-scroll' : true,
      'animate-scroll' : isCollapse
      }"
    :isHiddenOverArea="isHidden"
    :style="{backgroundColor : asideBg}">
      <el-menu
        ref="menu"
        text-color="#fff"
        :router="true"
        :collapse="!!isCollapse"
        :default-active="$route.name"
        :class="['el-menu-vertical',isCollapse ? 'collapse-hide' : '']"
        :background-color="asideBg"
        :active-text-color="textColor"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
        <select-tree :data="router"></select-tree>
      </el-menu>
    </scrollbar>

  </div>
</template>

<script>

// import { AsyncRouter } from '@/router/route'
import { getMenus } from '@/js/public/init'
import { Str, Arrayed } from '@/js/public/tool'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isCollapse(state){
        return state.switch.collapse;
      },
      onlyOpenActive(state){
        return state.switch.onlyOpenActive;
      },
      themeColor(state){
        return state.theme.theme;
      },
      ratio(state){
        return state.theme.ratio;
      }
    }),
  },
  watch : {
    themeColor(color){
      this.changeTheme(color);
    },
    isCollapse(value){
      if(value){
        setTimeout(() => {
          this.isHidden = false;
        },700)
      }else {
        this.isHidden = true;
      }
    }
  },
  data() {
    return {
      // router : AsyncRouter.children,
      // 获取形式上的menus结构
      router :  getMenus(),
      asideBg : '#393d46',
      textColor : '#eaeaea',
      openedMenus : [],
      submenus : [],
      timer : null,
      isHidden : true //控制超出部分是否显示
    }
  },
  created: function () {
    this.changeTheme(this.themeColor);
  },
  mounted(){
    this.initialize();
  },
  components: {  },
  methods: {
    initialize(){
      // 赋予外部的openedMenus 使其所有操作被外部的openedMenus接收到
      this.$refs.menu.openedMenus = this.openedMenus = this.getIndexPath();
    },
    getIndexPath(){
      let { items, activeIndex } = this.$refs.menu,
          path = items[activeIndex];
      return path ? path.indexPath : [];
    },
    changeTheme(color){
      this.textColor = Str.softColor(color,0.1,0.3);
      this.asideBg = Str.softColor(color,this.ratio[0],this.ratio[1]);
    },
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    },
    handleSelect(key, keyPath){
      // console.log(key,keyPath);
    },
    getMenus(){
      // console.log(this.openedMenus);
    },
    small(){
      if(this.onlyOpenActive){
        // this.openedMenus = this.getIndexPath();
      }
      // 当前活动处会强制打开 （正在查看原因） 2-8
      this.$store.dispatch('toggleCollapse').then((status) => {
        if(!status){
          // let menu = this.$refs.menu;
          // //还原外部保留的展开量
          if(this.onlyOpenActive){
            return ;
          }
          this.timer = setTimeout(() => {
            this.$refs.menu.openedMenus = this.openedMenus;
          },400)
          // menu.openedMenus.push(...store);
        }else if (status && this.timer) {
          clearTimeout(this.timer);
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import './../../scss/compoents/icon-aside.scss';
#AsideBar{
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  .aside-scroll{
    z-index: 100;
    width: 200px;
    transition:all .5s ease;
  }
  .animate-scroll{
    width: 40px;
  }
  .shrink{
    z-index: 101;
    position: absolute;
    transition: all  0.6s ease;
    height: 15px;
    bottom:0;
    right: 8px;
    opacity: 0.1;
    .icon {
      width: 1.2em;
      height: 1.2em;
    }
  }
  .el-menu{
    height: 100%;
  }
  .el-menu{
    border-right: 0;
  }
  .is-active{
    color: inherit;
  }
  .logo-shrink{
    height: 20px;
    #logo{
      background : none;
    }
  }
}
#logo{
  width: 100%;
  height: 100%;
  color: white;
  font-size: 22px;
  text-align: center;
  line-height: 84px;
  white-space:nowrap;
  background-color: #393d46;
  position: relative;
  transform-origin : 0 0;
  background: url('/src/assets/images/CarMate.png') no-repeat center center;
  background-size: 60% 60%;
}

.logoMenu{
  position: relative;
  padding: 0!important;
  height: 84px;
  transition: all  0.5s ease;
  &:hover{
    .shrink{
      opacity: 0.9!important;
    }
  }
  .el-menu-item-group__title{
    padding: 0;
  }
  > ul{
    height: 84px;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  position: relative;
}

</style>
