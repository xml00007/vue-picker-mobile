import Vue from 'vue'
import App from './App.vue'
import VuePickerMobile from 'vue-picker-mobile'

Vue.config.productionTip = false

Vue.use(VuePickerMobile)

new Vue({
  render: h => h(App),
}).$mount('#app')
