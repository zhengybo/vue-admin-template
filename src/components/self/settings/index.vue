<template lang="html">
  <div class="">
    你可以在这里设置
  </div>
</template>

<script>
export default {
    props : {
      dialogVisible: {
        type : Boolean,
        default : false
      }
    },
    data() {
      return {
        // dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        done();
      }
    }
  };
</script>

<style lang="css">
</style>
