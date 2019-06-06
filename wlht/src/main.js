// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import conf from "./config/index.js";
import http from "./track/http.js";
import store from './store/index.js'
import '../src/components/css/index.scss'
Vue.use(ElementUI);
Vue.prototype.$http = http
Vue.prototype.$conf = conf
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
