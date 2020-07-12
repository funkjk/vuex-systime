<template>
  <div class="hello">
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
    <input value="sync" type="button" @click="sync"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  computed: {
    ...mapState('dt1', ['systemTime', 'localTime', 'offsetTime'])
  },
  data () {
    return {
    }
  },
  methods: {
    format (dt) {
      return moment(dt).toISOString(true)
    },
    async sync () {
      const requestTime = Date.now() / 1000
      const {data} = await axios.get('https://ntp-a1.nict.go.jp/cgi-bin/json?' + requestTime)
      const now = Date.now() / 1000
      // 通信時間などは無視し、レスポンス受け取り時の時間との比較をする
      const offsetTime = data.st * 1000 - now * 1000
      this.$store.dispatch('dt1/updateOffsetTime', offsetTime)
    }
  }
}
</script>

<style scoped>

</style>
