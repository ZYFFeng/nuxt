import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    windowSize: {
      x: 0,
      y: 0
    }
  },
  mutations: {
    changeWindowSize (state, payload) {
      state.windowSize = payload
    }
  }
})

export default store