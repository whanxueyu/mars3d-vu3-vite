
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css"
import "mars3d/dist/mars3d.css"
import "./static/divGraphic.css"
import { createApp } from 'vue'
import App from './App.vue'
import "./static/style.css"
import pinia from './store'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import DataVVue3 from '@kjgl77/datav-vue3'

let app = createApp(App)
app.use(ElementPlus)
app.use(DataVVue3);
app.use(router)
app.use(pinia)
app.mount('#app')
