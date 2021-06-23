import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Manage from '../views/Manage'
import ProList from "../views/ProList";
import AddPro from "../views/AddPro";
import UserList from '../views/UserList'
import UserInfo from "../views/UserInfo";
import ProInfo from "../views/ProInfo";
import Log from '../views/Log'
import Test from '../views/Test'
import Order from '../views/Order'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
        meta: {
            title: "管理员登录"
        },
        show: false
    },
    {
        path: '/manage',
        name: '商品管理',
        component: Manage,
        show: true,
        meta: {
            title: "商城管理"
        },
        children: [
            {
                path: '/proList',
                name: '商品列表',
                show: true,
                meta: {
                    title: "商品列表"
                },
                component: ProList,

            },
            {
                path: '/addPro',
                name: '添加商品',
                show: true,
                meta: {
                    title: "添加商品"
                },
                component: AddPro
            },
            {
                path: '/proInfo',
                name: '商品详情',
                show: false,
                meta: {
                    title: "商品详情"
                },
                component: ProInfo
            }
        ]
    },
    {
        path: '/manageUser',
        name: '用户管理',
        component: Manage,
        show: true,
        children: [
            {
                path: '/userList',
                name: '用户列表',
                show: true,
                meta: {
                    title: "用户列表"
                },
                component: UserList,
            },
            {
                path: '/userInfo',
                name: '用户详情',
                show: false,
                meta: {
                    title: "用户详情"
                },
                component: UserInfo
            },
            {
                path:'/order',
                name:"订单中心",
                show:true,
                meta: {
                    title: "订单中心"
                },
                component:Order
            }
        ]
    },
    {
        path: '/manageLog',
        name: '管理记录',
        component: Manage,
        show: true,
        children: [
            {
                path: '/log',
                name: '管理记录',
                component: Log,
                meta: {
                    title: "管理记录"
                },
                show: true,
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
        show: false
    }
]

const router = new VueRouter({
    routes
})

export default router
