(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vuex-systime", [], factory);
	else if(typeof exports === 'object')
		exports["vuex-systime"] = factory();
	else
		root["vuex-systime"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VuexSystemDatetime; });
/* harmony import */ var _vuex_systime_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


function VuexSystemDatetime (param) {
  return store => {
    const datetimeStore = Object(_vuex_systime_store__WEBPACK_IMPORTED_MODULE_0__["systemDatetimeStore"])()

    let moduleName = 'systime'
    const attribute = Object.assign({}, param)
    if (attribute.moduleName) {
      moduleName = attribute.moduleName
    }
    datetimeStore.state.moduleName = moduleName
    _vuex_systime_store__WEBPACK_IMPORTED_MODULE_0__["moduleParameter"][moduleName] = {timeoutID: null, attribute}

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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moduleParameter", function() { return moduleParameter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemDatetimeStore", function() { return systemDatetimeStore; });

const moduleParameter = {}
const systemDatetimeStore = () => { return {
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

/***/ })
/******/ ]);
});