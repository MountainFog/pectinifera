import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createLoadingPlugin from 'utils/vuex-loading'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  plugins: [createLoadingPlugin()],
  getters,
  modules
})
