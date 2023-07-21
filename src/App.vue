<template>
  <div class="app-content">
    <router-view></router-view>
  </div>
  <MarsMap :url="configUrl" map-key="test" @onload="marsOnload" />
</template>
<!-- todo:将map 传参 provide 其他页面reject接收  路径贴地线，各种计算测量，军标 -->
<script lang="ts">
import * as mars3d from "mars3d";
import { provide, ref } from 'vue'
import MarsMap from "./components/mars-work/mars-map.vue";
export default {
  components: {
    MarsMap
  },
  setup() {
    const configUrl = "config/config.json";
    const map = ref<any>();
    var option: any;
    const marsOnload = (mapInstance: any) => {
      map.value = mapInstance
      const graphicLayer = new mars3d.layer.GraphicLayer();
      map.value.addLayer(graphicLayer);
      // 2.在layer上绑定监听事件
      graphicLayer.on(mars3d.EventType.click, function (event: any) {
        console.log("监听layer，单击了矢量对象", event);
      });
      graphicLayer.on(mars3d.EventType.mouseOver, function (event: any) {
        console.log("监听layer，鼠标移入了矢量对象", event);
      });
      graphicLayer.on(mars3d.EventType.mouseOut, function (event: any) {
        console.log("监听layer，鼠标移出了矢量对象", event);
      });
      // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
      graphicLayer.bindContextMenu([
        {
          text: "删除对象",
          callback: function (e: any) {
            const graphic = e.graphic;
            if (graphic) {
              graphicLayer.removeGraphic(graphic);
            }
          },
        },
      ]);
    };
    provide('name', map)
    return {
      map,
      configUrl,
      marsOnload,
    }
  }
}
</script>

<style scoped>
.app-content {
  position: absolute;
  width: 100vw;
  height: 100vh;
  border: 0;
  outline: 0;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}
</style>
