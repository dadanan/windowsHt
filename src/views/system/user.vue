<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateUserDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="userList"
        style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="username"
          label="账号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="role"
          label="所属角色" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="updateDatetime"
          label="修改时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="isEditUserDialogVisible = true">编辑</el-button>
            <el-button type="text" @click="deleteUser">删除</el-button>
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
    <el-dialog title="添加系统用户" :visible.sync="isCreateUserDialogVisible">
      <el-form label-position="left" label-width="150px">
        <el-form-item label="账号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select>
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="测试角色" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="绑定微信 Open ID">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select>
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
            <el-option label="限制" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定模板 ID">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isCreateUserDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑系统用户" :visible.sync="isEditUserDialogVisible">
      <el-form label-position="left" label-width="150px">
        <el-form-item label="账号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select>
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="测试角色" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="绑定微信 Open ID">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select>
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
            <el-option label="限制" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定模板 ID">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isEditUserDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      const userList = []
      for (let i = 0; i < 15; i++) {
        userList.push({
          username: 'eric',
          nickname: 'Eric Xue',
          mobile: '139997212654',
          role: '管理员',
          state: '启用',
          updateDatetime: '2018-06-26 10:30:39'
        })
      }
      return {
        userList,
        isCreateUserDialogVisible: false,
        isEditUserDialogVisible: false
      }
    },
    methods: {
      deleteUser() {
        this.$confirm('此操作将永久删除该系统用户, 是否继续?', '提示', {
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
