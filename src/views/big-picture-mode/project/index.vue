<template>
  <div class="solution">
    <div class="solution__back" @click="$router.back()"></div>
    <div class="solution__details">
      <div class="solution__details_top">
        <p>工程概况</p>
      </div>
      <div class="solution__details_content">
        <div class="">工程编号 : <span>{{from.projectNo}}</span></div>
      </div>  
      <div class="solution__details_content">
        <div class="">工程名称 : <span>{{from.name}}</span></div>
      </div>  
      <div class="solution__details_content ms">
        <div class="ds">工程描述 : <span>{{from.description}}</span></div>
      </div>  
      <div class="solution__details_content">
        <div class="">工程建设时间 : <span>{{new Date(from.buildTime).toLocaleString()}}</span></div>
      </div>  
      <div class="solution__details_content">
        <div class="">工程建设地址 : <span>{{from.buildAddress}}</span></div>
      </div>
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
                    <img :src = "item" style="width:100%">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <!-- <div class="swiper-pagination"></div> -->
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
import echarts from 'echarts'
import {createselect ,selectGroups ,devices ,historyData} from '@/api/alarm'
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
      imgList:[]
    }
  },
  methods: {
    createselect(){
      var routerParams = this.$route.query.ids
      createselect(routerParams).then(res=>{
        this.from = res.data
        console.log(res.data)
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
      .solution__details_top{
        margin-left: 20px;
      }
      .solution__details_content{
        margin: 40px 0px 10px 30px;
        font-weight: 500;
        span{
          font-weight: 400;
        }
      }
      .ms{
        line-height: 32px;
        .ds{
          display: inline-flex
        }
        span{
          width: 700px;
          height: 100px;
        }
      }
      .solution__details_bottom{
        margin: 108px 0px 0px 20px;
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
            padding: 10px 68px 10px 20px;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 500;
            background:url(./assets/btn_bg.png) no-repeat center center;
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
        // height: 440px;
        overflow: hidden;
        p{
          font-size: 18px;
          color: #fff;
          font-weight: 700;
        }
        .swiper-container{
          border: 8px solid #3685d8;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
    } 
  }
</style>
