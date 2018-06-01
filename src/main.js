// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import dayjs from 'dayjs'

// import {TimePicker, DatePicker,Pagination,Table} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$http = axios
Vue.prototype.$day = dayjs
axios.defaults.baseURL = 'http://10.172.246.231:9099'
Vue.config.productionTip = false
// Vue.use(TimePicker)
// Vue.use(DatePicker)
// Vue.use(Pagination)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
