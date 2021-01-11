
export const moduleParameter = {}
export const systemDatetimeStore = () => { return {
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
        throw new Error('offsetTime is not integer', offsetTime)
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
}