<template>
  <div class="dashboard-container">
    <div class="cont">
      <div class="cont_left">
        <div class="">
          <div class="cont_top">
            <p class="text">健康管理</p>
            <p class="ele">Health Management</p>
          </div>
          <div class="">
            <p class="text">运营管理</p>
            <p class="ele">Operationh Management</p>
          </div>
        </div>
        <div class="cont_bot" @click="btn">
          <p>进入</p>
        </div>
      </div>
      <div class="cont_right">
        <div class="">
          <div class="cont_top">
            <p class="text">能源管理</p>
            <p class="ele">Energy Management</p>
          </div>
          <div class="">
            <p class="text">机房管理</p>
            <p class="ele">Equipment Management</p>
          </div>
        </div>
        <div class="cont_bot cont_bots" @click="btnl">
          <p>进入</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    btnl() {
      window.location.href = 'http://linxiang.hiengine.cn:8081/Account/Login'
    },
    btn() {
      this.$router.push({
        path: '/merge',
        query: {}
      })
    },
    // console.log(window.location.host)
    ss() {
      console.log(window.location.host)
      if (window.location.host == 'dasklima.sikelai.net' || window.location.host == 'echvac.sikelai.net') {
      } else{
        this.$router.push({
          path: '/merge',
          query: {}
        })
      }
    }
  },
  created() {
    this.ss()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
    width: 100%;
    height: 100%;
    background: url(assets/login_bg.jpg) no-repeat center center;
    background-size:100% 100%;
    .cont{
      position: fixed;
      top: 21%;
      left: 15%;
      width: 70%;
      height: 664px;
      p{
        color: #fff;
      }
      .text{
          font-size: 50px;
          line-height: 0px;
          font-weight: 700;
        }
      .ele{
        font-size: 24px;
        line-height: 0px;
        font-weight: 600;
      }
      .cont_top{
        padding-bottom: 6px;
      }
      .cont_left{
        float: left;
      }
      .cont_right{
        float: right;
      }
      .cont_bot{
        font-size: 24px;
        text-align: center;
        color: #fff;
        padding: 10px 30px;
        font-weight: 700;
        background: #2e528c;
        margin-top: 40%;
        border-radius: 10px;
        cursor: pointer;
        &:hover{
          background: #17448b;
        }
      }
      .cont_bots{
        background: #d8974a;
        &:hover{
          background: #d7831f;
        }
      }
    }
}
</style>
