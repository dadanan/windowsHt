<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateClientDialogVisible = true">创建</el-button>
          <el-button type="primary" @click="suspendSelected">挂起</el-button>
          <el-button type="primary" @click="deleteSelected">删除</el-button>
          <el-button type="primary" @click="isClientColumnVisibleDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="clientList"
        style="width: 100%" class="mb20" border>
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="名称" show-overflow-tooltip v-if="clientColumnVisible.name" sortable>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别" show-overflow-tooltip v-if="clientColumnVisible.type" sortable>
        </el-table-column>
        <el-table-column
          prop="wx"
          label="公众号" show-overflow-tooltip v-if="clientColumnVisible.wx" sortable>
        </el-table-column>
        <el-table-column
          prop="deviceTypeList"
          label="产品类别" show-overflow-tooltip v-if="clientColumnVisible.deviceTypeList" sortable>
        </el-table-column>
        <el-table-column
          prop="groupList"
          label="组信息" show-overflow-tooltip v-if="clientColumnVisible.groupList" sortable>
        </el-table-column>
        <el-table-column
          prop="administrator"
          label="管理员" show-overflow-tooltip v-if="clientColumnVisible.administrator" sortable>
        </el-table-column>
        <el-table-column
          prop="intro"
          label="备注说明" show-overflow-tooltip v-if="clientColumnVisible.intro" sortable>
        </el-table-column>
        <el-table-column
          prop="deviceTotal"
          label="设备总数" v-if="clientColumnVisible.deviceTotal" sortable>
        </el-table-column>
        <el-table-column
          prop="orderTotal"
          label="订单总数" v-if="clientColumnVisible.orderTotal" sortable>
        </el-table-column>
        <el-table-column
          prop="isDashboardEnabled"
          label="是否开放后台" v-if="clientColumnVisible.isDashboardEnabled" sortable>
        </el-table-column>
        <el-table-column
          prop="isAndroidEnabled"
          label="是否开发安卓" v-if="clientColumnVisible.isAndroidEnabled" sortable>
        </el-table-column>
        <el-table-column
          prop="use"
          label="业务方向" show-overflow-tooltip v-if="clientColumnVisible.use" sortable>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-card>
    <el-dialog title="创建客户" :visible.sync="isCreateClientDialogVisible">
      <div>
        <el-steps :active="createStep" finish-status="success" class="mb20" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="设备信息"></el-step>
          <el-step title="H5 端 APP 设置"></el-step>
          <el-step title="安卓 APP 设置"></el-step>
          <el-step title="管理后台设置"></el-step>
        </el-steps>
        <div v-if="createStep == 0">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="客户名称">
              <el-input v-model="createClientForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公众号名称">
              <el-input v-model="createClientForm.wx"></el-input>
            </el-form-item>
            <el-form-item label="APP ID">
              <el-input v-model="createClientForm.appID"></el-input>
            </el-form-item>
            <el-form-item label="APP Secret">
              <el-input v-model="createClientForm.appSecret"></el-input>
            </el-form-item>
            <el-form-item label="客户类型">
              <el-select v-model="createClientForm.type">
                <el-option label="厂家" value="1"></el-option>
                <el-option label="品牌商" value="2"></el-option>
                <el-option label=" 工程商" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="createStep == 1">
          <div class="table-opts">
            <el-button-group>
              <el-button type="primary" @click="isCreateClientDeviceDialogVisible = true">创建</el-button>
            </el-button-group>
          </div>
          <el-table
            :data="deviceList"
            style="width: 100%" class="mb20" border>
            <el-table-column
              type="selection">
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="name"
              label="名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="type"
              label="型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="缩图">
              <template slot-scope="scope">
                <img :src="scope.row.pic" alt="产品略缩图" class="table-pic">
              </template>
            </el-table-column>
            <el-table-column
              prop="typeID"
              label="Type ID" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="func"
              label="功能项" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="intro"
              label="备注说明" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
        <div v-if="createStep == 2">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="默认组名">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="高级设置密码">
              <el-input type="password"></el-input>
            </el-form-item>
            <el-form-item label="背景图片">
              <el-button type="primary">上传文件</el-button>
            </el-form-item>
            <el-form-item label="页面版式">
              <el-select>
                <el-option label="模板 1" value="1"></el-option>
                <el-option label="模板 2" value="2"></el-option>
                <el-option label="模板 3" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="页面概览"><span>概览图</span></el-form-item>
            <el-form-item label="名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="Logo">
              <el-button type="primary">上传文件</el-button>
            </el-form-item>
            <el-form-item label="H5 版本">
              <el-select>
                <el-option label="版本 1" value="1"></el-option>
                <el-option label="版本 2" value="2"></el-option>
                <el-option label="版本 3" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="createStep == 3">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="APP 二维码">
              <el-button type="primary">上传文件</el-button>
            </el-form-item>
            <el-form-item label="APP 名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="APP Logo">
              <el-button type="primary">上传文件</el-button>
            </el-form-item>
            <el-form-item label="APP 软件版本">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="场景资料">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="视频链接">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="图册封面链接">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="图册链接">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="设备切换密码">
              <el-input type="password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="createStep == 4">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="开放">
              <el-switch></el-switch>
            </el-form-item>
            <d-title>管理后台属性设置</d-title>
            <el-form-item label="Logo">
              <el-button type="primary">上传文件</el-button>
            </el-form-item>
            <el-form-item label="名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="域名">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group>
                <el-radio label="独立"></el-radio>
                <el-radio label="挂靠"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="权限">
              <el-checkbox-group>
                <el-checkbox label="添加设备" name="type"></el-checkbox>
                <el-checkbox label="添加订单" name="type"></el-checkbox>
                <el-checkbox label="主题设置" name="type"></el-checkbox>
                <el-checkbox label="删除设备" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <d-title>管理员</d-title>
            <el-form-item label="账户">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="邮件">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="isCreateClientDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="nextStep" v-if="createStep < 4">下一步</el-button>
        <el-button type="primary" @click="nextStep" v-else>确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="创建设备" :visible.sync="isCreateClientDeviceDialogVisible">
      <el-form label-position="left" label-width="150px">
        <el-form-item label="设备名称">
          <el-input v-model="createClientDeviceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备型号">
          <el-input v-model="createClientDeviceForm.type"></el-input>
        </el-form-item>
        <el-form-item label="Type ID">
          <el-select v-model="createClientDeviceForm.typeID">
            <el-option label="TY1" value="1"></el-option>
            <el-option label="TY2" value="2"></el-option>
            <el-option label="TY3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加功能</el-button>
        </el-form-item>
        <el-form-item label="设备缩图">
          <el-button type="primary">上传文件</el-button>
        </el-form-item>
        <el-form-item label="Product ID">
          <el-input v-model="createClientDeviceForm.productID"></el-input>
        </el-form-item>
        <el-form-item label="Product 二维码">
          <el-button type="primary">上传文件</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isCreateClientDeviceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isCreateClientDeviceDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="自定义显示列" :visible.sync="isClientColumnVisibleDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.name">名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.type">类别</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.wx">公众号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.deviceTypeList">产品类型</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.groupList">组信息</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.administrator">管理员</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.intro">备注说明</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.deviceTotal">客户设备数</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.orderTotal">客户订单数</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.isDashboardEnabled">后台开放与否</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.isAndroidEnabled">安卓开放与否</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.use">业务方向</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isClientColumnVisibleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isClientColumnVisibleDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DTitle from '@/components/Title'

  export default {
    components: {
      DTitle
    },
    data() {
      const clientList = []
      for (let i = 0; i < 15; i++) {
        clientList.push({
          name: '测试客户',
          type: '厂家',
          wx: '上海市普陀区金沙江路 1518 弄',
          deviceTypeList: '测试类型 1, 测试类型 2, 测试类型 3',
          groupList: '测试组 1, 测试组 2',
          administrator: 'admin',
          intro: '这是一个测试客户, 毫无用途',
          deviceTotal: 0,
          orderTotal: 0,
          isDashboardEnabled: '否',
          isAndroidEnabled: '否',
          use: '未知'
        })
      }

      const deviceList = []
      for (let i = 0; i < 1; i++) {
        deviceList.push({
          name: '测试设备',
          type: '测试型号',
          pic: '/static/images/device1.png',
          typeID: '787842WCSS',
          func: '功能 1, 功能 2, 功能 3',
          intro: '这个是个不存在的测试型号'
        })
      }
      return {
        clientList,
        clientColumnVisible: {
          name: true,
          type: true,
          wx: true,
          deviceTypeList: true,
          groupList: true,
          administrator: true,
          intro: true,
          deviceTotal: false,
          orderTotal: false,
          isDashboardEnabled: false,
          isAndroidEnabled: false,
          use: false
        },
        deviceList,
        isCreateClientDialogVisible: false,
        createClientTab: 'basic',
        isCreateClientDeviceDialogVisible: false,
        createClientForm: {
          name: '',
          wx: '',
          appID: '',
          appSecret: '',
          type: ''
        },
        createClientDeviceForm: {
          name: '',
          type: '',
          typeID: '',
          productID: ''
        },
        isClientColumnVisibleDialogVisible: false,
        createStep: 0,
        // 动态功能
        dynamicTags: ['功能1', '功能2', '功能3'],
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },

      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        const inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      nextStep() {
        this.createStep++

        if (this.createStep === 5) {
          this.isCreateClientDialogVisible = false
          this.createStep = 0
        }
      },
      deleteSelected() {
        this.$confirm('此操作将永久解除客户管理权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$confirm('此操作将永久解除客户使用权限, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$confirm('此操作将永久解除客户相关联设备, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      suspendSelected() {
        this.$confirm('此操作将挂起选中设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '挂起成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消挂起'
          })
        })
      }
    }
  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
