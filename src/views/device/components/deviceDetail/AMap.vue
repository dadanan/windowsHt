<template>
  <div>
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" :events="events" class="amap-demo" :plugin="plugin">
        <el-amap-marker :position="marker.position" :events="events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
      </el-amap>
      <div class="toolbar">
        经纬度: [{{ center[0] }}, {{ center[1] }}] 地址: {{ address }}
      </div>
    </div>
  </div>
</template>

<script>
import { queryDevicePosition } from '@/api/device/list'

export default {
  props: ['gps'],
  data() {
    const self = this
    return {
      searchOption: {
        city: '',
        citylimit: true
      },
      zoom: 12,
      center: [121.59996, 31.197646],
      address: '',
      events: {
        click(e) {
          let { lng, lat } = e.lnglat
          const position = [lng, lat]
          self.center = position
          self.marker.position = position

          self.getDetailLocation(lng, lat, addr => {
            const component = addr.addressComponent
            self.$emit('getLocation', {
              gps: position,
              location: `${component.province},${component.city},${
                component.district
              },${addr.formattedAddress}`
                .split(',')
                .filter(item => item)
                .join(',') // 去除可能存在的多个逗号
            })
          })
        }
      },
      marker: {
        position: [121.59996, 31.197646],
        visible: true,
        draggable: false
      },
      markers: [], // 多个标记
      plugin: {
        pName: 'Scale',
        events: {
          init(instance) {}
        }
      }
    }
  },
  methods: {
    /**
     * @param cb 回调函数，将高德地图接口结果当成参数
     */
    getDetailLocation(lng, lat, cb) {
      const self = this
      // // 这里通过高德 SDK 完成。
      const geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      geocoder.getAddress([lng, lat], function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            self.address = result.regeocode.formattedAddress
            // 将位置信息传出去
            cb(result.regeocode)
            self.$nextTick()
          }
        }
      })
    },
    onSearchResult(pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        let center = [lngSum / pois.length, latSum / pois.length]
        this.center = center
        this.marker.position = center
      }
    },
    setGps(gps) {
      if (!gps) {
        return
      }
      const self = this
      const location = gps.split(',')
      this.center = location
      this.marker.position = location
      this.getDetailLocation(location[0], location[1], addr => {
        const address = addr.formattedAddress
        self.address = address
      })
    }
  },
  watch: {
    gps(val) {
      this.setGps(val)
    }
  },
  created() {
    this.setGps(this.gps)
  }
}
</script>

<style lang='scss' scoped>
.amap-page-container {
  height: 500px;
  position: relative;
  .search-box {
    position: absolute;
    top: 25px;
    left: 20px;
  }
  .amap-demo {
    height: calc(100% - 40px);
  }
  .toolbar {
    height: 40px;
  }
}
</style>
