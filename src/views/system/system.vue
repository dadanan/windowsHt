<template>
  <div class="tablerole">
     <div class="btnBox">
       <el-button type="primary" @click="dialogVisible2 = true">
         <i class="el-icon-plus" style="margin-right: 5px;"></i>添加</el-button>
     </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="selection">
      </el-table-column>

      <el-table-column
        prop="name"
        label="账号">
      </el-table-column>

      <el-table-column
        prop="detail"
        label="昵称">
      </el-table-column>

      <el-table-column
        prop="count"
        label="手机号">
      </el-table-column>

      <el-table-column
        label="所属角色">
      </el-table-column>

      <el-table-column
        label="状态">
      </el-table-column>

      <el-table-column
        label="修改时间">
      </el-table-column>

      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" icon="edit" @click="dialogVisible = true">更新</el-button>
          <el-button type="primary" icon="delete" @click="dialogVisible1 = true">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>


    <el-dialog
    title="更新"
    :visible.sync="dialogVisible"
    size="small" style="margin-top: 20px">

      <div class="dalogBox">
        <el-form ref="form" label-width="150px">

          <div class="leftDalog">
            <el-form-item label="账号">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="所属角色">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="手机">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="绑定微信openid">
              <el-input></el-input>
            </el-form-item>
          </div>

          <div class="rightDalog">
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="昵称">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="绑定模板id">
              <el-input></el-input>
            </el-form-item>
          </div>

          <div class="clear"></div>




        </el-form>
      </div>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      size="tiny" style="margin-top: 200px;">
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="添加"
      :visible.sync="dialogVisible2"
      size="small" style="margin-top: 20px">

      <div class="dalogBox">
        <el-form ref="form" label-width="150px">

          <div class="leftDalog">
            <el-form-item label="账号">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="所属角色">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="手机">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="绑定微信openid">
              <el-input></el-input>
            </el-form-item>
          </div>

          <div class="rightDalog">
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="昵称">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="绑定模板id">
              <el-input></el-input>
            </el-form-item>
          </div>

          <div class="clear"></div>




        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>

</template>

<script>
  export default{
    name: 'roleadmin',
    data() {
      return {
        radio: '1',
        dialogVisible2:false,
        dialogVisible1:false,
        dialogVisible: false,
        currentPage: 1,
        tableData: [{
          detail: '系统管理员',
          name: '系统管理员',
          count: 123,
        },{
          detail: '系统管理员',
          name: '系统管理员',
          count: 123,
        },{
          detail: '系统管理员',
          name: '系统管理员',
          count: 123,
        }],

        data2: [{
          id: 1,
          label: '根权限',
          children: [{
            id: 1-1,
            label: '系统管理',
            children: [{
              id: 1-1-1,
              label: '角色管理'
            }, {
              id: 1-1-2,
              label: '系统用户'
            }]
          },{
            id: 1-2,
            label: '收费管理',
            children: [{
            id: 1-2-1,
            label: '角色管理'
          },{
             id: 1-2-2,
             label: '系统用户'
          }]},{
              id: 1-3,
              label: '数据分析',
              children: [{
                id: 1-3-1,
                label: '角色管理'
              },{
                id: 1-3-2,
                label: '系统用户'
              }]
           },{
            id: 1-4,
            label: '售后管理',
            children: [{
              id: 1-4-1,
              label: '角色管理'
            },{
              id: 1-4-2,
              label: '系统用户'
            }]
          },{
            id: 1-5,
            label: '订单中心',
            children: [{
              id: 1-5-1,
              label: '角色管理'
            },{
              id: 1-5-2,
              label: '系统用户'
            }]
          },{
            id: 1-6,
            label: '租赁管理',
            children: [{
              id: 1-6-1,
              label: '角色管理'
            },{
              id: 1-6-2,
              label: '系统用户'
            }]
          },{
            id: 1-7,
            label: '分润管理',
            children: [{
              id: 1-7-1,
              label: '角色管理'
            },{
              id: 1-7-2,
              label: '系统用户'
            }]
          }
           ]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {

      }
    },
  }
</script>

<style scoped>
.tablerole{
  margin-top: 30px;
  padding:20px;
}
  .block{
    text-align: center;
    margin-top: 20px;
  }
  .leftDalog{
    float: left;
    width: 45%;
  }
  .rightDalog{
    float: right;
    width: 45%;
  }
  .clear{
    clear: both;
  }
 .el-input{
   width: 200px;
 }
  .btnBox{
    margin-bottom: 20px;
  }
</style>
