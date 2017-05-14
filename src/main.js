// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// check if authenticated
Vue.prototype.$check_auth = function (options) {
  console.log('checking authentication')
  return !!localStorage.getItem('id_token')
}

Vue.use(VueResource)
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
