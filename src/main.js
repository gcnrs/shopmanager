// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Http from './plugins/http'
import router from './router'
import moment from 'moment'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/index.css';


// 处理日期格式
Vue.filter('fmtDate',(v)=> {
  return moment(v).format('YYYY--MM-DD')
})

// 自己封装的axios插件
Vue.use(Http);
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
