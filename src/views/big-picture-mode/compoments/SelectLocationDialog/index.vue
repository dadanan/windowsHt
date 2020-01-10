<template>
  <div class="modal" v-show="visible" @click.self="handleClose">
    <div class="dialog">
      <div class="dialog__close" @click.self="handleClose"></div>
      <div class="dialog__form">
        <div class="dialog__select-group">
          <label>省：</label>
          <el-select v-model="prov" placeholder="请选择" class="omg-select">
            <el-option
              v-for="item in arr"
              :key="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="dialog__select-group">
          <label>市：</label>
          <el-select v-model="city" placeholder="请选择" class="omg-select">
            <el-option
              v-for="item in cityArr"
              :key="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="dialog__select-group">
          <label>区：</label>
          <el-select v-model="district" placeholder="请选择" class="omg-select" v-if="district">
            <el-option
              v-for="item in districtArr"
              :key="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="dialog__done" @click="sub"></div>
      <div class="dialog__cancel" @click.self="handleClose"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
 .omg-select {
    flex: 1;
    .el-input__inner {
      padding-top: 10px;
      padding-bottom: 10px;
      border: 1px solid rgba(2, 177, 252, 0.26) !important;
      background-color: rgba(0, 0, 0, 0.24);
      font-size: 18px;
      color: #fff;
      height: unset;
      line-height: unset;
      border-radius: unset;
    }
  }

  .modal {
    font-family: "Microsoft YaHei",serif;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-items: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .7);

    * {
      font-family: "Microsoft YaHei",serif;
    }
  }

  .dialog {
    width: 778px;
    height: 518px;
    background: url("./assets/bg.png");
    margin: auto;
    position: relative;

    &__select-group {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      label {
        color: #fff;
        font-size: 18px;
        font-weight: normal;
      }
    }

    &__form {
      position: absolute;
      top: 125px;
      left: 0;
      right: 0;
      margin: auto;
      width: 430px;
    }

    &__close {
      cursor: pointer;
      position: absolute;
      width: 22px;
      height: 22px;
      top: 19px;
      right: 30px;
    }

    &__cancel {
      cursor: pointer;
      position: absolute;
      top: 373px;
      left: 158px;
      width: 204px;
      height: 48px;
    }

    &__done {
      cursor: pointer;
      position: absolute;
      top: 373px;
      left: 415px;
      width: 204px;
      height: 48px;
    }
  }
</style>

<script>
import {dataa} from '../../bigData'
import { queryWeather , updataLocation } from '@/api/big-picture-mode/bigPictureMode'
import { getCity } from '@/utils/auth'

  export default {
    props: ['visible'],
    data() {
      return {
        placeholder: '1',
        arr: dataa,
        prov: '北京',
        city: '北京',
        district: '朝阳区',
        cityArr: [],
        districtArr: []
      }
    },
    methods: {
      sub(){
        let district = ''
        // if(this.district == null){
          district = this.city
        // }else{
        //   district =(this.district).substring(0,((this.district.length)-1))
        // }
        queryWeather({"location":district}).then(res=>{
          const weathers = res.data
          this.$emit('weather',{
             "weathers":res.data,
             "prov":this.prov,
             "city":this.city,
             "district":this.district
          })
          this.$emit('update:visible', false)
          const s = [this.city,this.prov,this.district]
          const ss = s.toString()
          updataLocation({value:ss}).then(res=>{
            console.log(res.data)
          })
        })
      },
      handleClose() {
        this.$emit('update:visible', false)
      },
      updateCity() {
        for (var i in this.arr) {
          var obj = this.arr[i];
          if (obj.name == this.prov) {
            this.cityArr = obj.sub;
            break;
          }
        }
        this.city = this.cityArr[1].name;
      },
      updateDistrict() {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.city) {
            this.districtArr = obj.sub;
            break;
          }
        }
        if(this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
          this.district = this.districtArr[1].name;
        } else {
          this.district = '';
        }
      }
	},
	created () {
		this.updateCity();
    this.updateDistrict();
    // console.log(getCity())
    // if(getCity()){

    // }
	},
	watch: {
		prov(){
			this.updateCity();
      this.updateDistrict();
		},
		city(){
			this.updateDistrict();
		}
  }
  }
</script>
