<template lang="html">
  <div
    ref="tool"
    :style="{ top : top }"
    :class="[status ? '' : 'shrink']"
    id="tool">
    <div
    @mousedown.stop.prevent
    :class="['tool-contain',status ? 'show-tool' : '']">
      <div v-show="status">
        <div
          v-for="(item,index) in basisTools"
          :style="{ left : item.x, top : item.y }"
          :key="index"
          class="tool-item">
          <el-tooltip
          v-if="tools[index]"
          effect="dark"
          :open-delay="1000"
          :content="tools[index].name"
          :placement="item.position">
            <div
            @click="emit(tools[index].click)"
            class="tool-icon-frame">
              <icon class="tool-icon"  :icon-class="tools[index].icon" /></div>
          </el-tooltip>
        </div>
      </div>
      <div v-show="!status" @click="display(true)" class="open-tool"></div>
    </div>
    <div @mousedown.stop.prevent :class="'close-contain'">
      <div v-show="status" @click="display(false)" class="close-tool">x</div>
    </div>
    <div v-show="status" @mousedown.stop.prevent class="tool-inner"></div>
    <div v-show="!status" class="tool-drag"></div>
  </div>
</template>

<script>
import Bounce from '@/js/public/lib/bounce'
import Move from '@/js/public/lib/move'
export default {
  props : {

  },
  computed : {
    top (){
      return this.$store.state.tool.top;
    },
    tools (){
      return  this.$store.state.tool.options.filter(item => item.status);
    }
  },
  data(){
    return {
      status : false,
      radius : 70,
      basisTools : [
        {deg : 0 ,   position : 'top'},
        {deg : -45 , position : 'left-start'},
        {deg : -90 , position : 'left'},
        {deg : -135 ,position : 'left-end'},
        {deg : -180 ,position : 'bottom'}
      ]
    }
  },
  created(){
    let r = this.radius;
    this.basisTools.forEach(item=>Object.assign(item,this.setPosition(item.deg,r)));
  },
  mounted(){
    new Move(this.$refs.tool,{
      callback : (value) => {
        this.$store.dispatch('setTop',value)
      }
    })
  },
  methods : {
    stop(){},
    setPosition(deg = 0,r = 0){
      deg = deg / 180 * Math.PI;
      return {
        x : Math.sin(deg) * r + 'px',
        y : -Math.cos(deg) * r + 'px'
      }
    },
    display(status){
      this.status = status;
    },
    emit(click){
      typeof click === 'function' && click.call(this);
    }
  }
}
</script>

<style lang="scss">
  #tool{
    position: fixed;
    z-index: 999;
    right: -70px;
    top: 50%;
    width: 200px;
    height: 200px;
    cursor: pointer;
    user-select:none;
    background-color: rgba(100,100,100,0.5);
    border-radius: 50%;
    transform-origin : 65% 50%;
    transition: transform 0.5s ease 0s;
    // // @include arabesquitic();
    .close-contain{
      width: 0;
      height: 0;
      text-align: center;
      transition: all 0.5s ease 0s;
      position: absolute;
      transform: rotate(180deg);
      left: 50%;
      top: 50%;
    }

    .tool-drag,
    .tool-inner{
      width: 100%;
      height: 100%;
    }

    .tool-drag{
      cursor: move;
    }

    .tool-inner{
      border-radius: 50%;
      box-shadow: 0px 0px 15px gray;
    }

    .tool-contain{
      @extend .close-contain;
      color: white;
      .tool-icon{
        vertical-align: middle;
        margin-right: 0;
        fill: currentColor;
      }
      .tool-icon-frame{
        width: 100%;
        height: 100%;
        line-height: 30px;
      }
      .tool-item{
        position: absolute;
        transition: all 0.15s ease 0s;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: rgba(100,100,100,0.8);
        border-radius: 50%;
        transform: translate(-50%,-50%);
        &:hover{
          transform:translate(-50%,-50%) scale(1.3);
        }
        &:active{
          box-shadow: 0px 0px 30px gray;
          transform:translate(-50%,-50%) scale(1.1);
        }
      }
    }

    .show-tool{
      transform: rotate(360deg);
    }


    .close-tool{
      width: 50px;
      height: 50px;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      font-size: 30px;
      color: white;
      background-color: rgba(100,100,100,0.8);
      transition: all 0.5s ease 0s;
      transform: translate(-50%,-50%);
    }

    .open-tool{
      width: 100px;
      height: 100px;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      transition: all 0.5s ease 0s;
      transform: translate(-50%,-50%);
      background-color: rgba(100,100,100,0.8);
      &:hover{
        transform:translate(-50%,-50%) scale(1.2);
      }

      &:active{
        box-shadow: 0px 0px 30px #ff8800;
        transform:translate(-50%,-50%) scale(0.9);
      }
    }
  }

  #tool.shrink{
    transform:translate(20%,0) scale(0.5);
    &:hover{
      transform:translate(0,0) scale(0.5);
    }
  }
</style>
