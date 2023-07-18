import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import pinia from '../store'
import { useMenu } from '../store/menu'
const routes:any = [
    {
        path: '/',
        component: () => import('../views/public/index.vue'),
        meta: {
            hidden:true,
            name:'public'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/home.vue'),
                meta: {
                    name: '首页',
                    hidden:false
                },
            },
        ]
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     component: () => import('../views/404/notFound.vue'),
    //     meta: {
    //         hidden:true,
    //     },
    // }
]
const menu = useMenu(pinia)
menu.routes = routes[0].children
menu.activeIndex = routes[0].children[0].path
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router