<!-- 验证码 -->
<template lang="html">
  <div id="verification" :class="(flag ? 'flish' :'')">
    <span v-if="!flag" class="title">拖动滑块验证</span>
    <div
    id="slide"
    @mouseup ="mouseUp"
    @mousedown="mouseDown"
    class="slide">
      <span v-if="!flag">&gt;&gt;</span>
      <img
      v-if="flag"
      class="filshImg"
      :src="'./static/images/lib/flish.png'" alt=""></div>
    <div id="green" class="green">
      {{flag ? '验证通过' : ''}}</div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      compass : false, //验证通过?
      elX : 0,
      elY : 0,
      end : 200, //结束长度
      slide : null, //滑块引用
      flag : false,
      down : false //是否已经按下了
    }
  },
  mounted(){
    let ret = this.$el.getBoundingClientRect();
    this.slide = document.getElementById('slide');
    this.green = document.getElementById('green');
    document.onmouseup = () => {
      if(!this.down){
        return;
      }
      document.onmousemove = null;
      this.mouseUp();
    }
  },
  methods : {
    mouseDown(target){
      if(this.flag)return;
      let fixX = target.clientX,
          fixY = target.clientY;
      this.down = true;
      document.onmousemove = (e) => {
      var e = e || window.event;
      this.mouseMove(e,fixX,fixY)
      };
    },
    mouseUp(){
      this.down = false;
      if(this.flag)return;
      this.setPosition(this.slide,0);
      document.onmousemove = null;
    },
    mouseMove(e,fixX,fixY){
      let offsetX = e.clientX - fixX,
          offsetY = e.clientY - fixY,
          end = this.end;
      offsetX = offsetX < 0 ? 0 : offsetX;
      offsetX = offsetX > end ? end  : offsetX;
      if(offsetX >= end){
        this.flag = true;
        this.$emit('pass',true);
        document.onmousemove = null;
      }
      this.setPosition(this.slide,offsetX);
    },
    setPosition(elem,x,y){
      this.green.style.width = x + 30 + 'px';
      elem.style.left = x  + 'px';
      // elem.style.top = x + 'px';
    }
  }
}
</script>

<style scoped lang="scss">

.flish {
  .slide{
    cursor: default!important;
  }
}
#verification{
  height: 30px;
  background-color: #e8e8e8;
  position: relative;

  .filshImg{
    position: absolute;
    width: 16px;
    height: 16px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .title{
    position: absolute;
    width: 100%;
    z-index: 1;
    line-height: 30px;
    display: block;
    user-select:none;
  }

  .slide{
    width: 30px;
    height: 30px;
    left: 0;
    top: 0;
    z-index: 2;
    color: #999;
    user-select:none;
    border:1px solid #ccc;
    box-sizing: border-box;
    background-color: white;
    position: absolute;
    cursor: move;
    line-height: 28px;

    img{
      display: inline-block;
      text-align: center;
    }
  }



  .green{
    position: absolute;
    height: 30px;
    background-color: #7ac23c;
    color: white;
    line-height: 30px;
    user-select:none;
  }
}
</style>
