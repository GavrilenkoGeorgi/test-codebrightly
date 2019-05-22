import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singleComment: {
      commentTitle: ``,
      commentBody: ``
    },
    allComments: []
  },
  getters: {
    getSingleComment (state) {
      return state.singleComment
    },
    getAllComments (state) {
      return state.allComments
    }
  },
  mutations: {
    setSingleComment (state, payload) {
      // add comment to display on 'read more' page
      Vue.set(state.singleComment = Object.assign(state.singleComment, payload))
    },
    setAllComments (state, payload) {
      // all comments from api
      Vue.set(state.allComments = Object.assign(state.allComments, payload))
    },
    deleteComment (state, id) {
      // delete single comment
      let elementPos = state.allComments.map(comment => comment.id).indexOf(id)
      Vue.set(state.allComments.splice(elementPos, 1))
    },
    updateComment (state, payload) {
      let elementPos = state.allComments.map(comment => comment.id).indexOf(payload.id)
      // remove old comment from store
      Vue.set(state.allComments.splice(elementPos, 1),
      // and add an updated one
        state.allComments.push(payload))
    }
  },
  actions: {
    setSingleComment: async ({ commit }, id) => {
      let { data } = await Vue.http.get(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments/${id}`)
      let comment = {
        commentTitle: data.title,
        commentBody: data.body
      }
      commit(`setSingleComment`, comment)
    },
    setAllComments: async ({ commit }) => {
      let data = await Vue.http.get(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments`)
      let sliceStartIndex = data.body.length
      // show last six comments
      sliceStartIndex -= 6
      let commentsToDisplay = data.body.slice(sliceStartIndex)
      commit(`setAllComments`, commentsToDisplay)
    },
    deleteComment: async ({ commit }, id) => {
      await Vue.http.delete(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments/${id}`)
      commit(`deleteComment`, id)
    },
    updateComment: async ({ commit }, payload) => {
      let newData = {
        created_at: payload.timestamp,
        title: payload.title,
        body: payload.body
      }
      await Vue.http.put(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments/${payload.id}`, newData)
      commit(`updateComment`, payload)
    }
  }
})
