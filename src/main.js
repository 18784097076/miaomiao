import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// 处理图片url
Vue.filter('setWH', (imgurl, w, h) => {
  return imgurl.replace(/w\.h\//, '') + `@1l_1e_1c_${w}w_${h}h`
})

// 判断显示2d还是3d的小图标
Vue.filter('versionType', (value) => {
  if (value == 'v2d imax') {
    return require('@/assets/2d.png')
  } else if (value == 'v3d imax') {
    return require('@/assets/3d.png')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
