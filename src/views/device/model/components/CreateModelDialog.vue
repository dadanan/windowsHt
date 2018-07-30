<template>
  <el-dialog title="添加备案机型" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="TypeID">
        <el-input v-model="form.typeId"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="功能项">
        <el-checkbox-group v-model="form.functionList">
          <el-checkbox v-for="item, index in functionList" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="码表">
        <el-button type="primary" icon="el-icon-upload">上传</el-button>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { fetchList } from '@/api/function'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {
          typeId: '',
          name: '',
          source: '',
          functionList: [],
          codeMap: '',
          description: ''
        },
        functionList: []
      }
    },
    created() {
      this.getFunctionList()
    },
    methods: {
      getFunctionList() {
        fetchList({
          page: 1,
          limit: 1000
        }).then(response => {
          this.functionList = response.data.items
        })
      }
    }
  }
</script>
