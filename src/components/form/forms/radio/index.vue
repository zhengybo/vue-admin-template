<!-- 单选 -->
<template lang="html">
  <el-radio-group
  size="mini"
  @change='change'
  v-bind="radioGroupAttrs"
  v-model="defaultValue[field.key]">
      <el-radio
      v-for="(item,index) in options"
      v-bind="radioAttrs"
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
    methods : {
    }
  }]
})
</script>

<style lang="css">
</style>
