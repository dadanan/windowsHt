<template>
  <div class="modal" v-show="visible" @click.self="handleClose">
    <div class="dialog">
      <div class="dialog__close" @click.self="handleClose"></div>
      <chart :options="chart1Options" class="dialog__chart1"></chart>
      <chart :options="chart2Options" class="dialog__chart2"></chart>
      <div class="dialog__wtf"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modal {
    font-family: "Microsoft YaHei", serif;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-items: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .7);

    * {
      font-family: "Microsoft YaHei", serif;
    }
  }

  .dialog {
    padding: 65px 9px 9px;
    width: 1277px;
    height: 657px;
    background: url("./assets/bg.png");
    margin: auto;
    position: relative;
    display: flex;

    &__wtf {
      background: url("assets/button-group.png");
      width: 386px;
      height: 36px;
      position: absolute;
      bottom: 49px;
      right: 29px;
    }

    &__chart1, &__chart2 {
      padding: 20px;
      width: 629.5px;
      height: 583px;
      flex: 1;
    }

    &__chart2 {
      height: 450px;
    }

    &__close {
      cursor: pointer;
      position: absolute;
      width: 22px;
      height: 22px;
      top: 20px;
      right: 29px;
    }
  }
</style>

<script>
  export default {
    props: ['visible'],
    data() {
      return {
        chart1Options: {
          legend: {
            top: 30,
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            formatter: '{b}: {c} ({d}%)'
          },
          grid: {
            // show: false
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            containLabel: true
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              // center: ['40%', '50%'],
              label: { formatter: '{d}%', color: '#fff' },
              data: [
                {
                  value: 58, name: '控制器',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#1fa6f7' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#5ee5d3' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                {
                  value: 10, name: '新风机',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#ace296' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#23a400' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              ]
            }
          ]
        },
        chart2Options: {
          color: ['#ff6600', '#2797fa'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['设备探头', '净化器', '控制器', '新风机'],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: [
            {
              name: '开机数',
              type: 'bar',
              data: [18203, 23489, 29034, 104970]
            },
            {
              name: '关机数',
              type: 'bar',
              data: [19325, 23438, 31000, 121594]
            }
          ]
        }
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>
