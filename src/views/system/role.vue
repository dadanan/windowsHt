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
        <el-table-column prop="userCount" label="系统用户数量" show-overflow-tooltip sortable>
        </el-table-column>
        <!-- <el-table-column prop="creater" label="创建人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="updateUserId" label="更新用户" show-overflow-tooltip sortable>
        </el-table-column> -->
        <el-table-column prop="lastUpdateTime" label="上次修改时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.lastUpdateTime).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="listQuery.pageSizes" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.limit">
      </el-pagination>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false title="添加角色" :visible.sync="isCreateRoleDialogVisible">
      <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="12">
            <el-tree ref="tree" :data="permissionList" show-checkbox node-key="id" :default-expand-all='true' :props="defaultProps" class="permission-list">
            </el-tree>
          </el-col>
          <el-col :span="12">
            <el-form :rules='rules' ref='addForm' :model='addForm' label-position="left" label-width="150px">
              <el-form-item label="角色名" prop='roleName'>
                <el-input v-model='addForm.roleName'></el-input>
              </el-form-item>
              <el-form-item label="简介" prop='roleDesc'>
                <el-input v-model='addForm.roleDesc'></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate('addForm','createRole')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="编辑角色" :visible.sync="isEditRoleDialogVisible">
      <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="12">
            <el-tree :data="permissionList" ref='editTree' show-checkbox node-key="id" :default-expand-all='true' :props="defaultProps" class="permission-list">
            </el-tree>
          </el-col>
          <el-col :span="12">
            <el-form :model='editingData' :rules='rules' ref='editingData' label-position="left" label-width="150px">
              <el-form-item label="角色名" prop='roleName'>
                <el-input v-model="editingData.roleName"></el-input>
              </el-form-item>
              <el-form-item label="简介" prop='roleDesc'>
                <el-input v-model='editingData.roleDesc'></el-input>
              </el-form-item>
              <el-form-item label="修改时间">
                <div>{{new Date(editingData.lastUpdateTime).toLocaleString()}}</div>
              </el-form-item>
              <el-form-item label="创建时间">
                <div>{{new Date(editingData.createTime).toLocaleString()}}</div>
              </el-form-item>
              <el-form-item label="系统用户数量">
                <div>{{editingData.userCount}}</div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate('editingData','editRole')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissions,
  createRole,
  getRoleList,
  deleteRole,
  updateRole,
  getRoleDetail
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
      listQuery: {
        limit: 50,
        page: 1,
        pageSizes: [50, 100, 200, 300]
      },
      userID: undefined,
      addForm: {
        roleDesc: '',
        roleName: ''
      },
      editingData: {}, // 当前正在编辑的角色数据
      rules: {
        roleName: [
          { max: 15, message: '最大长度为15个字符', trigger: 'blur' },
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        roleDesc: [
          { max: 100, message: '最长为100个字符', trigger: 'blur' },
          {
            required: true,
            message: '请输入角色描述',
            trigger: 'blur'
          }
        ]
      },
      originPermissionData: []
    }
  },
  methods: {
    showEditRoleDialog(data) {
      this.isEditRoleDialogVisible = true
      this.getRoleDetail(data.id)
    },
    getThePermission(id) {
      return this.originPermissionData.filter(item => item.id === id)[0]
    },
    editRole() {
      // 首先获取当前用户选择的权限id，然后筛选一遍：如果用户仅仅选择了部分子节点，那么手动把父节点id也添加进来。
      // 为了客户那边添加角色时，树组件正常的显示
      const permissions = this.$refs.editTree.getCheckedKeys()
      permissions.forEach(id => {
        const temp = this.getThePermission(id)
        if (temp.parent && !permissions.includes(temp.parent)) {
          // 如果权限id数组中没有该权限父权限的id，那么手动加进去
          permissions.push(temp.parent)
        }
      })

      updateRole({
        permissions,
        role: {
          createTime: this.editingData.createTime,
          creater: this.userID,
          id: this.editingData.id,
          lastUpdateTime: new Date().toISOString(),
          roleDesc: this.editingData.roleDesc,
          roleName: this.editingData.roleName
        }
      }).then(res => {
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
    },
    getRoleDetail(id) {
      getRoleDetail(id).then(res => {
        const data = res.data
        console.log(res.data)
        this.editingData = data.role
        // 初始化前，手动去除所有的父节点
        data.permissions = data.permissions.filter(item => item.parent)
        this.$refs.editTree.setCheckedNodes(data.permissions)
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
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getPermissions() {
      getPermissions().then(res => {
        console.log(res.data)
        const data = res.data
        if (data && data.length > 0) {
          this.originPermissionData = data
          this.computePermissionList(data)
        }
      })
    },
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
    createRole() {
      // 首先获取当前用户选择的权限id，然后筛选一遍：如果用户仅仅选择了部分子节点，那么手动把父节点id也添加进来。
      // 为了客户那边添加角色时，树组件正常的显示
      const permissions = this.$refs.tree.getCheckedKeys()
      permissions.forEach(id => {
        const temp = this.getThePermission(id)
        if (temp.parent && !permissions.includes(temp.parent)) {
          // 如果权限id数组中没有该权限父权限的id，那么手动加进去
          permissions.push(temp.parent)
        }
      })

      const time = new Date().toISOString()
      const role = {
        creater: this.userID,
        createTime: time,
        id: 0,
        lastUpdateTime: time,
        roleDesc: this.addForm.roleDesc,
        roleName: this.addForm.roleName
      }
      const form = {
        permissions,
        role: role
      }
      createRole(form)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.isCreateRoleDialogVisible = false

            form.role.id = res.data
            this.roleList.push({
              ...form.role,
              userCount: 0
            })
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
            message: '添加失败'
          })
        })
    },
    /**
     * 解析出合法的权限列表数据
     */
    computePermissionList(data) {
      data = JSON.parse(JSON.stringify(data))
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
          label: item.authName,
          children: []
        })
      })
      this.permissionList = list
    },
    getRoleList() {
      getRoleList().then(res => {
        if (res.code === 200) {
          this.roleList = res.data
          const length = res.data.length
          this.listQuery.limit = length
          // this.listQuery.pageSizes = [length, length * 2, length * 3]
        }
      })
    }
  },
  created() {
    this.getRoleList()
    this.getPermissions()
  }
}
</script>

<style lang="scss" scoped>
.permission-list {
  background-color: #eee;
  border: 1px solid #ddd;
}
</style>
