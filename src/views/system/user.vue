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
        <el-table-column prop="telephone" label="手机号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="所属角色" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getRoleName(scope.row.roleId) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getStatusName(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="修改时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="1" :page-sizes="[50]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="userList.length">
      </el-pagination>
    </el-card>
    <el-dialog :top='"2vh"' title="添加系统用户" :visible.sync="isCreateUserDialogVisible">
      <el-form label-position="left" label-width="150px">
        <el-form-item label="账号">
          <el-input v-model='creatingData.userName'></el-input>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="creatingData.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="creatingData.telephone"></el-input>
        </el-form-item>
        <el-form-item label="绑定微信 Open ID">
          <el-input v-model="creatingData.openID"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="creatingData.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="creatingData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="creatingData.status" placeholder="请选择">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定模板 ID">
          <el-input v-model="creatingData.templateId"></el-input>
        </el-form-item>
        <el-form-item label="AppID">
          <el-input v-model="creatingData.appId"></el-input>
        </el-form-item>
        <el-form-item label="AppSecret">
          <el-input v-model="creatingData.appSecret"></el-input>
        </el-form-item>
        <el-form-item label="SecondDomain">
          <el-input v-model="creatingData.secondDomain"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createUser">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :top='"2vh"' title="编辑系统用户" :visible.sync="isEditUserDialogVisible">
      <el-form label-position="left" label-width="150px">
        <el-form-item label="账号">
          <el-input v-model='editingData.userName'></el-input>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="editingData.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="editingData.telephone"></el-input>
        </el-form-item>
        <el-form-item label="绑定微信 Open ID">
          <el-input v-model="editingData.openID"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editingData.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editingData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editingData.status" placeholder="请选择">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定模板 ID">
          <el-input v-model="editingData.templateId"></el-input>
        </el-form-item>
        <el-form-item label="AppID">
          <el-input v-model="editingData.appId"></el-input>
        </el-form-item>
        <el-form-item label="AppSecret">
          <el-input v-model="editingData.appSecret"></el-input>
        </el-form-item>
        <el-form-item label="SecondDomain">
          <el-input v-model="editingData.secondDomain"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login, createUser, getUserList, updateUser, delUser } from '@/api/user'
import { getRoleList } from '@/api/role'

export default {
  data() {
    return {
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
      ]
    }
  },
  methods: {
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
      this.editingData = data
    },
    editUser() {
      updateUser(this.editingData)
        .then(res => {
          res = res.data
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
        .catch(err => {
          console.log(err)
        })
    },
    login() {
      login('wkk', '123456')
        .then(() => {})
        .catch(err => {
          console.log('err', err)
        })
    },
    createUser() {
      const time = new Date().toISOString()
      const user = {
        ...this.creatingData,
        createTime: time,
        lastUpdateTime: time
      }
      createUser(user)
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.isCreateUserDialogVisible = false
            this.userList.unshift({
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
        .catch(err => {
          console.log('err', err)
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
              res = res.data
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
              console.log(err)
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
      getUserList()
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.userList = res.data
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    getRoleList() {
      getRoleList()
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.roleList = res.data
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  },
  created() {
    this.login()
    this.getUserList()
    this.getRoleList()
  }
}
</script>
