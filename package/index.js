// 导入单个组件
import VuePickerMobile from './lib/Picker.vue'


// 定义 install 方法
let obj ={
    VuePickerMobile
}
obj.install  = function (Vue) {
    Vue.component(VuePickerMobile.name, VuePickerMobile)
}
if (typeof window !== 'undefined' && window.Vue) {
    obj.install(window.Vue)
}

export default obj