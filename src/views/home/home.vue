
<template>
    <div class="common-layout">
        <el-button>按钮</el-button>
    </div>
</template>
<script lang="ts">
import { onMounted, onUnmounted, reactive, ref, toRefs, inject } from 'vue'
import * as mars3d from "mars3d";
import { useRouter } from 'vue-router'
import { HomeFilled, Expand, PieChart, ChatDotSquare, Place, SwitchButton } from '@element-plus/icons-vue'
export default {
    components: {
        HomeFilled, Expand, PieChart, ChatDotSquare, Place, SwitchButton
    },
    name: 'public',
    setup() {
        const map: any = inject('name')
        console.log("map", map)
        const count = ref(0)
        const state = reactive({
            routerList: [],
            showMenu: false
        })
        const router = useRouter()
        var maskLayer: any;
        var wallLayer: any;
        let index = 0
        const arrColor = ["rgb(15,176,255)", "#ff5F50", "#f024E4", "#42B2BE", "rgb(251,176,104)", "#ffff00", "rgb(0,244,188)", '#754667']
        const addMaskGraphics = () => {
            maskLayer = new mars3d.layer.GeoJsonLayer({
                name: "天津",
                url: "https://geo.datav.aliyun.com/areas_v3/bound/120000_full.json",
                symbol: {
                    type: "polygon",
                    styleOptions: {
                        materialType: mars3d.MaterialType.PolyGradient, // 效果：中间区域渐变透明
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
                            scaleByDistance_near: 5000,
                            scaleByDistance_nearValue: 1
                        }
                    },
                    callback: function (attr, styleOpt) {
                        return {
                            materialOptions: {
                                color: getColor()
                            },
                            height: 1000,
                            diffHeight: 10
                        }
                    }
                },
                popup: "{name}",
                flyTo: true,
            })
            map.value.addLayer(maskLayer)
            // 绑定事件
            maskLayer.on(mars3d.EventType.load, function (event: any) {
                console.log("数据加载完成", event)
            })
            maskLayer.on(mars3d.EventType.click, function (event: any) {
                console.log("单击了图层", event)
            })
        }

        const getColor = () => {
            return arrColor[++index % arrColor.length]
        }
        const showBoundaryWall = () => {
            wallLayer = new mars3d.layer.GeoJsonLayer({
                name: "天津",
                url: "https://geo.datav.aliyun.com/areas_v3/bound/120000_full.json",
                symbol: {
                    type: "wall",
                    styleOptions: {
                        diffHeight: 1000, // 墙高
                        materialType: mars3d.MaterialType.LineFlow,
                        materialOptions: {
                            color: "#00ffff", // 颜色
                            opacity: 0.6, // 透明度
                            image: "img/textures/fence.png", // 图片
                            repeatX: 2, // 重复数量
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
                // popup: "{name}"
                // "tooltip": "{name}",
                // flyTo: true,
            })
            map.value.addLayer(wallLayer)

            // 绑定事件
            wallLayer.on(mars3d.EventType.load, function (event: any) {
                console.log("数据加载完成", event)
            })
            wallLayer.on(mars3d.EventType.click, function (event: any) {
                console.log("单击了图层", event)
            })
        }
        onMounted(() => {
            showBoundaryWall()
            addMaskGraphics()
        })
        onUnmounted(() => {
            console.log("home卸载")
            if (wallLayer) {
                wallLayer.clear()
            }
            if (maskLayer) {
                maskLayer.clear()
            }

        })
        return {
            ...toRefs(state),
            count,
            map,
            addMaskGraphics,
            showBoundaryWall
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