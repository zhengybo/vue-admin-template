<!-- 固定时间选择范围 -->
<template>
  <div class="">
    <el-time-select
      v-bind="fixedTimeAttrs"
      v-model="defaultValue[field.key]"
      :placeholder="desc"
      :picker-options="pickerOptions">
    </el-time-select>
  </div>
</template>

<script>
import { Obj } from '@/js/public/tool'
export default Object.assign(require('@/components/form/common').default('fixedTime'),{
  mixins : [{
    data(){
      const {
         fixedTimeAttrs = {},
         pickerOptions = {},
         desc = '请选择时间' } = this.field;
      this.initDefaultAttrs(pickerOptions,fixedTimeAttrs);
      return {
        desc,
        pickerOptions,
        fixedTimeAttrs
      }
    },
    methods : {
      initDefaultAttrs(pickerOptions,fixedTimeAttrs){
        Obj.cover(pickerOptions,{
          start: '00:00',
          step: '00:10',
          end: '23:55',
        })
        Obj.cover(fixedTimeAttrs,{
          editable : false
        })
      }
    }
  }]
})
</script>
