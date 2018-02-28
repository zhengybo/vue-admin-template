<!-- 设置 -->
<template lang="html">
  <div id="setting">
    <form-list
    :rules="rules"
    :fields="fields"
    :fromAttrs="attrs"
    :optionAttrs="optionAttrs"
    :defaultValue="defaultValue"
    @success="success"></form-list>
    <div v-show="false">{{toolsOptions}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Functioned } from '@/js/public/tool'
export default {
  name : 'setting',
  computed : {
    ...mapState({
      topSwitch (state){
        return state.switch.open;
      },
      leftSwitch (state){
        return !state.switch.collapse;
      },
      tabsNmuber (state){
        return state.tabNavigation.number;
      },
      tools (state){
        return state.tool.defaultOptions;
      },
      isShowTools (state){
        return state.tool.show;
      },
      toolsOptions (state){
        return state.tool.options;
      }
    })
  },
  watch : {
    toolsOptions : {
      deep : true,
      handler (){
        let tools = this.defaultValue.tools,
            options =  this.fields.find(item => item.key == 'tools').options;
        options.forEach(item => {
          if(!~tools.indexOf(item.value)){
              item.attrs.disabled = (tools.length >= 5);
          }
        })
      }
    }
  },
  data(){
    return {
      optionAttrs : {
        resetMessage : {
          resetToast : true,
          name : '恢复默认',
          text : '你确认要恢复默认数据',
          afterReset : () => {
            const {
              tools,
              topSwitch,
              leftSwitch,
              tabsNmuber,
              isShowTools
            } = Object.assign(this.defaultValue,this.defaultArgs);
            this.showTools(isShowTools);
            this.changeTools(tools);
            this.changeTopSwitch(topSwitch);
            this.changeLeftSwitch(leftSwitch);
            this.changeTabsNmuber(tabsNmuber);
          }
        },
        submitMessage : {
          name : false
        }
      },
      attrs : {
        labelWidth : '150px'
      },
      defaultValue : {
        topSwitch  : true,
        leftSwitch : true,
        tabsNmuber : 4,
        isShowTools : true,
        tools : []
      },
      defaultArgs : {},
      fields : [
        {
          key : 'topSwitch',
          type : 'switch',
          label : '默认顶部展开',
          events : {
            change : v => this.changeTopSwitch(v)
          }
        },
        {
          key : 'leftSwitch',
          type : 'switch',
          label : '默认侧边展开',

          events : {
            change : v => this.changeLeftSwitch(v)
          }
        },
        {
          key : 'tabsNmuber',
          type : 'slider',
          label : '单组快速导航个数',
          sliderAttrs : {
            min : 3,
            max : 8,
            step : 1,
            showStops : true,
            showInput : true,
          },
          events : {
            change : v => this.changeTabsNmuber(v)
          }
        },
        {
          key : 'isShowTools',
          type : 'switch',
          label : '是否显示快捷工具栏',
          events : {
            change : v => this.showTools(v)
          }
        },
        {
          key : 'tools',
          type : 'checkbox',
          // label : '-快捷工具栏选项',
          checkAll : false,
          // 不能再created赋值，不然检测不到 原因未知
          hidden : !+localStorage.getItem('SHOW-TOOLS'),
          options : [],
          attrs : {
            // labelWidth : '170px'
          },
          events : {
            change : v => this.changeTools(v)
          }
        },

      ],
      rules: {
      }
    }
  },
  created(){
    this.initialize();
  },
  methods : {
    initialize(){
      const {
        isShowTools, topSwitch, leftSwitch,
        tabsNmuber, tools, toolsOptions
      } = this;
      const defaultTools = this.toolsOptions.map(item => { //初始化默认小组件
        return {
          value: item.key,
          name: item.name,
          attrs : {
            disabled : tools.length >= 5 && !~tools.indexOf(item.key)
          }
        }
      });
      this.fields.find(item => item.key == 'tools').options = defaultTools;
      Object.assign(this.defaultArgs,this.defaultValue);
      Object.assign(this.defaultValue,{
        tools,
        topSwitch,
        leftSwitch,
        tabsNmuber,
        isShowTools
      })
    },
    success(obj){

    },
    changeTabsNmuber(v){
      this.$store.dispatch('setNumber',v)
          .then(() => localStorage.setItem('TABS-NUMBER',v));
    },
    changeTopSwitch(v){
      this.$store.dispatch('toggleSwitch',+v)
          .then(() => localStorage.setItem('OPEN-SWITCH',+v));
    },
    changeLeftSwitch(v){
      this.$store.dispatch('toggleCollapse',!v)
          .then(() => localStorage.setItem('COLLAPSE-SWITCH',+v));
    },
    showTools(v){
      this.fields.find(item => item.key == 'tools').hidden = !v;
      this.$store.dispatch('showtools',v)
          .then(() => localStorage.setItem('SHOW-TOOLS',+v));
    },
    changeTools(v){
      this.$store.dispatch('setTools',v)
          .then(() => localStorage.setItem('TOOLS-CURRENT',v.join(',')));
    }
  }
}
</script>

<style lang="scss">
#setting{
  .form-item-slider{
    width: 450px;
    float: left;
  }
}
</style>
