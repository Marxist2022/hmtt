import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import Vant from 'vant'
// import 'vant/lib/index.css'
// 引入vant全部样式
import 'vant/lib/index.less'

import '@/styles/reset.less'
import '@/styles/icon.less'
import '@/styles/index.less'

import * as obj from '@/filters/index'

import FollowUser from '@/components/FollowUser.vue'
import '@/components'
Vue.component(FollowUser.name, FollowUser)
// Vue.component(组件名字, 组件对象)

Vue.config.productionTip = false
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
