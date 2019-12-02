import Vue from 'vue'
import App from './App.vue'
import VuePickerMobile from '../package/index'

Vue.config.productionTip = false

Vue.use(VuePickerMobile)

new Vue({
  render: h => h(App),
}).$mount('#app')
