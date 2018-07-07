<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"   placeholder="请输入组名" style="width: 200px;" class="filter-item"
                v-model="listQuery.groupName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>

    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
              style="width: 100%">

      <el-table-column min-width="50px" label="Id">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="设备组">
        <template scope="scope">
          <span>{{scope.row.groupName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="设备组管理昵称">
        <template scope="scope">
          <span>{{scope.row.maskNickname}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="logo图片">
        <template scope="scope">
          <img :src="scope.row.icon" height="80" width="80"></img>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="封面图片">
        <template scope="scope">
          <img :src="scope.row.videoCover" height="80" width="80"></img>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作"  width="250">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" close = "onClose">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="组名称">
          <el-input v-model="temp.groupName"></el-input>
        </el-form-item>
        <el-form-item label="logo地址">
          <el-input v-model="temp.icon"></el-input>
        </el-form-item>
        <el-form-item label="视频链接(必须带http:)">
          <el-input v-model="temp.videoUrl"></el-input>
        </el-form-item>
        <el-form-item label="封面地址">
          <el-input v-model="temp.coverUrl"></el-input>
        </el-form-item>
        <el-input
          label="文字描述"
          v-model="temp.memo"
          type="textarea"
          :rows="6"
          placeholder="">
        </el-input>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { queryDeviceGroupList, queryDeviceGroupCount, updateDeviceGroup } from '@/api/device'

  import waves from '@/directive/waves'

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          groupName: ''
        },
        temp: {
          id: undefined,
          groupName: '',
          videoUrl: '',
          videoCover: '',
          icon: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        downloadLoading: false
      }
    },
    filters: {},
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryDeviceGroupCount(this.listQuery).then(response => {
          this.total = response.data.data
        })
        queryDeviceGroupList(this.listQuery).then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined
        }
      },

      handleUpdate(row) {
        this.temp = {
          id: row.id,
          groupName: row.groupName,
          videoUrl: row.videoUrl,
          memo: row.memo,
          coverUrl: row.videoCover,
          icon: row.icon

        }
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      onClose() {
        console.log('关闭对话框')
      },
      updateData() {
        debugger
        const tempData = Object.assign({}, this.temp)
        updateDeviceGroup(tempData).then(() => {
          this.dialogFormVisible = false
          this.handleFilter()
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  }
</script>
