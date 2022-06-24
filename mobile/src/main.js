import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/style/common.scss'
import { Lazyload } from 'vant'
import defaultSettings from '@/settings'
import './style/vant-ui.scss'
import './utils/permission.js'
import goBack from '@/components/goBack'
import KdHeader from '@/components/header'

// options 为可选参数，无则不传
Vue.use(Lazyload)

Vue.component('goBack', goBack)
Vue.component('KdHeader', KdHeader)

Vue.component('svg-icon', SvgIcon)
if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
