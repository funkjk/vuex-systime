
import Vue from 'vue'
import Vuex from 'vuex'
import datetime from '@/vuex-systime.js'

Vue.config.productionTip = false
Vue.use(Vuex)

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const dt1 = datetime({'moduleName': 'dt1', cutoffTime: 1000 * 60})
    const dt2 = datetime({'moduleName': 'dt2'})

    const store = new Vuex.Store(
      {
        plugins: [dt1, dt2]
      }
    )

    expect(store.state.dt1.offsetTime)
      .toEqual(0)
  })
})
