<template>
  <div>
    <el-dialog
        title="设备信息"
        :visible="true"
        size="large"
        :before-close="close"
        :modal="false">
        <el-row>
            <el-col :span="16">
                <e-chart></e-chart>
            </el-col>
            <el-col :span="8">
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">

            <el-button type="primary" @click="close">关闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
    import EChart from 'vue-echarts/components/ECharts'
    import 'echarts'
    export default {
        props:['visible','id'], 

        components: {
            EChart
        },
        /////////////////////////
        data: function () {
            let data = []

            for (let i = 0; i <= 360; i++) {
                let t = i / 180 * Math.PI
                let r = Math.sin(2 * t) * Math.cos(2 * t)
                data.push([r, i])
            }
            
            return {
                polar: {
                    title: {
                        text: '极坐标双数值轴'
                    },
                    legend: {
                        data: ['line']
                    },
                    polar: {
                        center: ['50%', '54%']
                    },
                    tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                    },
                    angleAxis: {
                    type: 'value',
                    startAngle: 0
                    },
                    radiusAxis: {
                    min: 0
                    },
                    series: [
                    {
                        coordinateSystem: 'polar',
                        name: 'line',
                        type: 'line',
                        showSymbol: false,
                        data: data
                    }
                    ],
                    animationDuration: 2000
                },
                ////////////////////
                dialogVisible: false,

            }

        },
        methods:{
            //生成数据
            populateData(){
                this.integrals = this.options.integrals
                this.data = this.options.alldata
                this.active = this.options.active
                this.increase = this.options.increaseRate
            
            },
            findMaxVal(numberData) {
                return Math.max.apply(Math,numberData)
            },
            /////////////////////////
            updateOption(p,c,s) {
                let WeatherOptionData = {
                    province : p,
                    city : c,
                    suburb : s,
                };
                this.$emit('updateOption',WeatherOptionData);
            },
            
            close() {
                
                this.dialogVisible = false;
                this.$emit('toggleDialog',this.id);
            }
        },
    }
    

</script>
<style lang="scss" scoped>
    #main-chart {
        height: 300px;
    }
</style>
