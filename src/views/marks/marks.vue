
<template>
    <div class="common-layout">
        缺少样式、图片等
    </div>
</template>
<script lang="ts">
import { onMounted, reactive, ref, toRefs, inject, onUnmounted } from 'vue'
import * as mars3d from "mars3d";
import { HomeFilled, Expand, PieChart, ChatDotSquare, Place, SwitchButton } from '@element-plus/icons-vue'
export default {
    components: {
        HomeFilled, Expand, PieChart, ChatDotSquare, Place, SwitchButton
    },
    name: 'public',
    setup() {
        const graphicLayer = ref()
        const map: any = inject('name')
        console.log("map", map)
        const count = ref(0)
        const state = reactive({
            routerList: [],
            showMenu: false
        })
        const Cesium = mars3d.Cesium;
        // 一个黑色面板，指向左下角黄色连线
        const addDemoGraphic1 = () => {
            const graphic = new mars3d.graphic.StraightArrow({
                positions: [
                    [117.76314, 38.671648, 440.5],
                    [117.885026, 40.030943, 440.5]
                ],
                style: {
                    color: "#ff0000",
                    opacity: 0.6,
                    outline: true,
                    outlineWidth: 3,
                    outlineColor: "#ffffff",
                    clampToGround: true
                },
                attr: { remark: "示例1" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        const addDemoGraphic2 = () => {
            const graphic = new mars3d.graphic.FineArrow({
                positions: [
                    [118.351476, 38.646825, 286.6],
                    [118.419077, 40.05059, 286.6]
                ],
                style: {
                    color: "#ff0000",
                    opacity: 0.6,
                    outline: true,
                    outlineWidth: 3,
                    outlineColor: "#ffffff",
                    clampToGround: true
                },
                attr: { remark: "示例2" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        const addDemoGraphic3 = () => {
            const graphic = new mars3d.graphic.FineArrowYW({
                positions: [
                    [119.527562, 38.549996, 481.3],
                    [119.645216, 39.987335, 481.3]
                ],
                style: {
                    color: "#ff0000",
                    opacity: 0.6,
                    outline: true,
                    outlineWidth: 3,
                    outlineColor: "#ffffff",
                    clampToGround: true
                },
                attr: { remark: "示例3" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        const addDemoGraphic4 = () => {
            const graphic = new mars3d.graphic.AttackArrow({
                positions: [
                    [119.162167, 38.627124, 206.6],
                    [118.734841, 38.661996, 206.6],
                    [119.136736, 39.175837, 206.6],
                    [119.001217, 40.015687, 206.6]
                ],
                style: {
                    color: "#ff0000",
                    opacity: 0.6,
                    outline: true,
                    outlineWidth: 3,
                    outlineColor: "#ffffff",
                    clampToGround: true
                },
                attr: { remark: "示例4" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        const addDemoGraphic5 = () => {
            const graphic = new mars3d.graphic.AttackArrowYW({
                positions: [
                    [120.472593, 38.475435, 1429.5],
                    [120.859927, 38.410491, 1429.5],
                    [120.874151, 39.09718, 1429.5],
                    [120.709928, 39.883940, 1429.5]
                ],
                style: {
                    materialType: mars3d.MaterialType.PolyGradient,
                    materialOptions: {
                        color: "#ff0000",
                        alphaPower: 0.8,
                        center: new Cesium.Cartesian2(0.5, 0.0)
                    }
                },
                attr: { remark: "示例5" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        const addDemoGraphic6 = () => {
            const graphic = new mars3d.graphic.AttackArrowPW({
                positions: [
                    [120.159212, 38.51614, 0],
                    [120.073352, 39.163911, 0],
                    [120.248902, 39.922699, 0]
                ],
                style: {
                    color: "#ff0000",
                    opacity: 0.6,
                    outline: true,
                    outlineWidth: 3,
                    outlineColor: "#ffffff",
                    clampToGround: true
                },
                attr: { remark: "示例6" }
            })
            graphicLayer.value.addGraphic(graphic)
            map.value.flyTo(graphic)
        }

        const addDemoGraphic7 = () => {
            const graphic = new mars3d.graphic.DoubleArrow({
                positions: [
                    [115.967691, 39.446636],
                    [116.361355, 38.623772],
                    [117.147102, 39.455161],
                    [116.887987, 39.578392],
                    [116.391773, 39.085218]
                ],
                style: {
                    color: "#ff0000",
                    opacity: 0.6,
                    outline: true,
                    outlineWidth: 3,
                    outlineColor: "#ffffff",
                    clampToGround: true
                },
                attr: { remark: "示例7" }
            })
            graphicLayer.value.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo= ()=>
        }

        const addDemoGraphic8 = () => {
            const graphic = new mars3d.graphic.GatheringPlace({
                positions: [
                    [116.76866, 39.79288, 0],
                    [117.336959, 39.678728, 0],
                    [117.363407, 40.203935, 0]
                ],
                style: {
                    materialType: mars3d.MaterialType.PolyGradient,
                    materialOptions: {
                        color: "#ff0000",
                        alphaPower: 0.8
                    },
                    outline: true,
                    outlineWidth: 3,
                    outlineColor: "#ffffff",
                    clampToGround: true
                },
                attr: { remark: "示例8" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        // 该方法演示 自定义点状军标（png或svg图片即可），复杂的也可以Canvas绘制，参考  graphic\entity\billboard-canvas\CanvasBillboard.js
        const addDemoGraphic9 = () => {
            const graphic = new mars3d.graphic.BillboardEntity({
                position: [117.699972, 36.004402],
                style: {
                    image: "img/marker/80800.png",
                    width: 100,
                    height: 100,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // 横向的定位点，LEFT左侧
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM // 竖向的定位点，BOTTOM底部
                },
                attr: { remark: "示例9 - 自定义点状军标" }
            })
            graphicLayer.value.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo= ()=>
        }
        const bindLayerPopup = () => {
            graphicLayer.value.bindPopup(function (event) {
                const attr = event.graphic.attr || {}
                attr["类型"] = event.graphic.type
                attr["来源"] = "我是layer上绑定的Popup"
                attr["备注"] = "我支持鼠标交互"

                return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })
            })
        }

        onMounted(() => {
            graphicLayer.value = new mars3d.layer.GraphicLayer()
            map.value.addLayer(graphicLayer.value)
            
            // const camera = new Cesium.Camera(map.value.scene)
            // camera.setView({
            //     destination: Cesium.Cartesian3.fromDegrees(118.874652, 35.679546, 325828.9),
            //     orientation: { heading: Cesium.Math.toRadians(359.2), pitch: Cesium.Math.toRadians(-39.5) }
            // })

            bindLayerPopup()
            addDemoGraphic1()
            addDemoGraphic2()
            addDemoGraphic3()
            addDemoGraphic4()
            addDemoGraphic5()
            addDemoGraphic6()
            addDemoGraphic7()
            addDemoGraphic8()
            addDemoGraphic9()
            console.log("军标加载")
        })
        onUnmounted(() => {
            graphicLayer.value!.remove()
        })
        return {
            ...toRefs(state),
            count,
            map,
        }
    }
}
</script>
<style scoped lang="scss">
.head {
    position: absolute;
    color: #fff;
    display: flex;
    width: calc(100% - 40px);
    justify-content: space-between;

    .sidetext {
        font-size: 14px;
        width: 250px;
        line-height: 50px;
    }

    .maintitle {
        width: 300px;
        text-align: center;
        font-size: 26px;
        line-height: 50px;
        letter-spacing: 10px;
        font-family: emoji;
    }
}

.center {
    position: absolute;
    z-index: 9;
    bottom: 0;
    left: calc(50% - 400px);
    color: #fff;
    height: 80px;
    width: 800px;
    display: flex;

    .row {
        height: 60px;
        padding: 10px 0;
        display: flex;
        justify-content: space-evenly;

        .icon {
            font-size: 26px;
        }
    }
}

.circle {
    position: absolute;
    z-index: 9;
    bottom: 0;
    left: 0;
    color: #fff;

    .home {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-left: -45%;
        margin-bottom: -45%;
        background-color: #02556999;
        text-indent: 60px;
        line-height: 90px;
        border: 1px solid #025569;
        cursor: pointer;
        font-size: 30px;

        &:hover {
            background-color: #068aac99;
            border: 1px solid #068aac;
        }
    }

    .menu_cell {
        position: absolute;
        border: 1px solid #068aac;
        height: 38px;
        border-radius: 50%;
        width: 38px;
        text-align: center;
        line-height: 42px;
        font-size: 20px;
        cursor: pointer;
        transition: all .5s;
        background-color: #02556999;
        transform: scale(1);
        transition-delay: calc(0.1s* var(--idx));

        &:hover {
            background-color: #068aac99;
            border: 1px solid #068aac;
        }

        &.menu5 {
            --idx: 5;
            left: 100px;
            bottom: 0;
        }

        &.menu4 {
            --idx: 4;
            left: 85px;
            bottom: 35px;
        }

        &.menu3 {
            --idx: 3;
            left: 66px;
            bottom: 66px;
        }

        &.menu2 {
            --idx: 2;
            left: 35px;
            bottom: 85px;
        }

        &.menu1 {
            --idx: 1;
            left: 0px;
            bottom: 100px;

        }

        &.hidden {
            left: -38px;
            bottom: 0px;
            transform: scale(.1);
            transition-delay: calc(0.1s* var(--idx));
        }
    }
}

.menuList {
    display: flex;
    height: 60px;
    line-height: 60px;
}

.menu {
    color: #666;
    margin: 0 60px;
    cursor: pointer;
}

.menu:hover {
    color: #409eff;
}

.flex-grow {
    flex-grow: 1;
}

.el-menu-demo {
    overflow-x: auto;
}
</style>