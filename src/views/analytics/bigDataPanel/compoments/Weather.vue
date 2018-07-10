<template>
    <div class="weather">
        <div id="city">
          <h1>{{city}}</h1>
          <p>{{suburb}}</p>
        </div>
        
        <p>天气: {{weather}} ({{temperature}})</p>
        <p>湿度: {{humidity}}%</p>
        <p>PM2.5: {{weatherQuality}}</p>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props : ["option"],
    data() {
      return {
        city: this.option.city,
        province: this.option.province,
        suburb: this.option.suburb,
        weather: null,
        temperature: null,
        humidity: 56,
        weatherQuality: 12,
      }
    },
    watch:{
      option: function() {
        this.requestWeather(this.city);
      }
    },
    created() {
      this.loadOptions();
    },
    methods:{
      loadOptions : function() {
        this.city = this.option.city,
        this.province = this.option.province,
        this.suburb = this.option.suburb
      },
      //请求天气
      requestWeather: function(city) {
        var proxy = 'https://bird.ioliu.cn/v1/?url=';
        axios.get(proxy+ "http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak=1f0558be61a3d4fccb7ad1f40c84f3c5")
        .then((response)=>{
          this.date = response.data.date;
          this.weather = response.data.results[0].weather_data[0].weather;
          this.temperature = response.data.results[0].weather_data[0].temperature;
          
        })
      }
    }
    
}
</script>

<style lang="scss" scoped>
  .weather {
    h1,h2,h3 {
      padding: 0px;
      margin: 0px;
    }
    #city {

      position: relative;
      float: right;
    }
  }
</style>
