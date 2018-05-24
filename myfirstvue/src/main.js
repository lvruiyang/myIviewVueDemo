// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from '@/router/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from '@/vuex/store';
import $ from 'jquery'
Vue.use(iView);
Vue.config.productionTip = false;
import axios from '@/api/axios'
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
