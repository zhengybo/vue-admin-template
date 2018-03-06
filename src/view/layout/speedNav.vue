<!-- 滑块导航 -->
<template>
  <div
    ref='container'
    class='speed-container'
    :style="{
      'width' : `${splitGap*126+90}px`
    }">
    <el-carousel
      ref="carousel"
      indicator-position="none"
      @change="change"
      :arrow="splitTags.length >1 ? 'hover' :'never'"
      :autoplay='false'
      height="50px">
      <el-carousel-item
      v-for="(item,index) in splitTags"
      :name="`${index}`"
      :key="index">
        <div
          class="tabs-view-frame"
          :style="{
            'width' :`${splitGap*124}px`
          }">
          <router-link
          v-for="(tag,i) in item"
          class="tabs-view l"
          :to="tag.path"
          :key="tag.path">
            <el-tag
              size="small"
              :type="tag.key === tags.default ? '' : 'info'"
              :class="[tag.key === tags.default ? 'tag-active' : '','tag-item']"
              :closable="splitTags[0].length > 1"
               @close.prevent.stop='close(tag.key)'>
                <template>
                  <span :title="tag.name" class="linkName">{{tag.name}}</span>
                </template>
            </el-tag >
          </router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div
    v-if="local"
    @click="location"
    class="location"></div>
  </div>
</template>

<script>
import lang from '@/unit/lang'
export default {
  computed: {
    tags() {
      return this.$store.state.tabNavigation.speedTabs
    },
    sum(){ //总条数
      return this.tags.options.length
    },
    splitGap (){
      return this.$store.state.tabNavigation.number
    },
    splitTags(){
      let options = this.tags.options,
          gap = this.splitGap,
          result = [],
          i = -gap;
      while((i += gap) < options.length){
        result[result.length] = options.filter((v,k) => k>=i&&k<i+gap);
      }
      if(!result.length)result[result.length] = []; //保持滑块
      return result;
    },
    local (){ //定位
      return this.curIndex != this.lastIndex && this.sum / this.splitGap >2
    }
  },
  data(){

    return {
      lang : lang,
      initialIndex : 0,
      lastIndex : 0,
      curIndex : 0
    }
  },
  created(){
    this.routes();
  },
  mounted(){
    this.wheel();
  },
  methods: {
    wheel (){ //滚轮
      let flag = false,
          timer = null,
          direct = 0,
          { carousel, container} = this.$refs,
          wheel = ~navigator.userAgent.indexOf("Firefox") ? 'DOMMouseScroll' : 'mousewheel';
      const scrollFunc = (e) => {
        if(this.sum <= this.splitGap) return;
        e = e || window.event;
        if(e.wheelDelta){
          direct = e.wheelDelta > 0 ? 1 : -1;
        }else if(e.detail){
          direct = e.detail > 0 ? 1 : -1;
        }
        if(!flag){
          direct > 0 ? carousel.next() : carousel.prev();
          flag = true;
        }
        clearTimeout(timer);
        timer = setTimeout(() => { flag = false; },100);
      }
      container.addEventListener(wheel,scrollFunc,false)
    },
    close (name){ //关闭
      const {
        $store : { dispatch },
        $route : { name : _name},
        $router,
        $nextTick
       } = this;
      dispatch('deleteTabs',{ name : name }).then(res => {
        _name == name &&  $router.push(res.path);
        //需要在跳转后 再移除内存不然在删除自己的时候会内存泄漏!!
        $nextTick(() => {
          dispatch('delCacheView',name);
        })
      });
    },
    change (index){
      this.lastIndex = index;
    },
    location(){
      this.$refs.carousel.setActiveItem(this.curIndex);
    },
    routes (){
      let { path, name, meta } = this.$route;
      if(meta.cache){
        this.$store.dispatch('queryTabs',{
          path : path,
          name : name
        }).then((value) => {
          let index = this.tags.options.findIndex(item => item.key == name);
          if(!~index)return; // 没有在菜单栏内的路由
          this.changeItem(index);
        });
      }

    },
    changeItem(index){ // 切换到指定位置
      let cur = parseInt(index / this.splitGap);
      this.curIndex = cur;
      if(cur == this.lastIndex)return;
      this.lastIndex = cur;
      this.$refs.carousel.setActiveItem(cur);
    }
  },
  watch: {
    $route() {
      this.routes();
    }
  }
}
</script>

<style  lang="scss" >
  .speed-container{
    position: relative;
    float: left;
      width: 600px;
    .el-carousel__arrow{
      width: 20px!important;
      height: 20px!important;
    }

    .el-carousel{
      .linkName{
        float: left;
        display: inline-block;
        text-align: center;
        width: 80px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .el-tag__close{
        float: left;
        margin-top: 4px;
      }
    }

    .el-carousel__item{
      text-align: center;
      vertical-align: middle;
    }

    .tabs-view-frame{
      display: inline-block;
      margin-top: 14px;
    }

    .tag-item{
      transition: border 0.1s ease-in-out;
      box-shadow: 0 2px 3px #efefef, 0px 1px 0 #fff inset;
      &:active{
        border-width: 2px;
        border-right-width: 0;
        border-bottom-width: 0;
        box-shadow: 0 2px 2px #efefef, 0 0px 3px 0px #cdcdcd inset;
      }

      &:hover{
        background: linear-gradient(top, #f9f9f9 0%,#e6e6e6 100%);
      }
    }

    .tabs-view{
      margin: 0 5px;
      display: inline-block;
      text-align: center;
    }

    .location{
      position: absolute;
      z-index: 100;
      cursor: pointer;
      right: 0px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      top:50%;
      margin-top: -4px;
      background-color: #ff0000;
      &:hover{
        transform: scale(1.2);
      }

      &:active{
        transform: scale(1.1);
      }
    }
  }

</style>
