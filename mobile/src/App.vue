<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router"></router-view>
    </transition>
  </div>
</template>
<script>
import defaultSetting from './settings'
export default {
  name: 'app',
  computed: {
    transitionName () {
      if (defaultSetting.needPageTrans) {
        return this.$store.getters.direction
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ffffff;
}

.router {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background-color: #fff;
}

.dis {
  display: flex;
  width: 200px;
  height: 200px;
}
</style>
