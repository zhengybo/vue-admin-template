<!-- 输入框 -->
<template lang="html">
  <el-slider
  @change="change"
  v-bind="sliderAttrs"
  v-model="defaultValue[field.key]"></el-slider>
</template>

<script>
export default Object.assign(require('@/components/form/common').default('slider'),{
  mixins : [{
    data(){
      const { sliderAttrs = {} } = this.field;
      return {
        sliderAttrs
      }
    }
  }]
})
</script>
