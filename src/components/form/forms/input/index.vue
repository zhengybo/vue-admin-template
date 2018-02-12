<!-- 输入框 -->
<template lang="html">
  <el-input
    @blur="blur"
    @focus="focus"
    @change="change"
    v-model="defaultValue[field.key]"
    v-bind="inputAttrs"
    :placeholder="desc">
  </el-input>
</template>

<script>
export default Object.assign(require('@/components/form/common').default('input'),{
  mixins : [{
    computed : {

    },
    data(){
      const { inputAttrs = {}, desc = '请输入内容' } = this.field;
      return {
        desc,
        inputAttrs
      }
    }
  }]
})
</script>
