<template>
    <div class="weather">
        <h1 id="city">{{city}}</h1>
        <span id="date">{{date}}</span>
        
        <p>{{weather}} ({{temperature}})</p>
        <p>{{wind}}</p>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
      return {
        city: "厦门",
        date: null,
        weather: null,
        wind :null,
        pm25: null,
        temperature: null,
      }
    },
    mounted() {
      this.requestWeather(this.city);
    },
    methods:{
      //请求天气
      requestWeather: function(city) {
        var proxy = 'https://bird.ioliu.cn/v1/?url=';
        axios.get(proxy+ "http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak=1f0558be61a3d4fccb7ad1f40c84f3c5")
        .then((response)=>{
          this.date = response.data.date;
          this.weather = response.data.results[0].weather_data[0].weather;
          this.wind = response.data.results[0].weather_data[0].wind;
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
