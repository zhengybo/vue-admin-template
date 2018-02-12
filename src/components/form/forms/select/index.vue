<!-- 下拉 -->
<template lang="html">
  <el-select
  @change="change"
  @visible-change="visibleChange"
  @remove-tag="removeTag"
  @clear="clear"
  @blur="blur"
  @focus="focus"
  v-model="defaultValue[field.key]"
  v-bind="selectAttrs"
  :placeholder="field.desc || '请选择'">
    <el-option
      v-for="(item,index) in field.options"
      :key="index"
      v-bind="optionAttrs"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default Object.assign(require('@/components/form/common').default('select'),{
  mixins : [{
    data(){
      const { 
        selectAttrs = {},
        optionAttrs = {},
        desc = '请选择' } = this.field;
      return {
        desc,
        selectAttrs,
        optionAttrs
      }
    },
    methods : {
    }
  }]
})
</script>

<style lang="css">
</style>
