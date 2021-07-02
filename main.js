import Vue from 'vue'
import App from './App'
import Common from '@/common/common.js'; //引入全局通用属性和方法

import './common/index.scss'
Vue.prototype.common = new Common() //创建并挂载属性和方法


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
