/**
 * 基础配置
 */

export default () => {
  return {

    //固有基础配置---
    title : {
      show : false,
      text: '',
      left  : 'center',
      textStyle : {
        fontWeight  : 'normal'
      }
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {//工具栏
      show: true,
      feature: {
          saveAsImage: {}
      },
      // right :'4%'
    },
    grid: {//网格
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      borderColor : '#F2F2F2'
    },
    color : ['#4DB8E4','#E5525C', '#5BD0DA', '#3699DD', '#FF8144','#4CB7E5',  '#7ABC8E', '#8D91FF','#FF5203', '#3C8CE3', '#FE9B48','#FE9B48','#F28B8C','#C6DD82']
  }
}
