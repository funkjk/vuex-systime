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
    <input type="text" :value="offsetTime" @blur="updateOffset"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'HelloWorld',
  computed: {
    ...mapState('dt2', ['systemTime', 'localTime', 'offsetTime'])
  },
  data () {
    return {
    }
  },
  methods: {
    format (dt) {
      return moment(dt).toISOString(true)
    },
    updateOffset (evt) {
      const offsetTime = Number(evt.srcElement.value)
      this.$store.dispatch('dt2/updateOffsetTime', offsetTime)
    }
  }
}
</script>

<style scoped>

</style>
