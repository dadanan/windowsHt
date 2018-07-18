<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateRoleDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="roleList"
        style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="角色名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="description"
          label="简介" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="userTotal"
          label="系统用户数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="isEditRoleDialogVisible = true">编辑</el-button>
            <el-button type="text" @click="deleteRole">删除</el-button>
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
    <el-dialog title="添加角色" :visible.sync="isCreateRoleDialogVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-tree
            :data="permissionList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps" class="permission-list">
          </el-tree>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="角色名">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input></el-input>
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
        <el-button type="primary" @click="isCreateRoleDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色" :visible.sync="isEditRoleDialogVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-tree
            :data="permissionList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps" class="permission-list">
          </el-tree>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="角色名">
              <el-input v-model="demoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input></el-input>
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
              <div>2017-08-29 10:35:07</div>
            </el-form-item>
            <el-form-item label="创建时间">
              <div>2017-08-29 10:35:07</div>
            </el-form-item>
            <el-form-item label="系统用户数量">
              <div>0</div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="isEditRoleDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      const roleList = []
      for (let i = 0; i < 15; i++) {
        roleList.push({
          name: '管理员',
          description: '这是一个简介',
          userTotal: i
        })
      }
      return {
        roleList,
        isCreateRoleDialogVisible: false,
        isEditRoleDialogVisible: false,
        permissionList: [
          {
            id: 1,
            label: '权限 1',
            children: [
              {
                id: 4,
                label: '权限 1-1',
                children: [
                  {
                    id: 9,
                    label: '权限 1-1-1'
                  },
                  {
                    id: 10,
                    label: '权限 1-1-2'
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '权限 2',
            children: [
              {
                id: 5,
                label: '权限 2-1'
              },
              {
                id: 6,
                label: '权限 2-2'
              }
            ]
          },
          {
            id: 3,
            label: '权限 3',
            children: [
              {
                id: 7,
                label: '权限 3-1'
              },
              {
                id: 8,
                label: '权限 3-2'
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        demoForm: {
          name: '管理员'
        }
      }
    },
    methods: {
      deleteRole() {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .permission-list {
    background-color: #eee;
    border: 1px solid #ddd;
  }
</style>
