<!-- 单纯时间 -->
<template lang="html">
  <el-time-picker
    @change="change"
    v-model="defaultValue[field.key]"
    v-bind="timePickerAttrs"
    :start-placeholder="startDesc"
    :end-placeholder="endDesc">
  </el-time-picker>
</template>

<script>
import { Obj } from '@/js/public/tool'
export default Object.assign(require('@/components/form/common').default('time'),{
  mixins : [{
    data(){
      const {
        timePickerAttrs = {},
        startDesc = '开始时间',
        endDesc = '结束时间',
        } = this.field;
      this.initDefaultAttrs(timePickerAttrs);
      return {
        endDesc,
        startDesc,
        timePickerAttrs
      }
    },
    methods : {
      initDefaultAttrs(timePickerAttrs){
        if(timePickerAttrs.isRange && !Array.isArray(this.defaultValue[this.field.key])){
          console.error('警告:对于具有范围的组件必须绑定为数组')
        }
        Obj.cover(timePickerAttrs,{
          isRange : false,
          editable : false,
          format : 'HH:mm:ss',
          valueFormat : 'HH:mm:ss'
        })
      }
    }
  }]
})
</script>

<style lang="css">
</style>
