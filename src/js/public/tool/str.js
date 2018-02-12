/**
 * 扩展String
 */
export default class Str extends String{
  /* 首字母大写 */
  static titleCase(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  /* 补0 */
  static zeroFill(number,length){
    number = number.toString();
    let nl = number.replace(/\,/g,'').length;
    if(nl > length-1){return number}
    return new Array(length-nl+1).join('0') + number;
  }

  /**
   * RGB 颜色互转
   * @param color (Sting(ex: #fesdad | fesdad)|Array(ex: [12,32,54]))
   * @return String | Array
   */
  static changeRGB(color,offset = 0){
    if(Array.isArray(color)){
      if(color.length <3)return color;
      return '#' +color.map(v => Str.zeroFill((+v).toString(),2)).join('');
    }
    return color.replace('#','')
                .replace(/(\w{2})/g,(a) => parseInt(a,16) + (+offset) + ',')
                .slice(0,-1).split(',');
  }

  static offsetRGB(color,offset){
    return color.map(v => +v + offset);
  }

  /* 互补色 */
  static complementaryColor(color){
    return Str.changeRGB(color.map(v => 255 - (+v)));
  }

  static getColorChannels(color) {
    color = color.replace('#', '');
    if (/^[0-9a-fA-F]{3}$/.test(color)) {
      color = color.split('');
      for (var i = 2; i >= 0; i--) {
        color.splice(i, 0, color[i]);
      }
      color = color.join('');
    }
    if (/^[0-9a-fA-F]{6}$/.test(color)) {
      return {
        red: parseInt(color.slice(0, 2), 16),
        green: parseInt(color.slice(2, 4), 16),
        blue: parseInt(color.slice(4, 6), 16)
      };
    } else {
      return {
        red: 255,
        green: 255,
        blue: 255
      };
    }
  }

  static mixColor(color, percent) {
    var _getColorChannels = Str.changeRGB(color),
        red = _getColorChannels[0],
        green = _getColorChannels[1],
        blue = _getColorChannels[2];

    if (percent > 0) {
      // shade given color
      red *= 1 - percent;
      green *= 1 - percent;
      blue *= 1 - percent;
    } else {
      // tint given color
      red += (255 - red) * percent;
      green += (255 - green) * percent;
      blue += (255 - blue) * percent;
    }
    return 'rgb(' + Math.round(red) + ', ' + Math.round(green) + ', ' + Math.round(blue) + ')';
  }

  static softColor(color,shade=0.9,tint=1){
    var _getColorChannels = Str.getColorChannels(color),
        red = _getColorChannels.red,
        green = _getColorChannels.green,
        blue = _getColorChannels.blue;
    red *= 1 - shade;
    green *= 1 - shade;
    blue *= 1 - shade;
    red += tint * (255 - red);
    green += tint * (255 - green);
    blue += tint * (255 - blue);
    red = Math.round(red).toString(16)
    green = Math.round(green).toString(16)
    blue = Math.round(blue).toString(16)
    return `#${red}${green}${blue}`
  }
}
