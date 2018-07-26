<template>
  <div class="weather">
    <div class="weather__l">
      <i :class="getWeatherIcon('weather')" class="weather__item weather__icon"></i>
      <div class="weather__item weather__temp">{{temperature}}</div>
      <div class="weather__item weather__uv">紫外线强度: {{UV}}</div>
      <div class="weather__item weather__pm25">PM 2.5: {{weatherQuality}}ug/m3</div>
    </div>
    <div class="weather__r">
      <div class="weather__item weather__city">{{city}}</div>
      <div class="weather__item weather__suburb">{{suburb}}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .weather {
    display: flex;
    height: 100%;
    &__item {
      margin: 10px;
    }

    &__l {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__r {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
    }

    &__icon {
      font-size: 40px;
      font-weight: bold;
    }

    &__temp {
      font-size: 20px;
    }

    &__uv {
    }

    &__pm25 {
    }

    &__city {
      font-size: 38px;
      font-weight: bold;
    }

    &__suburb {
      font-size: 18px;
    }
  }
</style>

<script>
  import axios from 'axios'

  export default {
    props: ['option'],
    data() {
      return {
        city: this.option.city,
        province: this.option.province,
        suburb: this.option.suburb,
        weather: null,
        temperature: null,
        UV: null,
        weatherQuality: null,
        apiUrl: 'https://bird.ioliu.cn/v1/?url=http://api.map.baidu.com/telematics/v3/weather?output=json&ak=1f0558be61a3d4fccb7ad1f40c84f3c5&location='
      }
    },
    watch: {
      option: function() {
        this.loadOptions()
        this.requestWeather(this.city)
      }
    },
    created() {
      this.loadOptions()
      this.requestWeather(this.city)
    },
    methods: {
      loadOptions: function() {
        this.city = this.option.city
        this.province = this.option.province
        this.suburb = this.option.suburb
      },
      // 请求天气
      requestWeather: function(city) {
        // var proxy = 'https://bird.ioliu.cn/v1/?url=';
        axios.get(this.apiUrl + city)
          .then((response) => {
            this.date = response.data.date
            this.weather = response.data.results[0].weather_data[0].weather
            this.temperature = response.data.results[0].weather_data[0].temperature
            this.weatherQuality = response.data.results[0].pm25
            this.UV = response.data.results[0].index[4].zs
          })
      },
      getWeatherIcon(weather) {
        const allType = [
          { weather: '晴', icon: 'wi wi-day-sunny' },
          { weather: '多云', icon: 'wi wi-day-cloudy' },
          { weather: '阴', icon: 'wi wi-day-cloudy-gusts' },
          { weather: '阵雨', icon: 'wi wi-day-hail' }
        ]
        var result = allType.filter(elem => {
          if (String(elem.weather) === String(weather)) return elem.icon
        })
        if (result.length > 0) return result
        else return 'wi wi-day-sunny'
      }
    }

  }
</script>

<!--<style lang="scss" scoped>-->
<!--.weather {-->
<!--padding-top: 30px;-->
<!--height: 100%;-->
<!--width: 90%;-->
<!--margin-left: auto;-->
<!--margin-right: auto;-->
<!--h1, h2, h3 {-->
<!--padding: 0px;-->
<!--margin: 0px;-->
<!--}-->
<!--#city {-->
<!--position: relative;-->
<!--float: right;-->
<!--}-->
<!--.temperature {-->
<!--font-size: 25px;-->
<!--}-->
<!--.weather-icon {-->
<!--font-size: 50px;-->
<!--margin-bottom: 10px;-->
<!--}-->
<!--}-->
<!--</style>-->
