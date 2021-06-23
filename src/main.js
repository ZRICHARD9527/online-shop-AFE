import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './plugins/element.js'
import VueWechatTitle from 'vue-wechat-title'
import  globalUrl from './config/global.js'

Vue.use(VueWechatTitle)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.GLOBAL = globalUrl;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
