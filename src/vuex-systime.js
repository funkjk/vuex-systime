import {moduleParameter, systemDatetimeStore} from './vuex-systime-store'

export default function VuexSystemDatetime (param) {
  return store => {
    const datetimeStore = JSON.parse(JSON.stringify(systemDatetimeStore))

    let moduleName = 'systime'
    const attribute = Object.assign({}, param)
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
