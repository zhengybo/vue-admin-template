<!-- 小标题栏 -->
<template lang="html">
  <div class="">
    {{desc}}
  </div>
</template>

<script>
export default Object.assign(require('@/components/form/common').default('hr'),{
  mixins : [{

    data(){
      const {  desc = '标题' } = this.field;
      return {
        desc
      }
    }
  }]
})
</script>
