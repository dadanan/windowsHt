<template>
    <div>
        <el-dialog top='4vh' class='device-detail-container' title="任务详情" :close-on-click-modal=false :visible="visible" width='95%' @update:visible="$emit('update:visible', $event)">
            <div class="flex mb20">
                <div class="flex-item flex-item--full">
                    <el-card class="el-card--solid">
                        <el-form label-width="130px" class="mb-22" :model="form">
                            <el-form-item label="任务名称">
                                <el-input v-model='form.massage'></el-input>
                            </el-form-item>
                            <el-form-item label="任务描述">
                                <el-input type="textarea" :rows='3' v-model='form.massage'></el-input>
                            </el-form-item>
                            <el-form-item label="任务状态">
                                <el-input v-model='form.massage'></el-input>
                            </el-form-item>
                            <el-form-item label="告警级别">
                                <el-input v-model='form.massage'></el-input>
                            </el-form-item>
                            <el-form-item label="告警来源">
                                <el-input v-model='form.massage'></el-input>
                            </el-form-item>
                            <el-form-item label="到期日期">
                                <el-input v-model='form.massage'></el-input>
                            </el-form-item>
                            <el-form-item label="是否关联设备">
                                <el-input v-model='form.massage'></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                                    <el-table-column prop="name" label="MAC地址" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="typeId" label="设备名称" show-overflow-tooltip>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item label="是否规则内">
                                <el-input v-model='form.massage'></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                                    <el-table-column prop="name" label="规则名称" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="typeId" label="规则描述" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="typeId" label="规则级别" show-overflow-tooltip>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
                <div class="flex-item">
                    <el-card class="el-card--solid map-container">
                        <div>
                            <h3>历史数据</h3>
                        <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                            <el-table-column prop="name" label="操作时间" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="typeId" label="操作者" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="typeId" label="操作环节" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="typeId" label="操作说明" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="typeId" label="其他" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import ImageUploader from '@/components/Upload/image'
// import FileUploader from '@/components/Upload/file'
// import UploadExcel from '@/components/Upload/excel'
// import { createNewTeam, queryDeviceInfo } from '@/api/device/team'
import { subselect } from '@/api/alarm'
// import AMap from './components/AMap'

export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      consumablesList1: []
    }
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.device-detail-container {
  margin-bottom: 2rem;
}
.flex {
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
}

.map-container {
  width: 860px;
  min-height: 844px;
}
.map-container1 {
  width: 760px;
  min-height: 414px;
}
.map-container2 {
  width: 760px;
  height: 290px;
  overflow: auto;
}
.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
.btn {
  text-align: center;
  color: #646464;
  h2 {
    font-size: 36px;
    margin: 0px;
    margin: 10px 0px;
  }
}
.table-img {
  width: 100%;
}
</style>

