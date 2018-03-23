<!-- 顶部栏 -->
<template lang="html">
  <div class="">
    <div id="NavBar" :class="[open ? '' :'toggle-shrink',hidden ? 'hidden' : '']">
      <speed-nav></speed-nav>
      <el-menu :default-active="$route.name" class="navbar r" mode="horizontal">
        <el-submenu index="actions">
          <template slot="title">{{$store.state.user.username}}</template>
          <router-link to="/main/user">
            <el-menu-item index="user">
              <icon class="icon-set" icon-class="user"></icon>
              个人中心
            </el-menu-item>
          </router-link>
          <router-link to="/main/setting">
            <el-menu-item index="setting">
              <icon class="icon-set" icon-class="settings"></icon>
              设置
            </el-menu-item>
          </router-link>
          <el-menu-item @click="logout" index="exit">
            <icon class="icon-set" icon-class="exit"></icon>
            退出登录
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="userInfo r">
        <div class="userInfoInner">
          <img :src="userInfo.icon || staticInof" alt="">
        </div>
      </div>
    </div>
    <!-- <settings :dialogVisible ="dialogVisible"></settings> -->
  </div>

</template>

<script>
import speedNav from './speedNav'
// import {Settings} from  '@/components/self'
export default {
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo || '';
    },
    open (){
      let open = this.$store.state.switch.open;
      this.hidden = !open;
      return open;
    }
  },
  watch : {
    open(){
      if(this.timer){
        clearTimeout(this.timer);
      }
      if(this.open){
        this.hidden = true;
        this.timer = setTimeout(() => {
          this.hidden = false;
          clearTimeout(this.timer);
        },1000)
      }else {
        this.hidden = true;
      }

    }
  },
  data(){
    return {
      hidden : false,
      timer : null,
      dialogVisible : false,
      staticInof : require('@/assets/images/user_icon.png')
    }
  },
  methods : {
    logout(){
      this.$store.dispatch('logOut');
    }
  },
  components : {
    speedNav,
    // Settings
  }
}
</script>

<style lang="scss">
.international-icon{
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px;
}
#NavBar{
  height: 50px;
  position: relative;
  margin-right: 30px;
  z-index: 99;
  transition: all 0.5s ease;
  .navbar{
    margin-right: 10px;
    height: 100%!important;
  }

  .el-submenu__title{
    height: 50px;
    max : 100px;
    padding:0 10px;
  }

  &.toggle-shrink{
    height: 0;
  }

  ul.el-menu{
    right: 0;
    left: auto;
  }
  .el-submenu {
    .el-menu{
      top: 50px;
    }

    .el-menu-item{
      width: 100%!important;
      min-width: 140px;
    }
  }

  .is-active{
    .el-submenu__title{
      border-bottom: 0;
    }
  }

  .userInfo{
    margin-top: 8px;
    height: 40px;
    width: 30px;


  }

  .userInfoInner{
    position: relative;;
    height: 100%;
    img{
      position: absolute;
      height: 30px;
      width: 30px;
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }

  .el-menu--horizontal .el-submenu>.el-menu{
    padding: 0;
  }

  .logoutIcon{
    margin-left: 10px;
    margin-top: 5px;
    width:20px;
    height: 24px;
    margin-right: 10px;
    background: url('/src/assets/quit_icon.png') no-repeat center center;
    background-size: 20px 24px;
  }

  .icon-set{
    height: 1.2rem;
    vertical-align:sub;
  }

}
</style>
