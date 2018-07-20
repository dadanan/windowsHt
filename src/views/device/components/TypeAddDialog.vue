<template>
  <el-dialog title="设备类型添加" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <d-title>基础设置</d-title>
    <el-form label-width="100px" label-position="left">
      <el-form-item label="Type ID">
        <el-select v-model="placeholder">
          <el-option label="Placeholder1" value="1"></el-option>
          <el-option label="Placeholder2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="对应名">
        <el-input v-model="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="缩图">
        <el-button type="primary">上传文件</el-button>
      </el-form-item>
      <el-form-item label="产品描述">
        <el-input v-model="placeholder" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <d-title>硬件设置</d-title>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDeviceDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addDevice">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import DTitle from '@/components/Title'

  export default {
    components: {
      DTitle
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        placeholder: 'placeholder'
      }
    }
  }
</script>
