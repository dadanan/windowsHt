<template>
    <div class="weather">
        <div id="city">
          <h1>{{city}}</h1>
          <p>{{suburb}}</p>
        </div>
        
        <p>天气: {{weather}} ({{temperature}})</p>
        <p>紫外线强度: {{UV}}</p>
        <p>PM2.5: {{weatherQuality}} ug/m3</p>
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
        UV: null,
        weatherQuality: null,
        apiUrl: 'https://bird.ioliu.cn/v1/?url=http://api.map.baidu.com/telematics/v3/weather?output=json&ak=1f0558be61a3d4fccb7ad1f40c84f3c5&location=',
      }
    },
    watch:{
      option: function() {
        this.loadOptions();
        this.requestWeather(this.city);
      }
    },
    created() {
      this.loadOptions();
      this.requestWeather(this.city);
    },
    methods:{
      loadOptions : function() {
        this.city = this.option.city,
        this.province = this.option.province,
        this.suburb = this.option.suburb
      },
      //请求天气
      requestWeather: function(city) {
        //var proxy = 'https://bird.ioliu.cn/v1/?url=';
        axios.get(this.apiUrl+city)
        .then((response)=>{
          this.date = response.data.date;
          this.weather = response.data.results[0].weather_data[0].weather;
          this.temperature = response.data.results[0].weather_data[0].temperature;
          this.weatherQuality =  response.data.results[0].pm25;
          this.UV =  response.data.results[0].index[4].zs;
        })
      }
    }
    
}
</script>

<style lang="scss" scoped>
  .weather {
    height: 100%;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
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
