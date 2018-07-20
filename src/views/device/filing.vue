<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="filingAddDialogVisible = true">新建</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="typeList"
        style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="placeholder"
          label="品名" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="型号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="typeID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="功能项" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="创建人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="创建日期" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="来源" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="placeholder"
          label="归属" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
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
    <filing-add-dialog :visible.sync="filingAddDialogVisible"></filing-add-dialog>
  </div>
</template>

<script>
  import FilingAddDialog from './components/FilingAddDialog'

  export default {
    components: {
      FilingAddDialog
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
        filingAddDialogVisible: false
      }
    }
  }
</script>
