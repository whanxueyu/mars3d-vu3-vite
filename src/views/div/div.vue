
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
            const graphic = new mars3d.graphic.DivGraphic({
                position: [117.291611, 39.908068, 75.5],
                style: {
                    html: `<div class="marsBlackPanel  animation-spaceInDown">
                                <div class="marsBlackPanel-text">某某巡逻部队</div>
                            </div>`,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 400000), // 按视距距离显示
                    clampToGround: true,
                    // 高亮时的样式
                    highlight: {
                        // type: mars3d.EventType.click,
                        className: "marsBlackPanel-highlight"
                    }
                },
                attr: { remark: "示例1" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        // 一个渐变的文本面板,中间竖直连线
        const addDemoGraphic2 = () => {
            const graphic = new mars3d.graphic.DivGraphic({
                position: [117.210732, 39.0903786, 176.4],
                style: {
                    html: `<div class="marsBlueGradientPnl">
                                <div>某某驻地</div>
                            </div>`,
                    offsetY: -60,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 400000), // 按视距距离显示

                    // 高亮时的样式
                    highlight: {
                        type: mars3d.EventType.click,
                        className: "marsBlueGradientPnl-highlight"
                    }
                },
                attr: { remark: "示例2" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        //
        const addDemoGraphic3 = () => {
            const graphic = new mars3d.graphic.DivGraphic({
                position: [117.110075, 39.19609, 237.4],
                style: {
                    html: `<div class="marsGreenGradientPnl" >三维数字沙盘</div>`,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM

                    // 高亮时的样式
                    // highlight: {
                    //   type: mars3d.EventType.click,
                    //   className: "marsGreenGradientPnl-highlight"
                    // }
                },
                attr: { remark: "示例3" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        // 添加GIF图标，DIV方式
        const addDemoGraphic4 = () => {
            const graphic = new mars3d.graphic.DivGraphic({
                position: [117.150732, 39.1403786, 289],
                style: {
                    html: '<img src="img/icon/tf.gif" style="width:50px;height:50px;" ></img>',
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER
                },
                attr: { remark: "示例4" },
                pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
            })
            graphicLayer.value.addGraphic(graphic)
        }

        // 加css动画的扩散点 DivLightPoint
        const addDemoGraphic5 = () => {
            const graphic = new mars3d.graphic.DivLightPoint({
                position: [117.1630276, 39.13813],
                style: {
                    color: "#f33349",
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                },
                attr: { remark: "示例5" },
                popup: "测试popup"
            })
            graphicLayer.value.addGraphic(graphic)
        }

        // 内置扩展的动态文本 DivBoderLabel
        const addDemoGraphic6 = () => {
            const graphic = new mars3d.graphic.DivBoderLabel({
                position: [117.160732, 39.133786, 781],
                style: {
                    text: "三维数字沙盘",
                    font_size: 15,
                    font_family: "微软雅黑",
                    color: "#ccc",
                    boderColor: "#15d1f2"
                },
                attr: { remark: "示例6" }
            })
            graphicLayer.value.addGraphic(graphic)
        }

        // 内置扩展的竖立文本 DivBoderLabel
        const addDemoGraphic7 = () => {
            const graphic = new mars3d.graphic.DivUpLabel({
                position: [117.157136, 39.09723, 914.6],
                style: {
                    text: "我是竖立的文本",
                    color: "#fff",
                    font_size: 16,
                    font_family: "微软雅黑",
                    lineHeight: 60,
                    circleSize: 8,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000) // 按视距距离显示
                },
                attr: { remark: "示例7" }
            })
            graphicLayer.value.addGraphic(graphic)
            console.log('我是竖立的文本')
        }

        // 类似popup/toolitp的自定义html
        const addDemoGraphic8 = () => {
            const graphic = new mars3d.graphic.Popup({
                position: [117.146461, 39.138012, 395.1],
                style: {
                    html: `这里可以放入任意html代码<br /> Popup和Tooltip也是继承自DivGraphic<br /> {name} {remark}`,
                    templateEmptyStr: " - ",
                    closeButton: false,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示

                    // 高亮时的样式
                    highlight: {
                        type: mars3d.EventType.click,
                        className: "mars3d-template-highlight"
                    }
                },
                attr: { remark: "示例8" }
            })
            graphicLayer.value.addGraphic(graphic)
            console.log('这里可以放入任意html代码')
        }

        // 倾斜指向左下角的面板样式
        const addDemoGraphic9 = () => {
            const graphic = new mars3d.graphic.DivGraphic({
                position: [117.17510232, 39.1103786, 1230],
                style: {
                    html: `<div class="marsTiltPanel marsTiltPanel-theme-red">
                            <div class="marsTiltPanel-wrap">
                                <div class="area">
                                    <div class="arrow-lt"></div>
                                    <div class="b-t"></div>
                                    <div class="b-r"></div>
                                    <div class="b-b"></div>
                                    <div class="b-l"></div>
                                    <div class="arrow-rb"></div>
                                    <div class="label-wrap">
                                        <div class="title">火星水厂</div>
                                        <div class="label-content">
                                            <div class="data-li">
                                                <div class="data-label">实时流量：</div>
                                                <div class="data-value"><span id="lablLiuliang" class="label-num">39</span><span class="label-unit">m³/s</span>
                                                </div>
                                            </div>
                                            <div class="data-li">
                                                <div class="data-label">水池液位：</div>
                                                <div class="data-value"><span id="lablYeWei"  class="label-num">10.22</span><span class="label-unit">m</span>
                                                </div>
                                            </div>
                                            <div class="data-li">
                                                <div class="data-label">水泵状态：</div>
                                                <div class="data-value">
                                                    <span id="lablSBZT1"  class="label-tag data-value-status-1" title="中间状态">1号</span>
                                                    <span id="lablSBZT2"  class="label-tag data-value-status-0" title="关闭状态">2号</span>
                                                    </div>
                                            </div>
                                            <div class="data-li">
                                                <div class="data-label">出水阀门：</div>
                                                <div class="data-value">
                                                    <span id="lablCSFM1"   class="label-tag data-value-status-1" title="中间状态">1号</span>
                                                    <span id="lablCSFM2"   class="label-tag data-value-status-2" title="打开状态">2号</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="b-t-l"></div>
                                <div class="b-b-r"></div>
                            </div>
                            <div class="arrow" ></div>
                        </div>`,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
                    scaleByDistance: new Cesium.NearFarScalar(1000, 1.0, 200000, 0.2),
                    clampToGround: true
                },
                attr: { remark: "示例9" },
                pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
            })
            graphicLayer.value.addGraphic(graphic)

            // 刷新局部DOM,不影响面板的其他控件操作
            // [建议读取到后端接口数据后主动去修改DOM，比下面演示的实时刷新效率高些]
            graphic.on(mars3d.EventType.postRender, function (event) {
                const container = event.container // popup对应的DOM

                const lablLiuliang = container.querySelector("#lablLiuliang")
                if (lablLiuliang) {
                    lablLiuliang.innerHTML = (Math.random() * 100).toFixed(0) // 测试的随机数
                }

                const lablYeWei = container.querySelector("#lablYeWei")
                if (lablYeWei) {
                    lablYeWei.innerHTML = mars3d.Util.formatDate(new Date(), "ss.S") // 测试的随机数
                }
            })
        }

        // 倾斜指向左下角的面板样式
        const addDemoGraphic10 = () => {
            const graphic = new mars3d.graphic.DivGraphic({
                position: [117.228043, 39132207],
                style: {
                    html: `<div class="marsTiltPanel marsTiltPanel-theme-green">
                            <div class="marsTiltPanel-wrap">
                                <div class="area">
                                    <div class="arrow-lt"></div>
                                    <div class="b-t"></div>
                                    <div class="b-r"></div>
                                    <div class="b-b"></div>
                                    <div class="b-l"></div>
                                    <div class="arrow-rb"></div>
                                    <div class="label-wrap">
                                        <div class="title">大别山水厂</div>
                                        <div class="label-content">
                                            <div class="data-li">
                                                <div class="data-label">实时流量：</div>
                                                <div class="data-value"><span class="label-num">99</span><span class="label-unit">m³/s</span>
                                                </div>
                                            </div>
                                            <div class="data-li">
                                                <div class="data-label">水池液位：</div>
                                                <div class="data-value"><span class="label-num">20.02</span><span class="label-unit">m</span>
                                                </div>
                                            </div>
                                            <div class="data-li">
                                                <div class="data-label">水泵状态：</div>
                                                <div class="data-value"><span class="label-tag data-value-status-1" title="中间状态">1号</span><span
                                                        class="label-tag data-value-status-0" title="关闭状态">2号</span></div>
                                            </div>
                                            <div class="data-li">
                                                <div class="data-label">出水阀门：</div>
                                                <div class="data-value"><span class="label-tag data-value-status-1" title="中间状态">1号</span><span
                                                        class="label-tag data-value-status-2" title="打开状态">2号</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="b-t-l"></div>
                                <div class="b-b-r"></div>
                            </div>
                            <div class="arrow" ></div>
                        </div>`,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
                    scaleByDistance: new Cesium.NearFarScalar(1000, 1.0, 200000, 0.2),
                    clampToGround: true
                },
                attr: { remark: "示例10" },
                pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
            })
            graphicLayer.value.addGraphic(graphic)
            console.log('大别山水厂')

            graphic.testPoint = true // 打开测试点，与DIV点进行对比位置调整css
        }

        // 倾斜指向左下角的面板样式
        const addDemoGraphic11 = () => {
            const graphic = new mars3d.graphic.DivGraphic({
                position: Cesium.Cartesian3.fromDegrees(117.186926, 39.135346, 457.5),
                style: {
                    html: `<div class="marsTiltPanel marsTiltPanel-theme-blue">
                            <div class="marsTiltPanel-wrap">
                                <div class="area">
                                    <div class="arrow-lt"></div>
                                    <div class="b-t"></div>
                                    <div class="b-r"></div>
                                    <div class="b-b"></div>
                                    <div class="b-l"></div>
                                    <div class="arrow-rb"></div>
                                    <div class="label-wrap">
                                        <div class="title">岳西水厂</div>
                                        <div class="label-content">
                                            <div class="data-li">
                                                <div class="data-label">实时流量：</div>
                                                <div class="data-value"><span class="label-num">98</span><span class="label-unit">m³/s</span>
                                                </div>
                                            </div>
                                            <div class="data-li">
                                                <div class="data-label">水池液位：</div>
                                                <div class="data-value"><span class="label-num">13.14</span><span class="label-unit">m</span>
                                                </div>
                                            </div>
                                            <div class="data-li">
                                                <div class="data-label">水泵状态：</div>
                                                <div class="data-value">
                                                    <span id="btn-status1" class="label-tag data-value-status-1" title="中间状态">1号</span>
                                                    <span id="btn-status2" class="label-tag data-value-status-0" title="关闭状态">2号</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="b-t-l"></div>
                                <div class="b-b-r"></div>
                            </div>
                            <div class="arrow" ></div>
                        </div>`,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 200000) // 按视距距离显示
                },
                attr: { remark: "示例11" }
                
            })
            graphic.on(mars3d.EventType.add, function (event) {
                const container = event.graphic.container // popup对应的DOM

                const btnStatus1 = container.querySelector("#btn-status1")
                if (btnStatus1) {
                    btnStatus1.addEventListener("click", (e:any) => {
                        e.stopPropagation()
                        console.log("您单击了1号水泵")
                    })
                }

                const btnStatus2 = container.querySelector("#btn-status2")
                if (btnStatus2) {
                    btnStatus2.addEventListener("click", (e:any) => {
                        e.stopPropagation()
                        console.log("您单击了2号水泵")
                    })
                }
            })
            graphicLayer.value.addGraphic(graphic)

            // movePoint(graphic) // 动画移动示例
        }
        const movePoint = (graphic:any) => {
            map.clock.shouldAnimate = true

            // 动画移动
            const property = new Cesium.SampledPositionProperty()
            property.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD

            const time = 20 // 移动的时长 ，秒
            let tempTime

            // 起点
            const startPoint = Cesium.Cartesian3.fromDegrees(117.186926, 39.135346, 457.5)
            tempTime = map.clock.currentTime // 飞行开始时间
            property.addSample(tempTime, startPoint)

            // 移动到的第1个目标点
            const point1 = Cesium.Cartesian3.fromDegrees(117.211439, 39.16485, 423.7)
            tempTime = Cesium.JulianDate.addSeconds(tempTime, time, new Cesium.JulianDate())
            property.addSample(tempTime, point1)

            // 移动到的第2个目标点
            const point2 = Cesium.Cartesian3.fromDegrees(117.1763081, 39.1786585, 85)
            tempTime = Cesium.JulianDate.addSeconds(tempTime, time, new Cesium.JulianDate())
            property.addSample(tempTime, point2)

            // 移动到的第3个目标点
            const point3 = Cesium.Cartesian3.fromDegrees(117.186926, 39.135346, 457.5)
            tempTime = Cesium.JulianDate.addSeconds(tempTime, time, new Cesium.JulianDate())
            property.addSample(tempTime, point3)

            graphic.position = property
        }
        onMounted(() => {
            graphicLayer.value = new mars3d.layer.GraphicLayer()
            map.value.addLayer(graphicLayer.value)

            addDemoGraphic1()
            addDemoGraphic2()
            addDemoGraphic3()
            addDemoGraphic4()
            addDemoGraphic5()
            addDemoGraphic6()
            addDemoGraphic7()
            addDemoGraphic8()
            addDemoGraphic9()
            addDemoGraphic10()
            addDemoGraphic11()
            console.log("mark加载")
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