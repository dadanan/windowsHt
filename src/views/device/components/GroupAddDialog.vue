<template>
  <el-dialog title="设备组添加" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" label-position="left">
      <el-form-item label="组名">
        <el-input v-model="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="组标">
        <el-button type="primary">上传文件</el-button>
      </el-form-item>
      <el-form-item label="归属">
        <el-select v-model="placeholder">
          <el-option label="Placeholder1" value="1"></el-option>
          <el-option label="Placeholder2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="OpenID">
        <el-input v-model="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="组管理者">
        <el-input v-model="placeholder" disabled></el-input>
      </el-form-item>
      <el-form-item label="封面图片">
        <el-button type="primary">上传文件</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDeviceDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addDevice">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
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
