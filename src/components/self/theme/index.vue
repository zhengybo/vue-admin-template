
<template lang="html">
  <el-color-picker
    class="theme"
    popper-class="theme-picker-dropdown"
    v-model="theme"></el-color-picker>
</template>

<script>
import { Str } from '@/js/public/tool'
export default {
  computed : {
    oldTheme(){
      return this.$store.state.theme.theme;
    },
    ratio(){
      return this.$store.state.theme.ratio;
    }
  },
  data(){
    return {
      themeId : 'theme-style',
      theme : '#409EFF',
      chalk : '',
      flag : false //判定是否需要更新
    }
  },
  watch : {
    theme(color, oldColor){
      color = color || '#409EFF';
      oldColor = oldColor || '#409EFF';
      if(this.flag){this.flag = false;return};
      this.$store.dispatch('setTheme',color)
                 .then(() => this.changeTheme(color, oldColor));
    }
  },
  created(){
    if(this.theme !== this.oldTheme){this.flag = true}
    this.theme = this.oldTheme;
  },
  methods : {
    changeTheme(color,oldColor){
      const newColors = this.mixColor(color.replace('#', '')),
            oldColors = this.mixColor(oldColor.replace('#', ''));
      let style = document.getElementById(this.themeId) || {},
          innerText = style.innerText;
      if(!innerText)return
      style.innerText = this.updateStyle(innerText, oldColors, newColors);
    },
    updateStyle(style, oldColor, newColor) {
      let newStyle = style;
      oldColor.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newColor[index]);
      })
      return newStyle;
    },
    mixColor(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) {
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))
          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)
          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)
        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }
      let soft = Str.softColor(theme,this.ratio[0],this.ratio[2]),
          upSoft = tintColor(soft.replace('#',''),0.2),
          textSoft = Str.softColor(theme,0.1,0.3);
      const clusters = [theme,soft,upSoft,textSoft]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>

<style scpoed lang="scss">
#SubNav{

  .theme{
    width: 30px;
    height: 30px;
  }
  .el-color-picker__trigger{
    width: 30px;
    height: 30px;
    border-color: transparent!important;
  }
}
</style>
