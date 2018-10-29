<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateUserDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="userList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="userName" label="账号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="telephone" label="手机号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="所属角色" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <span>{{ getRoleName(scope.row.roleId) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="所属客户" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <span>{{ getStatusName(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="上次修改时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.lastUpdateTime).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="listQuery.pageSizes" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.limit">
      </el-pagination>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false title="添加系统用户" :visible.sync="isCreateUserDialogVisible">
      <el-form :model='creatingData' :rules='rules' ref='creatingData' label-position="left" label-width="150px">
        <el-form-item label="账号" prop='userName'>
          <el-input v-model='creatingData.userName'></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop='roleId'>
          <el-select v-model="creatingData.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop='telephone'>
          <el-input type='number' v-model="creatingData.telephone"></el-input>
        </el-form-item>
        <el-form-item label="绑定微信 Open ID" prop='openID'>
          <el-input v-model="creatingData.openID"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="creatingData.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop='nickName'>
          <el-input v-model="creatingData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop='status'>
          <el-select v-model="creatingData.status" placeholder="请选择">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate('creatingData','createUser')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="编辑系统用户" :visible.sync="isEditUserDialogVisible">
      <el-form label-position="left" label-width="150px" :model='editingData' :rules='rules' ref='editingData'>
        <el-form-item label="账号" prop="userName">
          <el-input v-model='editingData.userName'></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop='roleId'>
          <el-select v-model="editingData.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop='telephone'>
          <el-input type='number' v-model="editingData.telephone"></el-input>
        </el-form-item>
        <el-form-item prop='openID' label="绑定微信 Open ID">
          <el-input v-model="editingData.openID"></el-input>
        </el-form-item>
        <el-form-item prop='password' label="密码">
          <el-input v-model="editingData.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop='nickName' label="昵称">
          <el-input v-model="editingData.nickName"></el-input>
        </el-form-item>
        <el-form-item prop='status' label="状态">
          <el-select v-model="editingData.status" placeholder="请选择">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate('editingData','editUser')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createUser, getUserList, updateUser, delUser } from '@/api/user'
import { getRoleList } from '@/api/role'

export default {
  data() {
    return {
      listQuery: {
        limit: 20,
        page: 1,
        pageSizes: []
      },
      userList: [],
      isCreateUserDialogVisible: false,
      isEditUserDialogVisible: false,
      creatingData: {},
      editingData: {},
      roleList: [
        {
          id: '1',
          roleName: '管理员'
        }
      ],
      status: [
        {
          value: 'enable',
          label: '启用'
        },
        {
          value: 'disable',
          label: '禁用'
        },
        {
          value: 'limited',
          label: '限制'
        }
      ],
      rules: {
        userName: [
          { max: 15, message: '最大长度为15个字符', trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
        telephone: [
          { min: 11, max: 11, message: '长度为11个数字', trigger: 'blur' },
          {
            required: true,
            message: '请输入合法手机号',
            trigger: 'blur'
          }
        ],
        openID: [
          { min: 1, max: 50, message: '最长为50个字符', trigger: 'blur' }
        ],
        password: [
          { max: 40, message: '最长为40个字符', trigger: 'blur' },
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        nickName: [
          { max: 20, message: '最长为20个字符', trigger: 'blur' },
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    validate(form, cb) {
      /**
       * 函数式表单验证
       * @param form 表单ref引用名
       * @param cb 验证成功需要调用的函数名
       */
      this.$refs[form].validate(valid => {
        if (valid) {
          this[cb]()
        } else {
          this.$message({
            type: 'error',
            message: '表单验证失败！'
          })
          return false
        }
      })
    },
    getRoleName(id) {
      const role = this.roleList.filter(item => item.id === id)[0]
      if (role && role.roleName) {
        return role.roleName
      }
    },
    getStatusName(value) {
      const status = this.status.filter(item => item.value === value)[0]
      if (status && status.label) {
        return status.label
      }
    },
    showEditRoleDialog(data) {
      this.isEditUserDialogVisible = true
      console.log(data)
      this.editingData = data
    },
    editUser() {
      updateUser(this.editingData).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.isEditUserDialogVisible = false
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    createUser() {
      const time = new Date().toISOString()
      const user = {
        ...this.creatingData,
        createTime: time,
        lastUpdateTime: time
      }
      createUser(user).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.isCreateUserDialogVisible = false
          this.userList.push({
            ...user,
            id: res.data
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    deleteUser(id) {
      this.$confirm('此操作将永久删除该系统用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser(id)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // 从表格中移除此条数据
                this.userList = this.userList.filter(item => item.id !== id)
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败！'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getUserList() {
      getUserList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.userList = res.data
          const length = res.data.length
          this.listQuery.limit = length
          this.listQuery.pageSizes = [length, length * 2, length * 3]
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getUserList()
    },
    getRoleList() {
      getRoleList().then(res => {
        if (res.code === 200) {
          this.roleList = res.data
        }
      })
    }
  },
  created() {
    this.getUserList()
    this.getRoleList()
  }
}
</script>
