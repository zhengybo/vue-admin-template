<!-- 单选 -->
<template lang="html">
  <el-radio-group
  size="mini"
  @change='change'
  v-bind="radioGroupAttrs"
  v-model="defaultValue[field.key]">
      <el-radio
      v-for="(item,index) in options"
      v-bind="computeSelfAttrs(item.attrs)"
      :key="index"
      :label="item.value">{{item.name}}</el-radio>
  </el-radio-group>
</template>

<script>
export default Object.assign(require('@/components/form/common').default('radio'),{
  mixins : [{
    data(){
      const {options = [], radioAttrs = {}, radioGroupAttrs = {}} = this.field;
      return {
        options,
        radioAttrs,
        radioGroupAttrs
      }
    },
    watch : {
      'field.options' : function(value){
        this.options = value;
      }
    },
    methods : {
      computeSelfAttrs(value){
        return Object.assign({},this.radioAttrs,value);
      }
    }
  }]
})
</script>

<style lang="css">
</style>
