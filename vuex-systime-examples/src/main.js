// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VuexSystime from 'vuex-systime'

Vue.config.productionTip = false
Vue.use(Vuex)

const dt1 = VuexSystime({'moduleName': 'dt1', cutoffTime: 1000 * 60})
const dt2 = VuexSystime({'moduleName': 'dt2'})

const store = new Vuex.Store(
  {
    plugins: [dt1, dt2]
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})
