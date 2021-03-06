import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
const Article = () => import('@/views/Article')
const User = () => import('@/views/User')
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
      { path: 'my', component: My, name: 'my' }]
  },
  {
    // 登录界面
    path: '/login', component: Login
  },
  {
    // 搜索界面
    path: '/search', component: Search
  },
  // 文章 详情页
  {
    path: '/article/:article_id', component: Article, name: 'article', props: true
  },
  // 文章 详情页
  {
    // 搜索界面
    path: '/user', component: User
  }

]

const router = new VueRouter({
  routes
})

export default router
