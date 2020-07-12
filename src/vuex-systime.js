import _ from 'lodash'

const moduleParameter = {}
const systemDatetimeStore = {
  namespaced: true,
  state: {
    moduleName: null,
    cutoffTime: 0,
    offsetTime: 0,
    localTime: null,
    systemTime: null
  },
  actions: {
    updateOffsetTime: function ({state, commit, dispatch}, offsetTime) {
      commit('setOffsetTime', offsetTime)
      dispatch('updateTime')
    },
    updateTime: function ({state, commit, dispatch}, param) {
      const now = Date.now()
      const calcTime = now + state.offsetTime
      const timeoutTime = calcTime % state.cutoffTime

      const oldTimeoutId = moduleParameter[state.moduleName].timeoutID
      moduleParameter[state.moduleName].timeoutID = setTimeout(() => {
        dispatch('updateTime')
      }, state.cutoffTime - timeoutTime)
      clearTimeout(oldTimeoutId)

      commit('setLocalTime', now)
      commit('setSystemTime', calcTime)
    }
  },
  mutations: {
    setOffsetTime (state, offsetTime) {
      if (!Number.isInteger(offsetTime)) {
        console.warn('offsetTime is not integer', offsetTime)
        return
      }
      state.offsetTime = offsetTime
    },
    setSystemTime: function (state, time) {
      state.systemTime = time
    },
    setLocalTime: function (state, time) {
      state.localTime = time
    }
  }
}

export default function VuexSystemDatetime (param) {
  return store => {
    const datetimeStore = _.cloneDeep(systemDatetimeStore)

    let moduleName = 'systemTime'
    const attribute = _.assign({}, param)
    if (attribute.moduleName) {
      moduleName = attribute.moduleName
    }
    datetimeStore.state.moduleName = moduleName
    moduleParameter[moduleName] = {timeoutID: null, attribute}

    let cutoffTime = 10 * 1000
    if (attribute.cutoffTime) {
      if (!Number.isInteger(attribute.cutoffTime)) {
        console.warn('cutoffTime is not integer', attribute.cutoffTime)
      } else {
        cutoffTime = attribute.cutoffTime
      }
    } datetimeStore.state.cutoffTime = cutoffTime

    // register the module
    store.registerModule(moduleName, datetimeStore)
    store.dispatch(moduleName + '/updateTime', null, { root: true })
  }
}
