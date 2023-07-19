
<template>
    <div class="common-layout">
        <el-container>
            <el-header style="z-index: 9;">
                <!-- <el-menu :default-active="menu.activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                @select="handleSelect" background-color="#0000064" text-color="#fff" active-text-color="#02ffff">
                <div class="flex-grow" />
                <template v-for="menu in menu.routes" :key="menu.path">
                    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length">
                        <template #title>
                            <span>{{ menu.meta.name }}</span>
                        </template>
                        <template v-for="item in menu.children" :key="item.path">
                            <el-menu-item :index="item.path" @click="navto(item)">
                                <span>{{ item.meta.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                    <el-menu-item :index="menu.path" @click="navto(menu)" v-else>
                        <span>{{ menu.meta.name }}</span>
                    </el-menu-item>
                </template>
            </el-menu> -->
                <div class="head">
                    <div class="sidetext">作战时间：{{ formatted }}</div>
                    <div class="maintitle">三维数字沙盘</div>
                    <div class="sidetext"></div>
                </div>
                <dv-decoration5 :dur="2" style="width:60vw; height:80px;margin: 0 auto;"></dv-decoration5>
            </el-header>

            <el-main class="mainbody">
                <router-view></router-view>
            </el-main>
            <el-footer>
                <div class="circle">
                    <div class="home" @click="showMenu = !showMenu">home</div>
                    <div :class="[showMenu ? '' : 'hidden', 'menu_cell menu1']">1</div>
                    <div :class="[showMenu ? '' : 'hidden', 'menu_cell menu2']">2</div>
                    <div :class="[showMenu ? '' : 'hidden', 'menu_cell menu3']">3</div>
                    <div :class="[showMenu ? '' : 'hidden', 'menu_cell menu4']">4</div>
                    <div :class="[showMenu ? '' : 'hidden', 'menu_cell menu5']">5</div>
                </div>
                <div class="center">
                    <dv-border-box13 backgroundColor="#02556999">
                        <div>右边菜单</div>
                    </dv-border-box13>
                    <dv-border-box13  style="transform: rotateY(180deg)" backgroundColor="#02556999">
                        <div style="transform: rotateY(180deg)">左边菜单</div>
                    </dv-border-box13>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>
<script lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMenu } from '../../store/menu'
import { useNow, useDateFormat } from '@vueuse/core'
export default {
    name: 'public',
    setup() {
        const count = ref(0)
        const state = reactive({
            routerList: [],
            showMenu: false
        })
        const activeIndex = ref('1')
        const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
        const menu = useMenu()
        const handleSelect = (key: string, keyPath: string) => {
            console.log(key, keyPath)
        }
        const router = useRouter()
        const navto = (item: any) => {
            router.push(item.path)
            menu.activeIndex = item.path
        }
        onMounted(() => {
            let currentPath = router.currentRoute.value.path
            if (currentPath === "/") {
                router.push('/home')
                menu.activeIndex = '/home'
            } else {
                menu.activeIndex = currentPath
            }
            setTimeout(() => {
                state.showMenu = true
            }, 500);
        })
        return {
            ...toRefs(state),
            count,
            activeIndex,
            handleSelect,
            navto,
            menu,
            formatted
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
.center{
    position: absolute;
    z-index: 9;
    bottom: 0;
    left: calc(50% - 400px);
    color: #fff;
    height: 80px;
    width: 800px;
    display: flex;
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
        line-height: 80px;
        border: 1px solid #025569;
        cursor: pointer;

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
        line-height: 38px;
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
}</style>