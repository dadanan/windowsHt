<template>
  <div>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin">
        <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
import { queryDevicePosition } from '@/api/device/list'

export default {
  props: ['id'],
  data() {
    return {
      zoom: 15,
      center: [116.404, 39.915],
      marker: {
        position: [116.404, 39.915],
        events: {
          click: () => {
            if (this.mywindow.visible === true) {
              this.mywindow.visible = false
            } else {
              this.mywindow.visible = true
            }
          },
          dragend: e => {
            this.markers.position = [e.lnglat.lng, e.lnglat.lat]
          }
        },
        visible: true,
        draggable: false
      },
      mywindow: {
        position: [116.404, 39.915],
        content:
          '<h4>该点数据信息</h4><div class="text item">Information A: ...</div><div class="text item">Information B: ...</div>',
        visible: true,
        events: {
          close() {
            this.mywindow.visible = false
          }
        }
      },
      plugin: {
        pName: 'Scale',
        events: {
          init(instance) {
            console.log(instance)
          }
        }
      }
    }
  },
  methods: {
    queryDevicePosition(id) {
      queryDevicePosition(id).then(res => {
        const data = res.data
        const position = [data.pointX, data.pointY]
        this.center = position
        this.marker.position = position
        this.mywindow.position = position
      })
    }
  },
  watch: {
    id(val) {
      this.queryDevicePosition(id)
    }
  },
  created() {
    this.queryDevicePosition(this.id)
  }
}
</script>

<style scoped>
.amap-page-container {
  height: 500px;
}
</style>
