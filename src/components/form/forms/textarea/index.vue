<!-- 输入框 -->
<template lang="html">
  <el-input
    type="textarea"
    @blur="blur"
    @focus="focus"
    @change="change"
    v-model="defaultValue[field.key]"
    v-bind="textareaAttrs"
    :placeholder="desc">
  </el-input>
</template>

<script>
export default Object.assign(require('@/components/form/common').default('input'),{
  mixins : [{
    computed : {

    },
    data(){
      const { textareaAttrs = {}, desc = '请输入内容' } = this.field;
      return {
        desc,
        textareaAttrs
      }
    }
  }]
})
</script>
