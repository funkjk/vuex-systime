# vuex-systime


A [Vuex](https://vuex.vuejs.org) plugin which provide reactive system time property which calculate just after N seconds.
If you use set offset time which is diff between server time and client time, calculate system time by local time and offset time.

## Feature
- provide reactive system time.
- system time is calculated by offset time( diff between server time and client time).
- calculate system time, just after N seconds(*1). not interval.

*1 just after N seconds means if you want to system time which has minute(dont use sec), this plugin work after just change minutes.

~~~
set cutoffTime to 60 second.
calculate after 16:00:00.000
~~ dont calculate ~~
calculate after 16:01:00.000

~~~

## Usage
Install the plugin via NPM.
```
npm install vuex-systime
```
Import the plugin in your Vuex store definition.
```javascript
import VuexSystime from 'vuex-systime'

// initialize plugin using parameter(cutoffTime,moduleName)
const systime = VuexSystime({cutoffTime: 1000 * 60})
// initialize vuex store using 'vuex-systime' plugin
export default new Vuex.Store({
  modules: {...},
  mutations: {...},
  getters: {...},
  plugins: [systime]
})

```
Then you will be abble to map the Vuex variable into your component.
```html
<template>
Current time is {{ systemTime }}
</template>
```
```javascript
import { mapState } from 'vuex'
export default {
    name: 'Your Component',
    data () {
        return { ... }
    },
    computed: {
        ...mapState('systime', ['systemTime'])
    },
    methods: {
        async sync () {
        const requestTime = Date.now() / 1000
        const {data} = await axios.get('https://ntp-a1.nict.go.jp/cgi-bin/json?' + requestTime)
        const now = Date.now() / 1000
        const offsetTime = data.st * 1000 - now * 1000
        // You can set offset time by server time
        this.$store.dispatch('systime/updateOffsetTime', offsetTime)
        }
    }
}