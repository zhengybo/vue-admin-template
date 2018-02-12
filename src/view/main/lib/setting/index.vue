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
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
      }
    })
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
              topSwitch,
              leftSwitch,
              tabsNmuber
            } = Object.assign(this.defaultValue,this.defaultArgs);
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
        tabsNmuber : 4
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
        }
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
      const { topSwitch, leftSwitch, tabsNmuber } = this;
      Object.assign(this.defaultArgs,this.defaultValue);
      Object.assign(this.defaultValue,{
        topSwitch,
        leftSwitch,
        tabsNmuber
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
