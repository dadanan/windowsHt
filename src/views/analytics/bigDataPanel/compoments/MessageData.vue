<template>

  <el-tabs class="main-tabs" type="border-card" @tab-click="onTabClick">
    <el-tab-pane label="系统" name="0">
      <div style="height: 100px">
        <el-input
          type="textarea"
          placeholder="系统讯息"
          :value="messageDataBuffer" class="textarea-full">
        </el-input>
      </div>
    </el-tab-pane>
    <el-tab-pane label="设备" name="1">
      <el-input
        type="textarea"
        placeholder="系统讯息"
        :value="messageDataBuffer" class="textarea-full">
      </el-input>
    </el-tab-pane>
    <el-tab-pane label="订单" name="2">
      <el-input
        type="textarea"
        placeholder="系统讯息"
        :value="messageDataBuffer" class="textarea-full">
      </el-input>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  export default {
    props: ['msgs', 'types'],
    data() {
      return {
        systemMsgs: null,
        selectedType: 0,
        messageDataBuffer: '',
        msgTypes: null
      }
    },
    created() {
      // 测试数据
      this.systemMsgs = this.msgs
      this.msgTypes = this.types
      this.getMessages(0)
    },
    watch: {
      msgs() {
        this.systemMsgs = this.msgs
        this.getMessages(this.selectedType)
      },
      types() {
        this.msgTypes = this.msgs
      },
      selectedType(newval, oldval) {
        this.getMessages(newval)
      }
    },
    methods: {
      toogleTab(type) {
        this.selectedType = type
        this.getMessages(this.selectedType)
      },
      getMessages(type) {
        this.messageDataBuffer = ''
        this.systemMsgs.forEach((element) => {
          if (element.type === parseInt(type)) {
            this.messageDataBuffer = this.messageDataBuffer + this.getMessagesName(element.type) + ' : ' + element.message + '\n'
          }
        })
      },
      getMessagesName(type) {
        var catName = ''
        this.msgTypes.forEach((element) => {
          if (element.id === type) {
            catName = element.name
            return
          }
        })
        return catName
      },
      // Deal wit switching between tabs
      onTabClick: function(tab, event) {
        this.toogleTab(tab.name)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .message-panel {
    width: 90%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .main-tabs {
    background-color: transparent;
    border: none;
  }
</style>
<style lang="scss">
  .textarea-full {
    height: 100%;
    textarea {
      height: 100%;
      background-color: transparent;
      border: none;
      color: white;
    }
  }
  .el-tabs__header{
    background-color: transparent !important;
    border: none;
  }
  .message-panel {
    textarea {
      border: none;
      height: 100%;
      resize: none;
      box-sizing: border-box; /* fit parent width */

    }
  }
</style>
