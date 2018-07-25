<template>
  <div class="bdp">
    <div class="bdp__container">
      <div class="bdp__title"></div>
      <div class="bdp__content">
        <div class="bdp__row">
          <div class="bdp__col">
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">室外天气</div>
                <div class="bdp__panel-title__opt">
                  <font-awesome-icon icon="cog"></font-awesome-icon>
                </div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">设备数据</div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">用户数据</div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">设备类型</div>
              </div>
            </div>
          </div>
          <div class="bdp__col">
            <div class="bdp__map-panel"></div>
            <div class="bdp__project-panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">工程案例</div>
              </div>
            </div>
          </div>
          <div class="bdp__col">
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">最新消息</div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">解决方案</div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">告警信息</div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">维护信息</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bdp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1002;
    overflow: auto;

    &__container {
      width: 1920px;
      height: 1080px;
      background: url("/static/images/bdp_topbar.png") no-repeat, url("/static/images/bdp_bg.jpg") no-repeat;
      background-size: 100%, 100%;
      display: flex;
      flex-direction: column;
    }

    &__title {
      height: 85px;
    }

    &__panel {
      width: 452px;
      height: 222px;
      background: url("/static/images/bdp_panel.png") no-repeat;
      background-size: 100% 100%;
    }

    &__map-panel {
      width: 852px;
      background: url("/static/images/bdp_map_panel.png") no-repeat;
      background-size: 100%;
      height: 630px;
    }

    &__project-panel {
      width: 852px;
      height: 292px;
      background: url("/static/images/bdp_project_panel.png") no-repeat;
      background-size: 100% 100%;
    }

    &__panel-title {
      height: 39px;
      line-height: 39px;
      font-size: 18px;
      font-family: "Microsoft YaHei",serif;
      color: rgb(255, 255, 255);
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      &__text {
        text-align: center;
        width: 170px;
      }

      &__opt {
        margin-right: 10px;
      }
    }

    &__content {
      padding: 10px 30px 36px;
      flex: 1;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    &__col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
</style>

