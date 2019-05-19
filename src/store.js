import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comment: {}
  },
  getters: {
    getCommentToDisplay (state) {
      return state.comment
    }
  },
  mutations: {
    setSingleComment (state, payload) {
      console.log(`Setting comment in store.`)
      state.comment = Object.assign(state.comment, payload)
    }
  },
  actions: {
    setSingleComment ({ commit }, payload) {
      return new Promise((resolve) => {
        commit(`setSingleComment`, payload)
        resolve()
      })
    }
  }
})
