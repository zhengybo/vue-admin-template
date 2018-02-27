<!-- 下拉 -->
<template lang="html">
  <el-select
  @blur="blur"
  @clear="clear"
  @focus="focus"
  @change="change"
  @remove-tag="removeTag"
  @visible-change="visibleChange"
  v-bind="selectAttrs"
  v-model="defaultValue[field.key]"
  :placeholder="field.desc || '请选择'">
    <el-option
      v-for="(item,index) in field.options"
      v-bind="computeSelfAttrs(item.attrs)"
      :key="index"
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
      computeSelfAttrs(value){
        return Object.assign({},this.optionAttrs,value);
      }
    }
  }]
})
</script>

<style lang="css">
</style>
