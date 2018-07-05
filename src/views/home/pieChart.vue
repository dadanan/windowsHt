<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'static/global/echarts.min.js'
  import 'static/global/china.js'
//  import echarts from 'echarts'

require('echarts/theme/macarons') // echarts 主题
  // import echarts from 'static/global/echarts.min.js'

export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          tooltip: {
//                    show: false //不显示提示标签
            formatter: '{b}', //提示标签格式
            backgroundColor:"#ff7f50",//提示标签背景颜色
            textStyle:{color:"#fff"} //提示标签字体颜色
          },
          series: [{
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: true,//显示省份标签
                textStyle:{color:"#c71585"}//省份标签字体颜色
              },
              emphasis: {//对应的鼠标悬浮效果
                show: true,
                textStyle:{color:"#800080"}
              }
            },
            itemStyle: {
              normal: {
                borderWidth: .5,//区域边框宽度
                borderColor: '#009fe8',//区域边框颜色
                areaColor:"#ffefd5",//区域颜色
              },
              emphasis: {
                borderWidth: .5,
                borderColor: '#4b0082',
                areaColor:"#ffdead",
              }
            },
            data:[
              {name:'福建', selected:true}//福建为选中状态
            ]
          }],
        })
      }
    }
  }
</script>
