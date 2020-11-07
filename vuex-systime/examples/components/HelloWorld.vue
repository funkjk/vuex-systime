<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2>now</h2>
    <table>
      <tr>
        <td>system:</td>
        <td>{{ format(systemTime) }}</td>
      </tr>
      <tr>
        <td>local:</td>
        <td>{{ format(localTime) }}</td>
      </tr>
      <tr>
        <td>offset:</td>
        <td>{{ offsetTime }}</td>
      </tr>
    </table>
    <input value="sync" type="button" @click="sync">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  computed: {
    systemDatetime () {
      return moment(this.now).toISOString()
    },
    ...mapState('dt1', ['systemTime', 'localTime', 'offsetTime'])
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    format (dt) {
      return moment(dt).toISOString()
    },
    async sync () {
      const now = Date.now() / 1000
      const {data} = await axios.get('https://ntp-a1.nict.go.jp/cgi-bin/json?' + now)
      const offsetTime = data.st * 1000 - now * 1000
      this.$store.dispatch('dt1/updateOffsetTime', offsetTime)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
