import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    // 重定向
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      // 主页页面
      { path: 'video', component: Video },
      // 问答界面
      { path: 'question', component: Question },
      // 我的界面
      { path: 'my', component: My }]
  },
  {
    // 登录界面
    path: '/login', component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
