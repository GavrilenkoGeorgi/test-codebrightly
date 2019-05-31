import Vue from 'vue'
import Vuex from 'vuex'

import {
  getComment,
  getAllComments,
  deleteComment,
  sendComment,
  updateComment
} from './api'

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
    showSingleComment (state, payload) {
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
    sendComment (state, payload) {
      state.allComments.push(payload)
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
    showSingleComment: async ({ commit }, id) => {
      getComment(id).then((comment) => {
        commit(`showSingleComment`, comment)
      })
    },
    setAllComments: async ({ commit }) => {
      getAllComments().then((allComments) => {
        commit(`setAllComments`, allComments)
      })
    },
    deleteComment: async ({ commit }, id) => {
      deleteComment(id).then((deleted) => {
        if (deleted) {
          commit(`deleteComment`, id)
        }
      })
    },
    sendComment: async ({ commit }, comment) => {
      sendComment(comment).then(comment => {
        if (comment) {
          commit(`sendComment`, comment)
        }
      })
    },
    updateComment: async ({ commit }, comment) => {
      updateComment(comment).then(updatedComment => {
        if (updatedComment) {
          commit(`updateComment`, updatedComment)
        }
      })
    }
  }
})
