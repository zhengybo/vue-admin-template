<!-- 多选 -->
<template>
  <div>
    <el-checkbox
    v-if="field.checkAll"
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="checkAllChange">全选</el-checkbox>
    <div></div>
    <el-checkbox-group
    v-bind="grounpAttrs"
    v-model="defaultValue[field.key]"
    @change="change">
      <el-checkbox
      v-for="(item,index) in options"
      v-bind="computeSelfAttrs(item.attrs)"
      :name="field.key"
      :label="item.value"
      :key="index">{{item.name}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default Object.assign(require('@/components/form/common').default('checkbox'),{
  mixins : [{
    data() {
      const { options = [], grounpAttrs ={}, checkboxAttrs = {} } = this.field;
      return {
        checkAll: options.length == this.defaultValue[this.field.key],
        options,
        grounpAttrs,
        checkboxAttrs,
      }
    },
    watch : {
      'field.options' : function(value){
        this.options = value;
      }
    },
    computed : {
      isIndeterminate(){
        if(!this.field.checkAll)return;
        let ld = this.defaultValue[this.field.key].length,
            lo = this.options.length;
        this.checkAll = ld == lo;
        return ld > 0 && ld < lo;
      },
      checkAllItems(){
        return this.options.map(item => item.value);
      }
    },
    methods: {
      computeSelfAttrs(value){
        return Object.assign({},this.checkboxAttrs,value);
      },
      checkAllChange(val) {
        this.defaultValue[this.field.key] = val ? this.checkAllItems : []
      }
    }
  }]
})

</script>
<style media="screen">

</style>
