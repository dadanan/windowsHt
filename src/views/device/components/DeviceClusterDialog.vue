<template>
  <el-dialog top='4vh' :close-on-click-modal=false  title="设备集群" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="table-opts">
          <el-form inline class="el-form--flex">
            <el-form-item style="flex: 1;">
              <el-input v-model="addForm.mac" placeholder="设备 MAC"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addDevice">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="deviceList"
          style="width: 100%" border highlight-current-row class="mb20">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="name"
            label="名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column
            prop="typeID"
            label="typeID" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column
            prop="mac"
            label="MAC" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteDevice(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-form label-position="left" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="clusterForm.name"></el-input>
          </el-form-item>
          <el-form-item label="缩图">
            <div class="image-upload">
              <div class="image-upload__image">
                <img src="http://via.placeholder.com/100x100">
              </div>
              <el-button type="primary" size="mini" class="image-upload__btn">上传图片</el-button>
            </div>
          </el-form-item>
          <el-form-item label="集群 ID">
            <el-input v-model="clusterForm.id"></el-input>
          </el-form-item>
          <el-form-item label="集群描述">
            <el-input v-model="clusterForm.description" type="textarea" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确认集群</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      deviceList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        addForm: {
          mac: ''
        },
        clusterForm: {
          name: '',
          id: '',
          description: ''
        }
      }
    },
    methods: {
      addDevice() {
        this.deviceList.push({
          mac: this.addForm.mac
        })
      },
      deleteDevice(index) {
        this.deviceList.splice(index, 1)
      }
    }
  }
</script>
