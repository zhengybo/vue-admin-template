<!-- 日期时间混杂 -->
<template lang="html">
  <el-date-picker
    @change="change"
    v-model="defaultValue[field.key]"
    v-bind="datePickerAttrs"
    :start-placeholder="startDesc"
    :end-placeholder="endDesc"
    :placeholder="desc">
  </el-date-picker>
</template>

<script>
import { Obj } from '@/js/public/tool'
const format = { //默认格式
  datetime : 'yyyy-MM-dd HH:mm:ss',
  datetimerange : 'yyyy-MM-dd HH:mm:ss',
}
export default Object.assign(require('@/components/form/common').default('dateTimePicker'),{
  mixins : [{
    data(){
      const {
        datePickerAttrs = {},
        startDesc = '开始时间',
        endDesc = '结束时间',
        desc = '选择时间'
       } = this.field;
      this.initDefaultAttrs(datePickerAttrs);
      return {
        desc,
        endDesc,
        startDesc,
        datePickerAttrs
      }
    },
    methods : {
      initDefaultAttrs(datePickerAttrs){
        const { type = "datetime" } = datePickerAttrs;
        if(type == 'datetimerange' && !Array.isArray(this.defaultValue[this.field.key])){
          console.error('警告:对于具有范围的组件必须绑定为数组')
        }
        let mat = format[type];
        Obj.cover(datePickerAttrs,{
          format : mat,
          valueFormat : mat,
          type : 'datetime',
          editable : false
        })
      }
    }
  }]
})
</script>

<style lang="css">
</style>
