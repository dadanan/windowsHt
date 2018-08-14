<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateRoleDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="roleList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="roleDesc" label="简介" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="userTotal" label="系统用户数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="1" :page-sizes="[50]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="roleList.length">
      </el-pagination>
    </el-card>
    <el-dialog title="添加角色" :visible.sync="isCreateRoleDialogVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-tree ref="tree" :data="permissionList" show-checkbox node-key="id" :default-expand-all='true' :props="defaultProps" class="permission-list">
          </el-tree>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="角色名">
              <el-input v-model='roleName'></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model='roleDesc'></el-input>
            </el-form-item>
            <el-form-item label="共享数据">
              <el-switch></el-switch>
            </el-form-item>
            <el-form-item label="设置分润权限">
              <el-radio-group>
                <el-radio label="无"></el-radio>
                <el-radio label="入账权限"></el-radio>
                <el-radio label="收款权限"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createRole">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色" :visible.sync="isEditRoleDialogVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-tree :data="permissionList" ref='editTree' show-checkbox node-key="id" :default-expand-all='true' :default-checked-keys="[]" :props="defaultProps" class="permission-list">
          </el-tree>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="角色名">
              <el-input v-model="editingData.roleName"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model='editingData.roleDesc'></el-input>
            </el-form-item>
            <el-form-item label="共享数据">
              <el-switch></el-switch>
            </el-form-item>
            <el-form-item label="设置分润权限">
              <el-radio-group>
                <el-radio label="无"></el-radio>
                <el-radio label="入账权限"></el-radio>
                <el-radio label="收款权限"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="修改时间">
              <div>{{new Date(editingData.lastUpdateTime).toLocaleString()}}</div>
            </el-form-item>
            <el-form-item label="创建时间">
              <div>{{new Date(editingData.createTime).toLocaleString()}}</div>
            </el-form-item>
            <el-form-item label="系统用户数量">
              <div>0</div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login } from '@/api/user'
import {
  getPermissions,
  createRole,
  getRoleList,
  deleteRole,
  updateRole
} from '@/api/role'
export default {
  data() {
    return {
      roleList: [],
      isCreateRoleDialogVisible: false,
      isEditRoleDialogVisible: false,
      permissionList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      demoForm: {
        name: '管理员'
      },
      userID: undefined,
      roleDesc: '',
      roleName: '',
      editingData: {} // 当前正在编辑的角色数据
    }
  },
  methods: {
    showEditRoleDialog(data) {
      this.isEditRoleDialogVisible = true
      this.editingData = data
    },
    editRole() {
      updateRole({
        permissions: this.$refs.editTree.getCheckedKeys(),
        role: {
          createTime: this.editingData.createTime,
          creater: this.userID,
          id: this.editingData.id,
          lastUpdateTime: new Date().toISOString(),
          roleDesc: this.editingData.roleDesc,
          roleName: this.editingData.roleName
        }
      })
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
            this.isEditRoleDialogVisible = false
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
    deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRole(id)
            .then(res => {
              res = res.data
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // 从表格中移除此条数据
                this.roleList = this.roleList.filter(item => item.id !== id)
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
                message: '删除失败!'
              })
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    login() {
      login('wkk', '123456')
        .then(res => {
          res = res.data
          this.userID = res.data.user.id
          this.getPermissions()
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    getPermissions() {
      getPermissions()
        .then(res => {
          const data = res.data.data
          if (data && data.length > 0) {
            this.computePermissionList(data)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    createRole() {
      const permissions = this.$refs.tree.getCheckedKeys()
      const time = new Date().toISOString()
      const role = {
        creater: this.userID,
        createTime: time,
        id: 0,
        lastUpdateTime: time,
        roleDesc: this.roleDesc,
        roleName: this.roleName
      }
      createRole({
        permissions: permissions,
        role
      })
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.isCreateRoleDialogVisible = false
            this.roleList.unshift({
              ...role,
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
          this.$message({
            type: 'error',
            message: '添加失败'
          })
        })
    },
    /**
     * 解析出合法的权限列表数据
     */
    computePermissionList(data) {
      const list = [
        {
          id: data[0].id,
          label: data[0].authName,
          children: []
        }
      ]
      data.shift()
      data.forEach(item => {
        const parentIndex = list.findIndex(
          element => element.id === item.parent
        )
        if (parentIndex !== -1) {
          // 如果能找到父页面
          list[parentIndex].children.push({
            id: item.id,
            label: item.authName
          })
          return
        }
        list.push({
          id: item.id,
          label: item.authName
        })
      })
      this.permissionList = list
    },
    getRoleList() {
      getRoleList()
        .then(res => {
          res = res.data
          this.roleList = res.data
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  },
  created() {
    this.login()
    this.getRoleList()
  }
}
</script>

<style lang="scss" scoped>
.permission-list {
  background-color: #eee;
  border: 1px solid #ddd;
}
</style>
