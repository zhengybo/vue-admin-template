<!-- 固定时间选择范围 -->
<template>
  <div class="">
    <el-time-select
      @change="changeStart"
      v-bind="fixedTimeRangeAttrs"
      v-model="defaultValue[field.key][0]"
      :placeholder="startDesc"
      :picker-options="pickerOptions">
    </el-time-select>
    <el-time-select
      @change="changeEnd"
      v-bind="fixedTimeRangeAttrs"
      v-model="defaultValue[field.key][1]"
      :placeholder="endDesc"
      :picker-options="endOption">
    </el-time-select>
  </div>
</template>

<script>
import { Obj } from '@/js/public/tool'
export default Object.assign(require('@/components/form/common').default('fixedTimeRange'),{
  mixins : [{
    computed : {
      endOption(){
        let tmp = this.defaultValue[this.field.key];
        if(tmp[0] > tmp[1]){
          this.defaultValue[this.field.key][1] = tmp[0];
        }
        return {
          ...this.pickerOptions,
          minTime: this.defaultValue[this.field.key][0]
        }
      }
    },
    data(){
      const {
         fixedTimeRangeAttrs = {},
         pickerOptions = {},
         startDesc = '开始时间',
         endDesc = '结束时间' } = this.field;
      this.initDefaultAttrs(pickerOptions,fixedTimeRangeAttrs);
      return {
        endDesc,
        startDesc,
        pickerOptions,
        fixedTimeRangeAttrs
      }
    },
    methods : {
      initDefaultAttrs(pickerOptions,fixedTimeRangeAttrs){
        if(!Array.isArray(this.defaultValue[this.field.key])){
          console.error('警告:对于具有范围的组件必须绑定为数组')
        }
        Obj.cover(pickerOptions,{
          start: '00:00',
          step: '00:10',
          end: '23:55'
        })
        Obj.cover(fixedTimeRangeAttrs,{
          editable : false
        })
      },
      changeStart(v){
        let { start, end } = this.pickerOptions;
        this.change && this.change([start, end]);
        this.events.changeStart && this.events.changeStart(v)
      },
      changeEnd(v){
        let { start, end } = this.pickerOptions;
        this.change && this.change([start, end]);
        this.events.changeEnd && this.events.changeEnd(v)
      }
    }
  }]
})
</script>
