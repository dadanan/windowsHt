<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="typeAddDialogVisible = true">新建</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="typeList"
        style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="placeholder"
          label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="型号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="对应名" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="Type ID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="功能项" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="创建者" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="创建时间" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="归属" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">复制</el-button>
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
    <type-add-dialog :visible.sync="typeAddDialogVisible"></type-add-dialog>
  </div>
</template>

<script>
  import TypeAddDialog from './components/TypeAddDialog'

  export default {
    components: {
      TypeAddDialog
    },
    data() {
      const typeList = []

      for (let i = 0; i < 15; i++) {
        typeList.push({
          placeholder: 'placeholder'
        })
      }
      return {
        typeList,
        typeAddDialogVisible: false
      }
    }
  }
</script>
