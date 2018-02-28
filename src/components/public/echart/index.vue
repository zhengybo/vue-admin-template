<!-- 绘制图形 -->
<template lang="html">
    <div class="Econtain">
      <div class="selfChart" :id="id+'Echart'" :style="Style"></div>
      <div v-show="noData" class="noData">
        没有查到相关数据
      </div>
    </div>
</template>

<script>
import config from '@/js/echartConfig'
import {echartTool} from '@/js/public/tool/echartTool'

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
    Style : {
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
	data(){
  	return {
      echart : null,
      http : null,
      noData : false,
      loadMsg : {
         text : '数据获取中···',
         color : '#ff8245',
         zlevel : 999
      },
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
      this.echart = echarts.init(document.getElementById(this.id+'Echart'));
      this.initLoading && this.load();
    },
    setOption(param){
      // console.log(param.options.yx);
      let series = param.options.series,
          data = null;
      if(series[0]){
        data = series[0].data;
      }else {
        data = series.data
      }
      if(!data.length){
        this.noData = true;
      }else {
        this.noData = false;
      }
      param.type == 'barEchart' &&  param.options.yx !== false && echartTool.setHeight(this.$el.querySelector('.selfChart'),param.options,this.echart);
      this.echart.setOption(config[param.type](param.options));
      this.setting.callback && this.setting.callback(this.echart);
    },
    load (){ // 带入数据
      this.echart.showLoading(this.loadMsg);
      this.noData = false;
      let setting = this.setting;
      if(this.http){
        this.http.abort();
        this.http = null;
      }
      this.http = this.$api.http({
        url : setting.url ,
        type : setting.type || 'GET',
        data : JSON.parse(JSON.stringify(setting.data)),
        success : (data) => {
          this.echart.hideLoading();
          setting.success && setting.success.call(this,echartTool.changeData(data.list || [],setting.alias,this.param.type == 'barEchart'),this.param.options,this.param,data.list);
          this.setOption(this.param);
        },
        error :(state) => {
          this.echart.hideLoading();
          state !== '0000' && this.$root.toast('失败');
          setting.error && setting.error(data);
        },
        catch : () => {
            this.echart.hideLoading();
        }
      });
    }
	},
  destroyed(){
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
