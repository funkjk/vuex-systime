<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="main">
    <ShowTime1/>
    <ShowTime2/>
        </div>

  </div>
</template>

<script>
import ShowTime1 from './components/ShowTime1'
import ShowTime2 from './components/ShowTime2'

export default {
  name: 'App',
  components: {
    ShowTime1,
    ShowTime2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  display: flex;
}

</style>
