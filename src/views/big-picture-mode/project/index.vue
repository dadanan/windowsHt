<template>
  <div class="solution">
    <div class="solution__back" @click="$router.back()"></div>
    <div class="solution__details">
      <div class="solution__details_top">
        <p>工程概况</p>
      </div>
      <div class="solution__details_content">
        <div class="">工程名称 : <span>{{from.name}}</span></div>
      </div>  
      <div class="solution__details_content">
        <div class="">工程编号 : <span>{{from.projectNo}}</span></div>
      </div>  
      <div class="solution__details_content">
        <div class="">工程时间 : <span>{{new Date(from.buildTime).toLocaleString()}}</span></div>
      </div>
      <div class="solution__details_content">
        <div class="">工程地址 : <span>{{from.buildAddress}}</span></div>
      </div>
      <div class="solution__details_content ms">
        <div class="ds">工程描述 : <span>{{from.description}}</span></div>
      </div>
      <div class="img"></div>
      <div class="solution__details_bottom">
        <p>历史曲线</p>
      </div>
      <div class="solution__details_xz">
        <div class="solution__details_xz_z" @click="projects = true">
          <p>{{project}}</p>
          <div class="project-dropdown" v-if = "projects">
            <span v-for = "item in selectGroup" :key="item.id" @click.stop="projectg(item)">{{item.name}}</span>
          </div>
        </div>
        <div class="solution__details_xz_z" @click="devices = true">
          <p>{{device}}</p>
          <div class="project-dropdown" v-if = "devices">
            <span v-for = "item in deviceList" :key="item.id" @click.stop="devicec(item)">{{item.name}}</span>
          </div>
        </div>
        <div class="solution__details_xz_z" @click="features = true">
          <p>{{featur}}</p>
          <div class="project-dropdown" v-if = "features">
            <span v-for = "item in featureList" :key="item.id" @click.stop="feature(item)">{{item}}</span>
          </div>
        </div>
      </div>
      <div class="solution__details_qx">
        <chart :options="userDataChartOptions" class="bdp-chart"></chart>
      </div>
    </div>
    <div class="solution__details_left">
      <div class="solution__details_banner">
        <p>工程图册</p>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for = "item in imgList" :key="item.id">
                    <img :src = "item" style="width:100%;max-height:375px;">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <!-- <div class="swiper-pagination"></div> -->
        </div>
      </div>
      <div class="solution__details_bot">
        <p>设备数据</p>
        <div class="equipment" style="float:left">
            <p>设备总数 <span>{{projectAnalysi.deviceNum}}</span></p>
        </div>
        <div class="equipment" style="float:right">
            <p>项目总数 <span>{{projectAnalysi.projectGroupNum}}</span></p>
        </div>
      </div>
      <div class="">
        <div class="bdp__panel-body" style="float:left">
         <chart :options="deviceTypeChartOptions" class="bdp-chart"></chart>
        </div>
        <div class="bdp__panel-body" style="float:right">
          <chart :options="fixInfoChartOptions" class="bdp-chart"></chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import echarts from 'echarts'
import {createselect ,selectGroups ,devices ,historyData ,projectAnalysis} from '@/api/alarm'
import {queryModelPercent ,queryJobDash} from '@/api/big-picture-mode/bigPictureMode'
export default {
  name: 'carrousel',
  data() {
    return {  
      ids:{},
      userDataChartOptions: {
        color: ['#ff6600', '#2797fa'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          // show: false
          left: 0,
          top: '28px',
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              interval: 0
            },
            axisPointer: {
              label: {
                color: '#fff',
                backgroundColor: '#333',
                shadowColor: 'transparent'
              }
            }
          }
        ],
        yAxis: [
          {
            splitLine: { show: false },
            type: 'value',
            name: '工程数据1',
            // min: 0,
            // max: 10000000,
            // interval: 10,
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisPointer: {
              label: {
                color: '#fff',
                backgroundColor: '#333',
                shadowColor: 'transparent'
              }
            }
          },
          {
            splitLine: { show: false },
            type: 'value',
            name: '增长率',
            // min: 0,
            // max: 10000000,
            // interval: 50,
            axisLabel: {
              formatter: '{value}%'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisPointer: {
              label: {
                color: '#fff',
                backgroundColor: '#333',
                shadowColor: 'transparent'
              }
            }
          }
        ],
        series: [
          {
            name: '工程数据1',
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#69f0cd' },
                  // {offset: 0.5, color: '#188df0'},
                  { offset: 1, color: '#1ca3f9' }
                ])
              }
            },
            data: []
          },
          {
            name: '增长率1',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            showSymbol: false,
            data: [],
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#ff6600' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#f6e40c' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          }
        ]
      },
      deviceTypeChartOptions: {
        legend: {
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
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
            center: ['40%', '50%'],
            label: { formatter: '{d}%', color: '#fff' },
            data: [
              {
                value: 90,
                name: '设备类型1',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#1fa6f7' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5ee5d3' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              {
                value: 10,
                name: '设备类型2',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#ace296' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#23a400' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            ]
          }
        ]
      },
            fixInfoChartOptions: {
        legend: {
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          // show: false
          left: 0,
          top: '28px',
          right: 0,
          bottom: 0,
          containLabel: true
        },
        tooltip: {},
        dataset: {
          dimensions: ['月份', '任务数',"完成任务数"],
          source: [
            { 月份: '1月', 软件升级: 10, 滤芯维护: 45, 传感器校准: 93 },
            { 月份: '2月', 软件升级: 23, 滤芯维护: 53, 传感器校准: 80 },
            { 月份: '3月', 软件升级: 12, 滤芯维护: 60, 传感器校准: 82 },
            { 月份: '4月', 软件升级: 21, 滤芯维护: 33, 传感器校准: 70 },
            { 月份: '5月', 软件升级: 7, 滤芯维护: 12, 传感器校准: 50 },
            { 月份: '6月', 软件升级: 2, 滤芯维护: 98, 传感器校准: 31 }
          ]
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          type: 'value',
          name: '次数',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisPointer: {
            label: {
              color: '#fff',
              backgroundColor: '#333',
              shadowColor: 'transparent'
            }
          }
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#1ba1fa' },
                  { offset: 1, color: '#69f0cd' }
                ])
              }
            }
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#6f47d2' },
                  { offset: 1, color: '#2599fb' }
                ])
              }
            }
          },
          // {
          //   type: 'bar',
          //   itemStyle: {
          //     normal: {
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         { offset: 0, color: '#ff7200' },
          //         { offset: 1, color: '#ffe000' }
          //       ])
          //     }
          //   }
          // }
        ]
      },
      from:{},
      selectGroup:[],
      projects:false,
      project:"请选择",
      deviceList :[],
      device:"请选择",
      devices:false,
      featureList:[],
      features:false,
      featur:"请选择",
      list:[],
      imgList:[],
      projectAnalysi:{}
    }
  },
  methods: {
    createselect(){
      var routerParams = this.$route.query.ids
      createselect(routerParams).then(res=>{
        this.from = res.data
        this.from.buildAddress = (this.from.buildAddress.split(","))[3]
        console.log(res.data)
        this.queryModelPercent(this.from.id)
        this.projectAnalysis(this.from.id)
        this.imgList = res.data.imgs
        const groupIds = this.from.groupIds.split(",")
        this.selectGroups(groupIds)
         this.$nextTick(() => {  // 下一个UI帧再初始化swiper
            this.initSwiper();
          });
      })
    },
    initSwiper() {
        if (this.swiper != null) return;
        this.swiper = new Swiper('.swiper-container', {
          loop: true,
          speed: 900,
          autoplay: {
            delay: 3000, //3秒切换一次
            disableOnInteraction: false
          },
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper

          pagination: {
            el: '.swiper-pagination',
          }
        })
    },    
    selectGroups(val){
      selectGroups({valueList:val}).then(res=>{
          this.selectGroup = res.data
          this.project = this.selectGroup[0].name
          this.datas()
      })
    },
    projectAnalysis(id){
        projectAnalysis(id).then(res=>{
            this.projectAnalysi = res.data
            console.log(this.projectAnalysi)
        })
    },
    queryJobDash() {
      queryJobDash().then(res => {
        const list = res.data
        console.log(list)
        const lists = []
        for(var i = 0;i<list.length;i++){
          lists.push({"月份":list[i].time,"任务数":list[i].jobCount,"完成任务数":list[i].finishJobCount})
        }
        this.fixInfoChartOptions.dataset.source = lists
      })
    },
    queryModelPercent(val){
      queryModelPercent(val).then(res=>{
          console.log(res.data)
          const list = res.data
          for(var i = 0; i<list.length;i++){
            this.deviceTypeChartOptions.series[0].data[i].name = (list[i].modelName).substring(0,6)
            this.deviceTypeChartOptions.series[0].data[i].value = list[i].num
          }
          
      })
    },

    projectg(val){
      this.project = val.name
      this.projects = false
      devices(val.id).then(res=>{
        this.deviceList = res.data
        this.device = this.deviceList[0].name
      })
    },
    devicec(val){
      this.device = val.name
      this.devices = false
      historyData(val.id).then(res=>{
        console.log(res.data)
        this.list = res.data
        const lists = []
        for(var i = 0; i<this.list.length;i++){
          lists.push(this.list[i].name)
        }
        this.featureList = lists
      })
    },
    feature(val){
      this.features = false
      this.featur = val
      for(var i = 0; i<this.list.length;i++){
          if(this.list[i].name == val){
            const xdata = this.list[i].xdata
            const list = []
            for(var j = 0;j<xdata.length;j++){
              list.push(xdata[j].substring((xdata[j].length-8),(xdata[j].length-6)))
            }
            this.userDataChartOptions.xAxis[0].data =list
            this.userDataChartOptions.series[0].data = this.list[i].ydata
            this.userDataChartOptions.series[1].data = this.list[i].ydata
            this.$set(this.userDataChartOptions.series[0],"name",val)
            this.$set(this.userDataChartOptions.series[1],"name",val)
          }
      }
    },
    datas(){
      const val = this.selectGroup[0].id
      devices(val).then(res=>{
        this.device = (res.data[0].name)
        historyData(res.data[0].id).then(res=>{
          this.list = res.data
          const lists = []
          for(var i = 0; i<this.list.length;i++){
            lists.push(this.list[i].name)
          }
          this.featureList = lists
          this.featur = res.data[0].name
            this.feature(res.data[0].name)
          })
      })
    }
  },
  created () {
    this.createselect()
    this.queryJobDash()
  }
}    
</script>
<style lang="scss" scoped>
  .solution {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 1920px;
    height: 1080px;
    background: url("./assets/bg.png");
    background-size: 100% 100%;
    &__back {
      position: absolute;
      width: 105px;
      height: 33px;
      top: 12px;
      left: 30px;
      cursor: pointer;
    }
    .solution__details{
      // background:#ccc;
      position: absolute;
      color: #fff;
      font-size: 18px;
      font-weight: 800;
      top: 105px;
      left: 60px;
      width: 860px;
      height: auto;
      .img{
        position: absolute;
        right: 40px;
        top: 60px;
        width: 300px;
        height: 200px;
        background: url("./assets/logo.png") center center;
        background-size:100% 100%; 
      }
      .solution__details_top{
        margin-left: 20px;
      }
      .solution__details_content{
        margin: 30px 0px 10px 20px;
        font-weight: 500;
        span{
          font-weight: 400;
          display: inline-block;
          background-color:rgba($color: #002148, $alpha: 0.25);
          width: 300px;
          color: #fff;
          font-size: 14px;
          padding: 10px 0px 10px 10px;
        }
      }
      .ms{
        span{
          height: 100px;
          width: 700px;
        }
      }
      .solution__details_bottom{
        margin: 98px 0px 0px 20px;
      }
      .solution__details_qx{
        width: 700px;
        height: 300px;
        .bdp-chart{
          width: 800px;
          height: 300px;
        }
      }
      .solution__details_xz{
        text-align: right;
        .solution__details_xz_z{
          display: inline-block;
          position: relative;
          p{
            padding: 10px 50px 10px 20px;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 500;
            background:url(./assets/btn_bg.png) no-repeat center right;
            background-size:100% 100%; 
          }
          .project-dropdown{
            display: block;
            position: absolute;
            top: 50px;
            right: 0;
            background-color: rgba(0, 0, 0, 0.5);
            border: 1px solid #0a4e7f;
            font-weight: normal;
            text-align: center;
            // width: 150px;
            z-index: 111;
            span {
              width: 150px;
              line-height: 40px;
              // padding: 0px 30px;
              // margin: 20px 0px;
              font-size: 15px;
              float: none;
              border-bottom: 1px solid #0a4e7f;
              cursor: pointer;
              display: inline-block;
              &:hover {
                color: #008dff;
              }
            }
        }
        }
      }
    }
    .solution__details_left{
      position: absolute;
      top: 110px;
      left: 1030px;
      .solution__details_banner{
        width: 810px;
        height: 445px;
        overflow: hidden;
        p{
          font-size: 18px;
          color: #fff;
          font-weight: 700;
        }
        .swiper-container{
          border: 8px solid #3685d8;
          height: 385px;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
      .solution__details_bot{
        padding: 20px 0px;
        p{
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
        .equipment{
          width: 380px;
          height: 60px;
          background: url("./assets/sb_bg.png") no-repeat center center;
          background-size: 100% 100%;
          p{
            line-height: 25px;
            margin-left: 60px;
            span{
              margin-left: 120px;
            }
          }
        }

      }
      .bdp__panel-body{
          margin-top: 50px;
        .bdp-chart{
          width: 350px;
          height: 250px;
        }
      }
    } 
  }
</style>
