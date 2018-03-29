<!-- 滑块导航 -->
<template>
  <div
    ref='container'
    class='speed-container'
    @contextmenu.prevent
    :style="{ 'width' : `${splitGap*126+90}px` }">
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
        <div class="tabs-view-frame" :style="{ 'width' :`${splitGap*124}px` }">
          <router-link
          v-for="(tag,i) in item"
          class="tabs-view l"
          :to="{path : tag.path,query : tag.query || {}}"
          :key="tag.path">
            <span @contextmenu.prevent="contextmenu(tag.key,$event)">
              <el-tag
                size="small"
                :title="getTitlePath(tag.path)"
                :type="tag.key === tags.default ? '' : 'info'"
                :class="[tag.key === tags.default ? 'tag-active' : '','tag-item']"
                :closable="splitTags[0].length > 1"
                @close.prevent.stop='close([tag.key])'>
                  <template>
                    <span class="linkName">{{tag.name}}</span>
                  </template>
              </el-tag>
            </span>
          </router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
    <right-menu
    v-if="contextmenuAttr.show"
    @closeCurrent="closeCurrent"
    @closeOther="closeOther"
    @closeRight="closeRight"
    @closeAll="closeAll"
    :attr="contextmenuAttr" class="r-menu"/>
    <div v-if="local" @click="location" class="location"></div>
  </div>
</template>

<script>
import lang from '@/unit/lang'
import { RightMenu } from '@/components/self'
export default {
  computed: {
    titlePaths(state){
      return this.$store.state.fastNavigation.data;
    },
    tags() {
      return this.$store.state.tabNavigation.speedTabs;
    },
    sum(){ //总条数
      return this.tags.options.length;
    },
    splitGap (){
      return this.$store.state.tabNavigation.number;
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
      curIndex : 0,
      contextmenuAttr : {
        show : false,
        left : 100,
        top : 0,
        crrent : null
      }
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
          direct = e.wheelDelta > 0 ? -1 : 1;
        }else if(e.detail){
          direct = e.detail > 0 ? -1 : 1;
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
    getTitlePath (path){
      let { titlePaths, lange } = this;
      return titlePaths[path].map(item => lang[item.name]).join(' > ');
    },
    close(names = [],flag){  //关闭tab
      if(!names.length)return ;
      const {
        tags : { options, default : _default },
        $store : { dispatch },
        $router,
        $route : { name },
        $nextTick
      } = this,
        // 关闭所有 需要保留 home(需要特殊处理)
        isKeepHome = flag == 'all' && name == 'home';
       if(isKeepHome){
         names = names.filter(v => v != 'home');
       }
       let tmp = options.filter(item => ~names.indexOf(item.key));  //被删除项
      dispatch('deleteTabs',names).then(res => {
        let exist = !~names.indexOf(_default);
        // console.log(names);
        if(!exist){ //是否当前当前页面的tab还存在
          if(!options.length){
            $router.push('/main/home');
          }else{
            $router.push(res.path)
          }
        }
        //需要在跳转后 再移除内存不然在删除自己的时候会内存泄漏!!
        $nextTick(() => {
          // if(!options.length) tmp =  tmp.filter(v => v.key !='home');
          tmp.forEach(item => {
            //删除 所有缓存
            // console.log(item.cacheViews);
            (item.cacheViews
              ? dispatch('delCacheViews',item.cacheViews)
              :  dispatch('delCacheView',item.key)).then( () => {
                if(isKeepHome){
                  dispatch('reloadRouter','home');
                }
              });
          })
        })
      });
    },
    change (index){ //修改当前的tab
      this.lastIndex = index;
    },
    location(){ // 定位到当前tab列
      this.$refs.carousel.setActiveItem(this.curIndex);
    },
    routes (){
      let { path, name, meta : { cache, query, cacheViews, speedTab } } = this.$route;
      if(cache){
        this.$store.dispatch('queryTabs',{
          path,
          name,
          query,
          speedTab,
          cacheViews
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
    },
    contextmenu(key,e){ // 右菜单
      let { $route : { name }, tags : { options} } = this;
      if(name == 'home' && options.length == 1){
        return;
      }
      Object.assign(this.contextmenuAttr,{
        show : true,
        left  : e.clientX,
        top : e.clientY,
        current : key
      })
    },
    hideMenu(){
      this.contextmenuAttr.show = false
    },
    closeCurrent(k){
      this.close([k]);
    },
    closeOther(k){
      let {tags : { options }, contextmenuAttr : { current : name } } = this;
      let other = options.filter(item => item.key!=name).map(item => item.key);
      this.close(other);
    },
    closeRight(k){
      let { tags : { options }, contextmenuAttr : { current : name } } = this,
          index = options.findIndex((item,index) => item.key == name ),
          right = options.slice(index+1).map(item => item.key);
      this.close(right);
    },
    closeAll(k){
      this.close(this.tags.options.map(item => item.key),'all');
    },
  },
  watch: {
    $route() {
      this.routes();
    },
    splitGap(v){ // 重置定位
      this.setItem
      let { tags , splitGap } = this,
          name = tags.default,
          index = tags.options.findIndex(item => item.key == name);
      this.curIndex = parseInt(index / splitGap);
    },
    'contextmenuAttr.show'(v) {
      document.body[(v?'add':'remove')+'EventListener']('click', this.hideMenu);
    }
  },
  components : {
    RightMenu
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

    .r-menu{
      position: fixed;
      left: 0;
      top : 0;
      z-index: 989;
    }
  }

</style>
