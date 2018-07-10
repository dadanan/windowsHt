<template>
  <div>
    <el-dialog
        title="位置设置"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="cancel"
        :modal="false">
    
            <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
            </el-cascader>
        

        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
    import axios from 'axios'
    import { regionData,CodeToText } from 'element-china-area-data'
    export default {
        props:['visible','id'], 
        
        mounted() {
           
        },
        data() {
            return {
                dialogVisible: false,
                /////////////////
                options: regionData,
                selectedOptions: [],
                selectedLocation: null,
            };
        },
        created() {
            this.dialogVisible = this.visible
        },
        watch :{
            visible: function(newVal, oldVal) {
                this.dialogVisible = newVal;
            }
        },
        methods:{
            handleChange (value) {
                this.selectedLocation = value
            },
          
            /////////////////////////
            updateOption(p,c,s) {
                let WeatherOptionData = {
                    province : p,
                    city : c,
                    suburb : s,
                };
                this.$emit('updateOption',WeatherOptionData);
            },
            cancel(val) {
                this.dialogVisible = false;
                this.$emit('toggleDialog',this.id);
            },
            save() {
                //如果是直辖区
                if(CodeToText[this.selectedLocation[1]] === "市辖区")
                    this.updateOption(CodeToText[this.selectedLocation[0]],CodeToText[this.selectedLocation[0]],CodeToText[this.selectedLocation[2]])
                else
                    this.updateOption(CodeToText[this.selectedLocation[0]],CodeToText[this.selectedLocation[1]],CodeToText[this.selectedLocation[2]])
                
                this.dialogVisible = false;
                this.$emit('toggleDialog',this.id);
            }
        }
    }
</script>