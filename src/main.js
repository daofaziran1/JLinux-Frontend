import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as echarts from 'echarts'; 
require("./mock")
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts; 
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
