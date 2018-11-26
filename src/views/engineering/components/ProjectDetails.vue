<template>
    <div>
        <el-dialog top='4vh' class='device-detail-container' :close-on-click-modal=false :visible="visible" width='95%' @update:visible="$emit('update:visible', $event)">
            <el-tabs v-model="activeTab" type="card">
                <el-tab-pane label="工程基本信息" name="1">
                    <div class="flex mb20">
                        <div class="flex-item flex-item--full">
                            <el-card class="el-card--solid">
                                <h3 style="margin-bottom:30px">基本信息</h3>
                                <el-form label-width="130px" class="mb-22" :model="form">
                                    <el-form-item label="工程编号">
                                        <el-input v-model='form.massage'></el-input>
                                    </el-form-item>
                                    <el-form-item label="工程名称">
                                        <el-input v-model='form.massage'></el-input>
                                    </el-form-item>
                                    <el-form-item label="工程描述">
                                        <el-input type="textarea" :rows='3' v-model='form.massage'></el-input>
                                    </el-form-item>
                                    <el-form-item label="工程建设时间">
                                        <el-input v-model='form.massage'></el-input>
                                    </el-form-item>
                                    <el-form-item label="工程建设地址">
                                        <el-input v-model='form.massage'></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-card>
                        </div>
                        <div class="flex-item">
                            <el-card class="el-card--solid map-container">
                                <el-tabs v-model="activeTabT" type="card">
                                    <el-tab-pane label="工程分析" name="5">
                                        <el-row :gutter="20">
                                            <el-col :xs="24" class="btn" :sm="6" :lg="10">
                                                <el-row :gutter="20">
                                                    <h3>工程建设日期 : <span style="font-size:20px">2018年12月12日</span></h3>
                                                    <div style="padding-top:20px">
                                                        <el-col :xs="24" :sm="12" :lg="12" style="border-right:2px solid #66c8d9">
                                                            <h2>11</h2>
                                                            <p>工程总数</p>
                                                        </el-col>
                                                        <el-col :xs="24" :sm="12" :lg="12">
                                                            <h2>290</h2>
                                                            <p>设备总数</p>
                                                        </el-col>
                                                    </div>
                                                    <div style="padding-top:140px">
                                                        <el-col :xs="24" :sm="12" :lg="12" style="border-right:2px solid #66c8d9">
                                                            <h2>11</h2>
                                                            <p>工程总数</p>
                                                        </el-col>
                                                        <el-col :xs="24" :sm="12" :lg="12">
                                                            <h2>290</h2>
                                                            <p>设备总数</p>
                                                        </el-col>
                                                    </div>
                                                </el-row>
                                            </el-col>
                                            <el-col :xs="24" :sm="6" :lg="14">
                                                <div class="progress">
                                                    <h2>在线设备占比图</h2>
                                                    <el-progress :text-inside="true" :stroke-width="30" :percentage="name"></el-progress>
                                                </div>
                                                <div class="progress1">
                                                    <h2>开机设备占比图</h2>
                                                    <el-progress :text-inside="true" :stroke-width="30" :percentage="70"></el-progress>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="工程地点" name="6">
                                        <!-- <p>地图</p> -->
                                    </el-tab-pane>
                                    <el-tab-pane label="概况预览" name="7">
                                        <p>111</p>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-card>
                        </div>
                    </div>
                    <div class="flex-item">
                        <el-card class="el-card--solid ">
                            <el-tabs v-model="activeTabS" type="card">
                                <el-tab-pane label="设备项目信息" name="8">
                                    <el-table :data="computeDeviceList" style="width: 100%" class="mb20" border>
                                        <el-table-column type="expand">
                                            <template slot-scope="scope">
                                                <el-table :data="scope.row.childDeviceList" style="width: 100%" class="mb20" border>
                                                    <el-table-column type="index"></el-table-column>
                                                    <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="mac" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="归属" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="工作状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="在线状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="告警状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="最后上线时间" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                </el-table>
                                            </template>
                                        </el-table-column>
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="id" label="项目名称" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="项目介绍" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="地点" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="归属" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="创建时间" show-overflow-tooltip sortable>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="其他设备" name="9">
                                    <el-table :data="computeDeviceList" style="width: 100%" class="mb20" border>
                                        <el-table-column type="expand">
                                            <template slot-scope="scope">
                                                <el-table :data="scope.row.childDeviceList" style="width: 100%" class="mb20" border>
                                                    <el-table-column type="index"></el-table-column>
                                                    <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="mac" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="归属" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="工作状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="在线状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="告警状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="最后上线时间" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                </el-table>
                                            </template>
                                        </el-table-column>
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="id" label="设备名称" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="设备型号" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="厂家" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="说明书" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="创建时间" show-overflow-tooltip sortable>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="材料类" name="10">
                                    <el-table :data="computeDeviceList" style="width: 100%" class="mb20" border>
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="id" label="品名规格" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="库存数量" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column label="库存变更详情" show-overflow-tooltip sortable>
                                            <template slot-scope="scope">
                                                <el-button type="text" @click="ChangeDetails = true">详情</el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="id" label="创建时间" show-overflow-tooltip sortable>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="耗材类" name="11">
                                    <el-table :data="computeDeviceList" style="width: 100%" class="mb20" border>
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="id" label="品名规格" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column prop="id" label="库存数量" show-overflow-tooltip sortable>
                                        </el-table-column>
                                        <el-table-column label="库存变更详情" show-overflow-tooltip sortable>
                                            <template slot-scope="scope">
                                                <el-button type="text" @click="ChangeDetailsT = true">详情</el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="id" label="创建时间" show-overflow-tooltip sortable>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                            </el-tabs>
                        </el-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="工程资料" name="2">
                    <div class="flex mb20">
                        <div class="flex-item flex-item--full">
                            <el-card class="el-card--solid">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">
                                            <img :src="dialogImageUrl" alt="" style="width:100%;min-height:244px">
                                        </div>
                                    </el-col>
                                    <el-col :span="16">
                                        <div class="grid-content bg-purple-light">
                                            <el-form label-width="130px" class="mb-22" :model="form">
                                                <el-form-item label="实施阶段">
                                                    <el-input v-model='form.massage'></el-input>
                                                </el-form-item>
                                                <el-form-item label="实施时间">
                                                    <el-input v-model='form.massage'></el-input>
                                                </el-form-item>
                                                <el-form-item label="实施描述">
                                                    <el-input type="textarea" :rows='3' v-model='form.massage'></el-input>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </div>
                        <div class="flex-item">
                            <el-card class="el-card--solid map-container2">
                                <el-table :data="consumablesList2" style="width: 100%" class="mb20">
                                    <el-table-column prop="name" label="文件类型">
                                        <template slot-scope="scope">
                                            {{scope.row.name}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="文件名称">
                                        <template slot-scope="scope">
                                            <template v-if='scope.row.sd'>
                                                <div class="" v-for="(item,index) in scope.row.typeId">
                                                    <p>{{item.id}} <span>{{index}}</span></p>
                                                </div>
                                            </template>
                                            <template v-else>
                                                {{scope.row.typeId}}
                                            </template>
                                        </template>

                                    </el-table-column>
                                </el-table>
                            </el-card>

                        </div>
                    </div>
                    <div class="flex mb20">
                        <div class="flex-item flex-item--full">
                            <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                                <el-table-column type="index"></el-table-column>
                                <el-table-column prop="typeId" label="实施阶段" show-overflow-tooltip sortable>
                                </el-table-column>
                                <el-table-column prop="typeId" label="工程实施描述" show-overflow-tooltip sortable>
                                </el-table-column>
                                <el-table-column prop="typeId" label="实施时间" show-overflow-tooltip sortable>
                                </el-table-column>
                                <el-table-column prop="imgUrl" label="图册" show-overflow-tooltip sortable>
                                    <template slot-scope="scope">
                                        <img class='table-img' :src='scope.row.imgUrl'>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="typeId" label="工程资料分类" show-overflow-tooltip sortable>
                                </el-table-column>
                                <el-table-column prop="typeId" label="文件列表" show-overflow-tooltip sortable>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="工程维保" name="3">
                    <el-table :data="consumablesList3" style="width: 100%" class="mb20" border>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column prop="typeId" label="规则分类" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="typeId" label="维保项" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="typeId" label="维保内容" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="imgUrl" label="告警级别" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="typeId" label="状态" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="typeId" label="创建时间" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="typeId" label="创建者" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="typeId" label="操作" show-overflow-tooltip sortable>
                            <template slot-scope="scope">
                                <el-button type="text">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <el-dialog top='4vh' :close-on-click-modal=false title="材料类库存变更详情" :visible.sync="ChangeDetails">
            <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                <el-table-column prop="name" label="操作时间" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="操作者" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="操作环节" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="数量变化情况" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="库存数量" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog top='4vh' :close-on-click-modal=false title="耗材类库存变更详情" :visible.sync="ChangeDetailsT">
            <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                <el-table-column prop="name" label="操作时间" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="操作者" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="操作环节" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="数量变化情况" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="库存数量" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
// import ImageUploader from '@/components/Upload/image'
// import FileUploader from '@/components/Upload/file'
// import UploadExcel from '@/components/Upload/excel'
// import { createNewTeam, queryDeviceInfo } from '@/api/device/team'
// import { selectAllCustomers as select } from '@/api/customer'
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
      dialogImageUrl:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542708081740&di=adbb9bd5f092167dfb49f9662c372387&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Df78d82d0ad86c9171c0e5a7aa1541aba%2F7e3e6709c93d70cf5980cc25f2dcd100baa12b9b.jpg',
      consumablesList1: [
        {
          name: '耗材1',
          typeId: 11,
          imgUrl:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542708081740&di=adbb9bd5f092167dfb49f9662c372387&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Df78d82d0ad86c9171c0e5a7aa1541aba%2F7e3e6709c93d70cf5980cc25f2dcd100baa12b9b.jpg'
        },
        {
          name: '耗材1',
          typeId: 11,
          imgUrl:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542708081740&di=adbb9bd5f092167dfb49f9662c372387&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Df78d82d0ad86c9171c0e5a7aa1541aba%2F7e3e6709c93d70cf5980cc25f2dcd100baa12b9b.jpg'
        },
        {
          name: '耗材1',
          typeId: 11,
          imgUrl: ''
        }
      ],
      consumablesList2: [
        {
          name: '耗材1',
          typeId: [
            {
              id: 11
            },
            {
              id: 22
            },
            {
              id: 33
            }
          ],
          sd: 1
        },
        {
          name: '耗材2',
          typeId: '耗材2',
          sd: 0
        },
        {
          name: '耗材3',
          typeId: '耗材3',
          sd: 0
        }
      ],
      activeTab: '1',
      activeTabT: '5',
      activeTabS: '8',
      ChangeDetails: false,
      ChangeDetailsT: false,
      consumablesList3:[],
      computeDeviceList: [
        {
          childDeviceList: [
            {
              name: '我是谁',
              childId: '我在干什么'
            }
          ],
          id: 123
        },
        {
          id: 123
        }
      ],
      form: {
        name: '',
        value: '',
        massage: '',
        createUserOpenId: '',
        h5BgImgList: []
      },
      name: 90
    }
  },
  methods: {
    getLocation({ gps, location }) {
      updateDevice({
        id: this.form.id,
        location,
        mapGps: gps.toString()
      }).then(() => {
        this.$message({
          message: '设备位置信息更新成功！',
          type: 'success'
        })
        this.form.location = location
      })
    }
  }
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
  min-height: 414px;
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
.progress {
  padding: 60px 0px 40px 0px;
  h2 {
    margin-bottom: 30px;
    padding-left: 20px;
    border-left: 10px solid #969696;
  }
}
.progress1 {
  h2 {
    margin-bottom: 30px;
    padding-left: 20px;
    border-left: 10px solid #969696;
  }
}
.table-img {
  width: 100%;
}
</style>

