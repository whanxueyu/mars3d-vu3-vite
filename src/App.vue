<template>
  <div class="app-content">
    <router-view></router-view>
  </div>
  <MarsMap :url="configUrl" map-key="test" @onload="marsOnload" />
</template>
<!-- todo:将map 传参 provide 其他页面reject接收  路径贴地线，各种计算测量，军标 -->
<script setup lang="ts">
import * as mars3d from "mars3d";
import MarsMap from "./components/mars-work/mars-map.vue";
const configUrl = "config/config.json";
var map: any;
const addDemoGraphics = () => {
  const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "天津",
    url: "https://geo.datav.aliyun.com/areas_v3/bound/120000_full.json",
    symbol: {
      type: "polygon",
      styleOptions: {
        materialType: mars3d.MaterialType.PolyGradient, // 效果：中间区域渐变透明
        // materialOptions: {
        //   color: "#3388cc",
        //   opacity: 0.7,
        //   // alphaPower: 1.3
        // },
        outline: false,
        outlineColor: "#ffffff",
        // 面中心点，显示文字的配置
        label: {
          text: "{name}", // 对应的属性名称
          opacity: 1,
          font_size: 25,
          color: "#fff",
          font_family: "楷体",
          outline: true,
          scaleByDistance: true,
          scaleByDistance_far: 20000000,
          scaleByDistance_farValue: 0.1,
          scaleByDistance_near: 1000,
          scaleByDistance_nearValue: 1
        }
      },
      callback: function (attr, styleOpt) {
        return {
          materialOptions: {
            color: getColor()
          },
          height: 100,
          diffHeight: 10
        }
      }
    },
    popup: "{name}"
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  geoJsonLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}
const arrColor = ["rgb(15,176,255)", "#ff5F50", "#f024E4", "#42B2BE", "rgb(251,176,104)", "#ffff00", "rgb(0,244,188)",'#754667']

let index = 0
const getColor = () => {
  return arrColor[++index % arrColor.length]
}

const marsOnload = (mapInstance: any) => {
  map = mapInstance
  const graphicLayer = new mars3d.layer.GraphicLayer();
  map.addLayer(graphicLayer);
  addDemoGraphics()
  showBoundaryWall()

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

  // 加一些演示数据，来源 http://mars3d.cn/editor-vue.html?id=layer-graphic/basis/entity
  // demoData.addDemoGraphic1(graphicLayer);
  // demoData.addDemoGraphic2(graphicLayer);
  // demoData.addDemoGraphic3(graphicLayer);
  // demoData.addDemoGraphic4(graphicLayer);
  // demoData.addDemoGraphic5(graphicLayer);
  // demoData.addDemoGraphic6(graphicLayer);
  // demoData.addDemoGraphic7(graphicLayer);
  // demoData.addDemoGraphic8(graphicLayer);
  // demoData.addDemoGraphic9(graphicLayer);
  // demoData.addDemoGraphic10(graphicLayer);
  // demoData.addDemoGraphic11(graphicLayer);
  // demoData.addDemoGraphic12(graphicLayer);
  // demoData.addDemoGraphic13(graphicLayer);
  // demoData.addDemoGraphic14(graphicLayer);
  // demoData.addDemoGraphic15(graphicLayer);
};

const showBoundaryWall =()=> {
  const graphicLayer = new mars3d.layer.GeoJsonLayer({
    name: "天津",
    url: "https://geo.datav.aliyun.com/areas_v3/bound/120000_full.json",
    symbol: {
      type: "wall",
      styleOptions: {
        diffHeight: 500, // 墙高
        materialType: mars3d.MaterialType.LineFlow,
        materialOptions: {
          color: "#00ffff", // 颜色
          opacity: 0.6, // 透明度
          image: "img/textures/fence.png", // 图片
          repeatX: 1, // 重复数量
          axisY: true, // 竖直方向
          speed: 10 // 速度
        },
        // 高亮时的样式
        highlight: {
          type: "click",
          color: "#ffff00"
        }
      }
    },
    popup: "{name}"
    // "tooltip": "{name}",
    // flyTo: true,
  })
  map.addLayer(graphicLayer)

  // 绑定事件
  graphicLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
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
