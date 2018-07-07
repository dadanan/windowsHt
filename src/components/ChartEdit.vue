<template>
  <el-dialog title="编辑图表" :visible="isOpen" @update:visible="updateIsOpen">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="数据来源">
        <el-select v-model="form.datasource" placeholder="请选择">
          <el-option
            v-for="item in selectData"
            :key="item.id"
            :label="item.text"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    props: ['isOpen', 'editData', 'selectData'],
    data() {
      return {
        form: {
          color: '#ccc',
          datasource: ''
        }
      }
    },
    methods: {
      save() {
        const foundDatasource = this.selectData.find((el) => {
          return el.id === this.form.datasource
        })
        this.$emit('save', foundDatasource)
      },
      cancel() {
        this.$emit('update:isOpen', false)
      },
      updateIsOpen($event) {
        this.$emit('update:isOpen', $event)
        this.form.datasource = this.editData.id
      }
    }
  }
</script>
