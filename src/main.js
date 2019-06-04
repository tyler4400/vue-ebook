import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import './assets/styles/icon.css'// 图标
import './assets/styles/global.scss' // css

// 字体
// import './assets/fonts/cabin.css'
// import './assets/fonts/daysOne.css'
// import './assets/fonts/montserrat.css'
// import './assets/fonts/tangerine.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
