<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="groupAddDialogVisible = true">添加</el-button>
          <el-button type="primary">自定义</el-button>
        </el-button-group>
      </div>
      <el-table :data="groupList" border class="mb20">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="组名" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="创建者" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="创建者 ID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="组标" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="封面图片" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="groupEditDialogVisible = true">编辑</el-button>
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
    </el-card>
    <group-add-dialog :visible.sync="groupAddDialogVisible"></group-add-dialog>
    <group-edit-dialog :visible.sync="groupEditDialogVisible"></group-edit-dialog>
  </div>
</template>

<script>
  import GroupAddDialog from './components/GroupAddDialog'
  import GroupEditDialog from './components/GroupEditDialog'

  export default {
    components: {
      GroupAddDialog,
      GroupEditDialog
    },
    data() {
      const groupList = []

      for (let i = 0; i < 15; i++) {
        groupList.push({
          name: 'placeholder'
        })
      }
      return {
        groupList,
        groupAddDialogVisible: false,
        groupEditDialogVisible: false
      }
    }
  }
</script>
