<template>
  <div>
    <el-dialog
        title="设备信息"
        :visible.sync="dialogVisible"
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
    import ECharts from 'vue-echarts/components/ECharts'
    import 'echarts'
    export default {
        components: {
            EChart
        },
    }
</script>
<style lang="scss" scoped>
    #main-chart {
        height: 300px;
    }
</style>