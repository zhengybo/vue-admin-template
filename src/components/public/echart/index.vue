<!-- 绘制图形 -->
<template lang="html">
    <div class="Econtain">
      <div
      ref="self"
      class="selfChart"
      :id="id+'Echart'"
      :style="styleCSS"></div>
      <div v-show="noData" class="noData">没有查到相关数据</div>
    </div>
</template>

<script>
import echartConfig from '@/js/echartConfig'
import { echartTool } from '@/js/public/tool/echartTool'
import { Obj, Arrayed, Functioned } from '@/js/public/tool'
export default {
	props : {
    id : {
      type : String,
      default : ''
    },
    param : {
      type : Object,
      default : () => ({
        type : 'lineEchart',
        options : {}
      })
    },
    styleCSS : {
      type : Object,
      default(){
        return {
          height : '300px'
        }
      }
    },
    setting : {
      type : Object,
      default : () => ({
        url : '',
        type : 'GET',
        data : {},
        success : () => {},
        error : () => {}
      })
    },
    reload : {
      type : Boolean,
      default : false
    },
    initLoading : {
      type : Boolean,
      default : false
    },
  },
  computed : {
    theme(){
      return this.$store.state.theme.theme;
    },
    loadMsg(){
      return {
         text : '数据获取中···',
         color : this.theme,
         zlevel : 999
      }
    }
  },
	data(){
  	return {
      echart : null,
      _resize : null,
      http : null,
      noData : false,
      exist : []
  	}
	},
	mounted () {
     this.init();
  },
  watch : {
    param (param) {
      this.setOption(param)
    },
    setting(param){

    },
    reload(){
      this.load ();
    }
  },
	methods : {
    reset(){
      this.echart.resize();
    },

    init(){
      // console.log(document.getElementById(this.id+'Echart')==this.$refs.self);
      // 标记侧边收缩
      this.echart = echarts.init(this.$refs.self);
      this.ScrollAside = document.querySelector('#scroll-aside');
      this.ScrollAside.addEventListener('transitionend',(e) => {
        if(e.target != this.ScrollAside) return ;
        this.reset();
      });
      this._resize = Functioned.throttle(this.reset,100,true);
      window.addEventListener("resize", this._resize);
      this.setting.async && this.asyncCompassChanged();
      this.initLoading && this.load();
    },
    asyncCompassChanged(){
      this.echart.on('legendselectchanged', (v) => {
        let { async : _async } = this.setting;
        if(!Obj.isObject(_async)) return ;
        let { query, compass, default : _default } = _async,
        { selected, name } = v;
        selected[name] ? _default.push(name) : Arrayed.remove(_default,name);
        if(selected[name] && !compass[name]){
          this.echart.showLoading(this.loadMsg);
          this.$http(
            this.getPublicHander({
              publicFn : (res) => {
                this.echart.hideLoading();
              },
              data : {
                ...query[name]
              }
            },() => this.asyncCompass(name))
          )
        }
      })
    },

    asyncCompass(name){ // 异步请求成功
      Obj.setObjValue(`legend.selected.${name}`,true)(this.param.options);
      Obj.setObjValue(`compass.${name}`,true)(this.setting.async);
    },

    setOption(param){
      let { echart, setting, $refs : { self } } = this,
          { options, options : { series }, config = {}, type } = param,
          data = series[0] ? series[0].data : series.data;
      // this.noData = data && !data.length; // 判断 根据项目而定
      config.horizonta && echartTool.setHeight(self, options, echart);
      echart.setOption(echartConfig[type](options, config));
      echart.resize();
      setting.callback && setting.callback(echart);
    },

    load (){ // 带入数据
      let _async = this.setting.async;
      _async ? this.asyncAct(_async) : this.syncAct();
    },

    asyncAct (_async){ //异步操作
      if(!_async.compass) _async.compass = {};
      Object.keys(_async.compass).forEach(k => _async.compass[k] = false);
      if(_async.request) { //存在预请求
        this.asyncRquest(_async).then((v) => {
          this.setOption(this.param); // 更新图
          this.mulAsyncRquest(_async); //发起当前异步
        });
      }else {
        this.mulAsyncRquest(_async);
      }
    },

    mulAsyncRquest(_async){ // 请求 默认的类别
      this.echart.showLoading(this.loadMsg);
      let requests = _async.default.map(val => { //生成请求列表
        return this.getPublicHander({
          data : _async.query[val]
        },
        () => {
          //标记完成请求
          Obj.setObjValue(`compass.${val}`,true)(_async)
        })
      })
      this.$https(requests,this.exist).then((list) => {
        this.echart.hideLoading();
      }).catch(() => {
        this.echart.hideLoading();
      })
    },

    asyncRquest (_async){ // 请求所有的类别
      let { url, success, fail } = _async.request;
      return this.$http({
        url : url,
        data : {
        },
        success : (data) => {
          success && success.call(this,data,_async,this.param.options);
        },
        fail : (data) => {
          fail && fail(data);
        }
      })
    },

    syncAct (){ //同步操作
      this.echart.showLoading(this.loadMsg);
      this.noData = false;
      this.$http(
        this.getPublicHander({
          publicFn : (res) => {
            this.echart.hideLoading();
          }
        })
      )
    },

    getPublicHander(obj = {},fn){ // 获取公有 的请求结构体
      let { setting : { url, success, alias, fail, data={} }, param } = this;
      let r= Obj.merge({
        url,
        data : { ...data },
        success : (data) => {
          success && success.call(
            this,
            echartTool.changeData(
              data.list || [],
              alias
            ),
            param.options,
            param,
            data.list
          );
          fn && fn();
          this.setOption(param);
        },
        fail : (data) => {
          fail && fail(data);
        }
      },obj)
      return r;
    }

	},
  beforeDestroy(){
    this.echart.off('legendselectchanged');
    this.ScrollAside.removeEventListener('transitionend',this._rize);
    window.removeEventListener("resize", this._resize);
  }
}
</script>

<style  lang="css">
.Econtain{
  position: relative;
}
.noData{
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
</style>
