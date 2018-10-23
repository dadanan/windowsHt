<template>
  <div>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin">
        <!-- <el-amap-info-window :position="mywindow.position" :content="mywindow.content" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window> -->
        <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<style>
.amap-page-container {
  height: 500px;
}
</style>


<script>
import VueAMap from 'vue-amap'
const position = [116.404, 39.915]
export default {
  data() {
    return {
      zoom: 15,
      center: position,
      marker: {
        position: position,
        events: {
          click: () => {
            if (this.mywindow.visible === true) {
              this.mywindow.visible = false
            } else {
              this.mywindow.visible = true
            }
          },
          dragend: e => {
            this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
          }
        },
        visible: true,
        draggable: false
      },
      mywindow: {
        position: position,
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
  }
}
</script>