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
      http : null,
      noData : false
  	}
	},
	mounted () {
     this.init();
     window.addEventListener("resize",  this.echart.resize)
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
    init(){
      // console.log(document.getElementById(this.id+'Echart')==this.$refs.self);
      this.echart = echarts.init(this.$refs.self);
      this.initLoading && this.load();
    },
    setOption(param){
      let { echart, setting, $refs : { self } } = this,
          { options, options : { series }, config = {}, type } = param,
          data = series[0] ? series[0].data : series.data;
      this.noData = data && !data.length;
      config.horizonta && echartTool.setHeight(self, options, echart);
      echart.setOption(echartConfig[type](options, config));
      setting.callback && setting.callback(echart);
    },
    load (){ // 带入数据
      this.echart.showLoading(this.loadMsg);
      this.noData = false;
      let { setting : { url, success, alias, fail }, param } = this;
      this.$http({
        url : url,
        data : {
        },
        publicFn : (res) => {
          this.echart.hideLoading();
        },
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
          this.setOption(param);
        },
        fail : (data) => {
          fail && fail(data);
        },
        catchFn(){
        }
      })
    }
	},
  beforeDestroy(){
    window.removeEventListener("resize", this.echart.resize);
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
